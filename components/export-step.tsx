"use client"

import { useCallback, useState } from "react"
import { useAppState } from "@/lib/app-state"
import {
  injectIntoHTML,
  generateCustomCSS,
  generateCustomJS,
  generateCommoditiesPage,
  generateInjectorScript,
} from "@/lib/injector"
import { Button } from "@/components/ui/button"
import {
  ArrowLeft,
  Download,
  FileCode,
  FileArchive,
  Copy,
  Check,
} from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function ExportStep() {
  const { config, htmlContent, zipFile, setStep } = useAppState()
  const [exporting, setExporting] = useState(false)
  const [copied, setCopied] = useState<string | null>(null)

  const handleExportZip = useCallback(async () => {
    if (!zipFile || !htmlContent) return
    setExporting(true)

    try {
      const JSZip = (await import("jszip")).default
      const originalZip = await JSZip.loadAsync(zipFile)
      const newZip = new JSZip()

      // Copy all original files
      const entries = Object.entries(originalZip.files)
      for (const [path, file] of entries) {
        if (file.dir) {
          newZip.folder(path)
        } else {
          const content = await file.async("uint8array")
          newZip.file(path, content)
        }
      }

      // Find index.html
      const indexPath = Object.keys(originalZip.files).find(
        (f) => f.endsWith("index.html") && !f.includes("__MACOSX")
      )

      const basePath = indexPath
        ? indexPath.substring(0, indexPath.lastIndexOf("/") + 1)
        : ""

      // Replace index.html with injected version
      if (indexPath) {
        const injectedHTML = injectIntoHTML(htmlContent, config)
        newZip.file(indexPath, injectedHTML)
      }

      // Add custom.css
      const css = generateCustomCSS()
      newZip.file(`${basePath}custom.css`, css)

      // Add custom.js
      const js = generateCustomJS()
      newZip.file(`${basePath}custom.js`, js)

      // Add commodites page
      if (config.commoditiesEnabled) {
        const commoditiesHTML = generateCommoditiesPage(config)
        newZip.file(`${basePath}commodites.html`, commoditiesHTML)
      }

      // Generate and download
      const blob = await newZip.generateAsync({ type: "blob" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `marzipano-injected-${Date.now()}.zip`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch (err) {
      console.error("Export failed:", err)
    } finally {
      setExporting(false)
    }
  }, [zipFile, htmlContent, config])

  const copyToClipboard = useCallback(
    (text: string, key: string) => {
      navigator.clipboard.writeText(text).then(() => {
        setCopied(key)
        setTimeout(() => setCopied(null), 2000)
      })
    },
    []
  )

  const customCSS = generateCustomCSS()
  const customJS = generateCustomJS()
  const configDump = generateInjectorScript(config)

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="flex items-center justify-between border-b border-border px-6 py-4">
        <div>
          <h2 className="text-base font-semibold text-foreground">
            Export Project
          </h2>
          <p className="text-xs text-muted-foreground">
            Download your enhanced Marzipano project or copy the code
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setStep("preview")}
          >
            <ArrowLeft className="mr-1 h-3 w-3" />
            Preview
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="mx-auto max-w-3xl space-y-6">
          {/* Primary: Download ZIP */}
          <div className="rounded-xl border border-primary/30 bg-primary/5 p-6">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <FileArchive className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-foreground">
                  Download Modified ZIP
                </h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  A new .zip with the NordImmersive UI injected into index.html,
                  plus custom.css, custom.js, and commodites.html files.
                </p>
                <Button
                  onClick={handleExportZip}
                  disabled={!zipFile || exporting}
                  className="gap-2"
                >
                  <Download className="h-4 w-4" />
                  {exporting ? "Generating..." : "Download ZIP"}
                </Button>
              </div>
            </div>
          </div>

          {/* Code Tabs */}
          <Tabs defaultValue="css" className="rounded-xl border border-border">
            <div className="border-b border-border px-4 pt-3">
              <TabsList className="h-9 bg-transparent">
                <TabsTrigger value="css" className="gap-1.5 text-xs">
                  <FileCode className="h-3 w-3" />
                  custom.css
                </TabsTrigger>
                <TabsTrigger value="js" className="gap-1.5 text-xs">
                  <FileCode className="h-3 w-3" />
                  custom.js
                </TabsTrigger>
                <TabsTrigger value="config" className="gap-1.5 text-xs">
                  <FileCode className="h-3 w-3" />
                  config
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="css" className="mt-0 p-4">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-xs text-muted-foreground">
                  NordImmersive visual layer - full production CSS (933 lines)
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1.5"
                  onClick={() => copyToClipboard(customCSS, "css")}
                >
                  {copied === "css" ? (
                    <Check className="h-3 w-3" />
                  ) : (
                    <Copy className="h-3 w-3" />
                  )}
                  {copied === "css" ? "Copied" : "Copy"}
                </Button>
              </div>
              <pre className="max-h-80 overflow-auto rounded-lg bg-card p-4 font-mono text-xs leading-relaxed text-muted-foreground">
                <code>{customCSS}</code>
              </pre>
            </TabsContent>

            <TabsContent value="js" className="mt-0 p-4">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-xs text-muted-foreground">
                  Drawer, accordion, legacy sidebar logic
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1.5"
                  onClick={() => copyToClipboard(customJS, "js")}
                >
                  {copied === "js" ? (
                    <Check className="h-3 w-3" />
                  ) : (
                    <Copy className="h-3 w-3" />
                  )}
                  {copied === "js" ? "Copied" : "Copy"}
                </Button>
              </div>
              <pre className="max-h-80 overflow-auto rounded-lg bg-card p-4 font-mono text-xs leading-relaxed text-muted-foreground">
                <code>{customJS}</code>
              </pre>
            </TabsContent>

            <TabsContent value="config" className="mt-0 p-4">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-xs text-muted-foreground">
                  Configuration snapshot used for this export
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1.5"
                  onClick={() => copyToClipboard(configDump, "config")}
                >
                  {copied === "config" ? (
                    <Check className="h-3 w-3" />
                  ) : (
                    <Copy className="h-3 w-3" />
                  )}
                  {copied === "config" ? "Copied" : "Copy"}
                </Button>
              </div>
              <pre className="max-h-80 overflow-auto rounded-lg bg-card p-4 font-mono text-xs leading-relaxed text-muted-foreground">
                <code>{configDump}</code>
              </pre>
            </TabsContent>
          </Tabs>

          {/* Manual Instructions */}
          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="mb-4 text-sm font-semibold text-foreground">
              Manual Injection Instructions
            </h3>
            <ol className="space-y-3 text-sm text-muted-foreground">
              <li className="flex gap-3">
                <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-bold text-foreground">
                  1
                </span>
                <span>
                  Place{" "}
                  <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
                    custom.css
                  </code>{" "}
                  in the same folder as index.html. Add{" "}
                  <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
                    {'<link rel="stylesheet" href="custom.css">'}
                  </code>{" "}
                  before {'</head>'}.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-bold text-foreground">
                  2
                </span>
                <span>
                  Place{" "}
                  <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
                    custom.js
                  </code>{" "}
                  in the same folder. Add{" "}
                  <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
                    {'<script src="custom.js" defer></script>'}
                  </code>{" "}
                  before {'</body>'}.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-bold text-foreground">
                  3
                </span>
                <span>
                  Replace the content between {'<body>'} and the vendor scripts
                  with the NordImmersive skin HTML (TopBar + Drawer + Menu button +
                  overlay). The ZIP export does this automatically.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-bold text-foreground">
                  4
                </span>
                <span>
                  Make sure icon images (play.png, fullscreen.png, etc.) exist
                  in{" "}
                  <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
                    img/
                  </code>{" "}
                  folder. Open index.html to verify.
                </span>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  )
}
