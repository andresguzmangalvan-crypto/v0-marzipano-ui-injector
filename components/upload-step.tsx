"use client"

import { useCallback, useState } from "react"
import { useAppState } from "@/lib/app-state"
import { Upload, FileArchive, AlertCircle, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export function UploadStep() {
  const { setZipFile, setHtmlContent, setFileList, setStep } = useAppState()
  const [isDragging, setIsDragging] = useState(false)
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [fileName, setFileName] = useState("")
  const [error, setError] = useState("")

  const processZip = useCallback(
    async (file: File) => {
      setStatus("loading")
      setFileName(file.name)
      setError("")

      try {
        const JSZip = (await import("jszip")).default
        const zip = await JSZip.loadAsync(file)
        const files = Object.keys(zip.files)

        // Find index.html
        const indexPath = files.find(
          (f) => f.endsWith("index.html") && !f.includes("__MACOSX")
        )

        if (!indexPath) {
          throw new Error(
            "No index.html found in the ZIP. Make sure this is a valid Marzipano project."
          )
        }

        const htmlContent = await zip.files[indexPath].async("string")

        setZipFile(file)
        setHtmlContent(htmlContent)
        setFileList(files.filter((f) => !f.includes("__MACOSX")))
        setStatus("success")

        // Auto-advance after a moment
        setTimeout(() => setStep("configure"), 800)
      } catch (err) {
        setStatus("error")
        setError(err instanceof Error ? err.message : "Failed to process ZIP file")
      }
    },
    [setZipFile, setHtmlContent, setFileList, setStep]
  )

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragging(false)
      const file = e.dataTransfer.files[0]
      if (file && file.name.endsWith(".zip")) {
        processZip(file)
      } else {
        setStatus("error")
        setError("Please upload a .zip file")
      }
    },
    [processZip]
  )

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (file) processZip(file)
    },
    [processZip]
  )

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-16">
      <div className="w-full max-w-lg">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-2xl font-bold text-foreground text-balance">
            Upload Your Marzipano Project
          </h1>
          <p className="text-sm text-muted-foreground text-pretty">
            Drop your exported .zip file below. We will read the index.html and inject a premium UI layer.
          </p>
        </div>

        <div
          onDragOver={(e) => {
            e.preventDefault()
            setIsDragging(true)
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className={`relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-12 transition-all ${
            isDragging
              ? "border-primary bg-primary/5"
              : status === "success"
                ? "border-primary/50 bg-primary/5"
                : status === "error"
                  ? "border-destructive/50 bg-destructive/5"
                  : "border-border hover:border-muted-foreground/40"
          }`}
        >
          {status === "idle" && (
            <>
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-secondary">
                <Upload className="h-6 w-6 text-muted-foreground" />
              </div>
              <p className="mb-1 text-sm font-medium text-foreground">
                Drag and drop your .zip file
              </p>
              <p className="mb-4 text-xs text-muted-foreground">
                or click to browse your files
              </p>
              <input
                type="file"
                accept=".zip"
                onChange={handleFileInput}
                className="absolute inset-0 cursor-pointer opacity-0"
                aria-label="Upload ZIP file"
              />
            </>
          )}

          {status === "loading" && (
            <>
              <div className="mb-4 flex h-14 w-14 animate-pulse items-center justify-center rounded-xl bg-secondary">
                <FileArchive className="h-6 w-6 text-primary" />
              </div>
              <p className="text-sm font-medium text-foreground">
                Processing {fileName}...
              </p>
              <p className="text-xs text-muted-foreground">
                Reading ZIP contents
              </p>
            </>
          )}

          {status === "success" && (
            <>
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                <CheckCircle2 className="h-6 w-6 text-primary" />
              </div>
              <p className="text-sm font-medium text-foreground">
                {fileName} loaded successfully
              </p>
              <p className="text-xs text-muted-foreground">
                Redirecting to configuration...
              </p>
            </>
          )}

          {status === "error" && (
            <>
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-destructive/10">
                <AlertCircle className="h-6 w-6 text-destructive" />
              </div>
              <p className="mb-1 text-sm font-medium text-foreground">
                Upload Failed
              </p>
              <p className="mb-4 text-xs text-destructive">{error}</p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setStatus("idle")}
              >
                Try Again
              </Button>
            </>
          )}
        </div>

        <div className="mt-8 rounded-lg border border-border bg-card p-4">
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            What gets injected
          </h3>
          <div className="grid grid-cols-3 gap-3">
            {[
              { title: "Top Bar", desc: "Logo, label & navigation" },
              { title: "Sidebar", desc: "Info panel with smooth animation" },
              { title: "Gallery", desc: "Commodities sub-page" },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-lg bg-secondary/50 px-3 py-2.5"
              >
                <p className="text-xs font-semibold text-foreground">
                  {item.title}
                </p>
                <p className="text-[11px] text-muted-foreground">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
