"use client"

import { useCallback, useState } from "react"
import { useAppState } from "@/lib/app-state"
import {
  injectIntoHTML,
  generateStandaloneCSS,
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

      // Find and replace index.html
      const indexPath = Object.keys(originalZip.files).find(
        (f) => f.endsWith("index.html") && !f.includes("__MACOSX")
      )

      if (indexPath) {
        const injectedHTML = injectIntoHTML(htmlContent, config)
        newZip.file(indexPath, injectedHTML)
      }

      // Add standalone CSS
      const css = generateStandaloneCSS(config)
      const basePath = indexPath
        ? indexPath.substring(0, indexPath.lastIndexOf("/") + 1)
        : ""
      newZip.file(`${basePath}injected-styles.css`, css)

      // Add commodities page
      if (config.commoditiesEnabled) {
        const commoditiesHTML = generateCommoditiesPage(config)
        newZip.file(`${basePath}commodities.html`, commoditiesHTML)
      }

      // Add injector script (for reference)
      const injectorScript = generateInjectorScript(config)
      newZip.file(`${basePath}injector.js`, injectorScript)

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

  const injectorScript = generateInjectorScript(config)
  const standaloneCSS = generateStandaloneCSS(config)

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="flex items-center justify-between border-b border-border px-6 py-4">
        <div>
          <h2 className="text-base font-semibold text-foreground">
            Export Project
          </h2>
          <p className="text-xs text-muted-foreground">
            Download your enhanced Marzipano project or copy the injection code
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
                  A new .zip with the UI injection applied to index.html, plus
                  the standalone CSS, injector.js, and commodities.html files.
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
          <Tabs defaultValue="injector" className="rounded-xl border border-border">
            <div className="border-b border-border px-4 pt-3">
              <TabsList className="h-9 bg-transparent">
                <TabsTrigger value="injector" className="gap-1.5 text-xs">
                  <FileCode className="h-3 w-3" />
                  injector.js
                </TabsTrigger>
                <TabsTrigger value="styles" className="gap-1.5 text-xs">
                  <FileCode className="h-3 w-3" />
                  styles.css
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="injector" className="mt-0 p-4">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-xs text-muted-foreground">
                  Paste this script before {'</body>'} in your Marzipano index.html
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1.5"
                  onClick={() => copyToClipboard(injectorScript, "injector")}
                >
                  {copied === "injector" ? (
                    <Check className="h-3 w-3" />
                  ) : (
                    <Copy className="h-3 w-3" />
                  )}
                  {copied === "injector" ? "Copied" : "Copy"}
                </Button>
              </div>
              <pre className="max-h-80 overflow-auto rounded-lg bg-card p-4 font-mono text-xs leading-relaxed text-muted-foreground">
                <code>{injectorScript}</code>
              </pre>
            </TabsContent>

            <TabsContent value="styles" className="mt-0 p-4">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-xs text-muted-foreground">
                  {'Add this as <link rel="stylesheet" href="injected-styles.css" /> in your <head>'}
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1.5"
                  onClick={() => copyToClipboard(standaloneCSS, "styles")}
                >
                  {copied === "styles" ? (
                    <Check className="h-3 w-3" />
                  ) : (
                    <Copy className="h-3 w-3" />
                  )}
                  {copied === "styles" ? "Copied" : "Copy"}
                </Button>
              </div>
              <pre className="max-h-80 overflow-auto rounded-lg bg-card p-4 font-mono text-xs leading-relaxed text-muted-foreground">
                <code>{standaloneCSS}</code>
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
                  Open your Marzipano project and locate the{" "}
                  <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
                    index.html
                  </code>{" "}
                  file.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-bold text-foreground">
                  2
                </span>
                <span>
                  Copy{" "}
                  <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
                    injected-styles.css
                  </code>{" "}
                  into the same folder and add a{" "}
                  <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
                    {'<link>'}
                  </code>{" "}
                  tag inside {'<head>'}.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-bold text-foreground">
                  3
                </span>
                <span>
                  Copy{" "}
                  <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
                    injector.js
                  </code>{" "}
                  into the same folder and add a{" "}
                  <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
                    {'<script>'}
                  </code>{" "}
                  tag before {'</body>'}.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-bold text-foreground">
                  4
                </span>
                <span>
                  Open{" "}
                  <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
                    index.html
                  </code>{" "}
                  in your browser to verify the Top Bar, Sidebar, and styling.
                </span>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  )
}
