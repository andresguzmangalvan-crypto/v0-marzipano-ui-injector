"use client"

import { useAppState } from "@/lib/app-state"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import {
  ArrowRight,
  ArrowLeft,
  Palette,
  Type,
  PanelRight,
  Image,
} from "lucide-react"

const COLOR_PRESETS = [
  { name: "Emerald", value: "#3ecf8e" },
  { name: "Sky", value: "#38bdf8" },
  { name: "Amber", value: "#f59e0b" },
  { name: "Rose", value: "#f43f5e" },
  { name: "Slate", value: "#94a3b8" },
]

export function ConfigureStep() {
  const { config, setConfig, setStep, fileList } = useAppState()

  return (
    <div className="flex flex-1 overflow-hidden">
      {/* Left: Config Panel */}
      <div className="flex w-full flex-col overflow-y-auto border-r border-border md:w-[420px]">
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <div>
            <h2 className="text-base font-semibold text-foreground">
              Configuration
            </h2>
            <p className="text-xs text-muted-foreground">
              Customize the injected UI layer
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setStep("upload")}
            >
              <ArrowLeft className="mr-1 h-3 w-3" />
              Back
            </Button>
            <Button size="sm" onClick={() => setStep("preview")}>
              Preview
              <ArrowRight className="ml-1 h-3 w-3" />
            </Button>
          </div>
        </div>

        <div className="flex-1 space-y-6 p-6">
          {/* Branding */}
          <section>
            <div className="mb-3 flex items-center gap-2">
              <Type className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-semibold text-foreground">
                Branding
              </h3>
            </div>
            <div className="space-y-3">
              <div>
                <Label htmlFor="logoText" className="text-xs text-muted-foreground">
                  Logo Text
                </Label>
                <Input
                  id="logoText"
                  value={config.logoText}
                  onChange={(e) => setConfig({ logoText: e.target.value })}
                  placeholder="My Tour"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="slogan" className="text-xs text-muted-foreground">
                  Slogan
                </Label>
                <Input
                  id="slogan"
                  value={config.slogan}
                  onChange={(e) => setConfig({ slogan: e.target.value })}
                  placeholder="Virtual Experience"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="label" className="text-xs text-muted-foreground">
                  Center Label
                </Label>
                <Input
                  id="label"
                  value={config.label}
                  onChange={(e) => setConfig({ label: e.target.value })}
                  placeholder="360° Tour"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="logoUrl" className="text-xs text-muted-foreground">
                  Logo Image URL (optional)
                </Label>
                <Input
                  id="logoUrl"
                  value={config.logoUrl}
                  onChange={(e) => setConfig({ logoUrl: e.target.value })}
                  placeholder="https://..."
                  className="mt-1"
                />
              </div>
            </div>
          </section>

          <Separator />

          {/* Color Theme */}
          <section>
            <div className="mb-3 flex items-center gap-2">
              <Palette className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-semibold text-foreground">
                Color Theme
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {COLOR_PRESETS.map((preset) => (
                <button
                  key={preset.value}
                  onClick={() => setConfig({ primaryColor: preset.value })}
                  className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-medium transition-all ${
                    config.primaryColor === preset.value
                      ? "border-primary bg-primary/10 text-foreground"
                      : "border-border text-muted-foreground hover:border-muted-foreground/40"
                  }`}
                >
                  <span
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: preset.value }}
                  />
                  {preset.name}
                </button>
              ))}
            </div>
            <div className="mt-3">
              <Label htmlFor="customColor" className="text-xs text-muted-foreground">
                Custom color
              </Label>
              <div className="mt-1 flex items-center gap-2">
                <input
                  type="color"
                  id="customColor"
                  value={config.primaryColor}
                  onChange={(e) => setConfig({ primaryColor: e.target.value })}
                  className="h-8 w-8 cursor-pointer rounded border-0 bg-transparent"
                />
                <Input
                  value={config.primaryColor}
                  onChange={(e) => setConfig({ primaryColor: e.target.value })}
                  className="font-mono text-xs"
                />
              </div>
            </div>
          </section>

          <Separator />

          {/* Sidebar Content */}
          <section>
            <div className="mb-3 flex items-center gap-2">
              <PanelRight className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-semibold text-foreground">
                Sidebar Content
              </h3>
            </div>
            <div className="space-y-3">
              <div>
                <Label htmlFor="infoTitle" className="text-xs text-muted-foreground">
                  Section Title
                </Label>
                <Input
                  id="infoTitle"
                  value={config.sidebarInfoTitle}
                  onChange={(e) =>
                    setConfig({ sidebarInfoTitle: e.target.value })
                  }
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="infoText" className="text-xs text-muted-foreground">
                  Description
                </Label>
                <Textarea
                  id="infoText"
                  value={config.sidebarInfoText}
                  onChange={(e) =>
                    setConfig({ sidebarInfoText: e.target.value })
                  }
                  rows={3}
                  className="mt-1"
                />
              </div>
            </div>
          </section>

          <Separator />

          {/* Commodities */}
          <section>
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Image className="h-4 w-4 text-primary" />
                <h3 className="text-sm font-semibold text-foreground">
                  Commodities Page
                </h3>
              </div>
              <Switch
                checked={config.commoditiesEnabled}
                onCheckedChange={(checked) =>
                  setConfig({ commoditiesEnabled: checked })
                }
              />
            </div>
            {config.commoditiesEnabled && (
              <p className="text-xs text-muted-foreground">
                A commodities.html page will be generated and linked from the
                top bar and sidebar.
              </p>
            )}
          </section>
        </div>
      </div>

      {/* Right: Live Preview mini */}
      <div className="hidden flex-1 flex-col md:flex">
        <div className="flex items-center border-b border-border px-6 py-4">
          <h3 className="text-sm font-medium text-muted-foreground">
            Top Bar Preview
          </h3>
        </div>
        <div className="flex flex-1 flex-col items-center justify-center bg-card/50 p-8">
          {/* Mini preview of the top bar */}
          <div className="w-full max-w-2xl overflow-hidden rounded-lg border border-border">
            <div
              className="flex items-center justify-between px-4 py-3"
              style={{ backgroundColor: "rgba(10,10,15,0.92)" }}
            >
              <div className="flex items-center gap-2">
                {config.logoUrl && (
                  <img
                    src={config.logoUrl}
                    alt="Logo preview"
                    className="h-6 w-auto rounded"
                    crossOrigin="anonymous"
                  />
                )}
                <span className="text-sm font-bold text-[#f0f0f5]">
                  {config.logoText || "My Tour"}
                </span>
                <span className="text-[11px] text-[#9ca3af]">
                  {config.slogan || "Virtual Experience"}
                </span>
              </div>
              <span
                className="text-xs font-semibold uppercase tracking-wider text-[#f0f0f5]"
              >
                {config.label || "360\u00b0 Tour"}
              </span>
              <div className="flex gap-1.5">
                {config.commoditiesEnabled && (
                  <span
                    className="rounded px-2.5 py-1 text-[11px] font-medium"
                    style={{
                      border: "1px solid rgba(255,255,255,0.08)",
                      color: "#f0f0f5",
                    }}
                  >
                    Gallery
                  </span>
                )}
                <span
                  className="rounded px-2.5 py-1 text-[11px] font-medium"
                  style={{
                    border: "1px solid rgba(255,255,255,0.08)",
                    color: "#f0f0f5",
                  }}
                >
                  Info
                </span>
              </div>
            </div>
            <div
              className="flex h-48 items-center justify-center"
              style={{
                background: `linear-gradient(135deg, ${config.primaryColor}15, transparent)`,
                backgroundColor: "#111118",
              }}
            >
              <span className="text-xs text-muted-foreground">
                Marzipano panorama area
              </span>
            </div>
          </div>

          {/* File list */}
          {fileList.length > 0 && (
            <div className="mt-6 w-full max-w-2xl rounded-lg border border-border bg-card p-4">
              <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                ZIP Contents ({fileList.length} files)
              </h4>
              <div className="max-h-32 overflow-y-auto font-mono text-xs text-muted-foreground">
                {fileList.slice(0, 20).map((f) => (
                  <div key={f} className="truncate py-0.5">
                    {f}
                  </div>
                ))}
                {fileList.length > 20 && (
                  <div className="py-0.5 text-primary">
                    + {fileList.length - 20} more files
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
