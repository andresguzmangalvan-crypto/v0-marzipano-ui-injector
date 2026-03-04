"use client"

import { useMemo } from "react"
import { useAppState } from "@/lib/app-state"
import { injectIntoHTML, generateCustomCSS, generateCustomJS } from "@/lib/injector"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight, Code2, Eye } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function PreviewStep() {
  const { config, htmlContent, setStep } = useAppState()

  const injectedHTML = useMemo(() => {
    if (!htmlContent) return null
    // For preview: inject HTML, then inline CSS/JS so iframe renders correctly
    let html = injectIntoHTML(htmlContent, config)
    // Replace external custom.css link with inline <style>
    html = html.replace(
      /<link[^>]*href=["']custom\.css[^"']*["'][^>]*>/gi,
      `<style>${generateCustomCSS()}</style>`
    )
    // Replace external custom.js script with inline <script>
    html = html.replace(
      /<script[^>]*src=["']custom\.js[^"']*["'][^>]*><\/script>/gi,
      `<script>${generateCustomJS()}<\/script>`
    )
    return html
  }, [htmlContent, config])

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="flex items-center justify-between border-b border-border px-6 py-4">
        <div className="flex items-center gap-3">
          <h2 className="text-base font-semibold text-foreground">Preview</h2>
          <span className="rounded bg-primary/10 px-2 py-0.5 text-[11px] font-medium text-primary">
            Live
          </span>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setStep("configure")}
          >
            <ArrowLeft className="mr-1 h-3 w-3" />
            Configure
          </Button>
          <Button size="sm" onClick={() => setStep("export")}>
            Export
            <ArrowRight className="ml-1 h-3 w-3" />
          </Button>
        </div>
      </div>

      <Tabs defaultValue="preview" className="flex flex-1 flex-col overflow-hidden">
        <div className="border-b border-border px-6">
          <TabsList className="h-9 bg-transparent">
            <TabsTrigger value="preview" className="gap-1.5 text-xs">
              <Eye className="h-3 w-3" />
              Visual Preview
            </TabsTrigger>
            <TabsTrigger value="code" className="gap-1.5 text-xs">
              <Code2 className="h-3 w-3" />
              Injected HTML
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="preview" className="mt-0 flex-1 overflow-hidden">
          {injectedHTML ? (
            <iframe
              srcDoc={injectedHTML}
              title="Marzipano Preview"
              className="h-full w-full border-0"
              sandbox="allow-scripts allow-same-origin"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <p className="text-sm text-muted-foreground">
                No HTML content to preview. Please upload a Marzipano project first.
              </p>
            </div>
          )}
        </TabsContent>

        <TabsContent
          value="code"
          className="mt-0 flex-1 overflow-auto bg-card p-6"
        >
          {injectedHTML ? (
            <pre className="overflow-x-auto whitespace-pre-wrap font-mono text-xs leading-relaxed text-muted-foreground">
              <code>{injectedHTML}</code>
            </pre>
          ) : (
            <p className="text-sm text-muted-foreground">
              No HTML content available.
            </p>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
