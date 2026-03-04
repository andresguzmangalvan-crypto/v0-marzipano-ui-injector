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
  Building2,
  Type,
  PanelRight,
  Image,
  Phone,
  Mail,
  MapPin,
} from "lucide-react"

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
              Customize the NordImmersive UI layer
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
          {/* Top Bar Branding */}
          <section>
            <div className="mb-3 flex items-center gap-2">
              <Type className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-semibold text-foreground">
                Top Bar
              </h3>
            </div>
            <div className="space-y-3">
              <div>
                <Label htmlFor="brandName" className="text-xs text-muted-foreground">
                  Brand Name
                </Label>
                <Input
                  id="brandName"
                  value={config.brandName}
                  onChange={(e) => setConfig({ brandName: e.target.value })}
                  placeholder="Serenity Towers"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="brandTag" className="text-xs text-muted-foreground">
                  Brand Tagline
                </Label>
                <Input
                  id="brandTag"
                  value={config.brandTag}
                  onChange={(e) => setConfig({ brandTag: e.target.value })}
                  placeholder="Visite virtuelle 3D"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="unitLabel" className="text-xs text-muted-foreground">
                  Unit Label (center)
                </Label>
                <Input
                  id="unitLabel"
                  value={config.unitLabel}
                  onChange={(e) => setConfig({ unitLabel: e.target.value })}
                  placeholder="Unite 4 1/2 - 215"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="logoFileName" className="text-xs text-muted-foreground">
                  Logo Image Path
                </Label>
                <Input
                  id="logoFileName"
                  value={config.logoFileName}
                  onChange={(e) => setConfig({ logoFileName: e.target.value })}
                  placeholder="img/serenity.png"
                  className="mt-1 font-mono text-xs"
                />
                <p className="mt-1 text-[11px] text-muted-foreground">
                  Relative to the Marzipano project root (e.g. img/logo.png)
                </p>
              </div>
            </div>
          </section>

          <Separator />

          {/* Contact Info */}
          <section>
            <div className="mb-3 flex items-center gap-2">
              <Building2 className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-semibold text-foreground">
                Contact Info (Drawer)
              </h3>
            </div>
            <div className="space-y-3">
              <div>
                <Label htmlFor="address" className="text-xs text-muted-foreground">
                  <MapPin className="mr-1 inline h-3 w-3" />
                  Address
                </Label>
                <Textarea
                  id="address"
                  value={config.contact.address}
                  onChange={(e) =>
                    setConfig({
                      contact: { ...config.contact, address: e.target.value },
                    })
                  }
                  rows={2}
                  className="mt-1"
                  placeholder="1700 Boulevard Angrignon&#10;Lasalle, QC H8N0J2"
                />
              </div>
              <div>
                <Label htmlFor="phone" className="text-xs text-muted-foreground">
                  <Phone className="mr-1 inline h-3 w-3" />
                  Phone
                </Label>
                <Input
                  id="phone"
                  value={config.contact.phone}
                  onChange={(e) =>
                    setConfig({
                      contact: { ...config.contact, phone: e.target.value },
                    })
                  }
                  placeholder="514 823-1114"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-xs text-muted-foreground">
                  <Mail className="mr-1 inline h-3 w-3" />
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={config.contact.email}
                  onChange={(e) =>
                    setConfig({
                      contact: { ...config.contact, email: e.target.value },
                    })
                  }
                  placeholder="admin@example.com"
                  className="mt-1"
                />
              </div>
            </div>
          </section>

          <Separator />

          {/* Footer */}
          <section>
            <div className="mb-3 flex items-center gap-2">
              <PanelRight className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-semibold text-foreground">
                Drawer Footer
              </h3>
            </div>
            <div className="space-y-3">
              <div>
                <Label htmlFor="footerBrand" className="text-xs text-muted-foreground">
                  Footer Brand
                </Label>
                <Input
                  id="footerBrand"
                  value={config.footerBrand}
                  onChange={(e) => setConfig({ footerBrand: e.target.value })}
                  placeholder="NordImmersive"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="footerSlogan" className="text-xs text-muted-foreground">
                  Footer Slogan
                </Label>
                <Input
                  id="footerSlogan"
                  value={config.footerSlogan}
                  onChange={(e) => setConfig({ footerSlogan: e.target.value })}
                  placeholder="- Experiences immersives 3D -"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="footerLogoFileName" className="text-xs text-muted-foreground">
                  Footer Logo Path
                </Label>
                <Input
                  id="footerLogoFileName"
                  value={config.footerLogoFileName}
                  onChange={(e) =>
                    setConfig({ footerLogoFileName: e.target.value })
                  }
                  placeholder="img/NIsiglas.png"
                  className="mt-1 font-mono text-xs"
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
                  Commodites Page
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
              <div className="space-y-3">
                <div>
                  <Label htmlFor="commTitle" className="text-xs text-muted-foreground">
                    Page Title
                  </Label>
                  <Input
                    id="commTitle"
                    value={config.commoditiesTitle}
                    onChange={(e) =>
                      setConfig({ commoditiesTitle: e.target.value })
                    }
                    placeholder="Commodites"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="commSub" className="text-xs text-muted-foreground">
                    Subtitle
                  </Label>
                  <Input
                    id="commSub"
                    value={config.commoditiesSubtitle}
                    onChange={(e) =>
                      setConfig({ commoditiesSubtitle: e.target.value })
                    }
                    className="mt-1"
                  />
                </div>
                <p className="text-[11px] text-muted-foreground">
                  A commodites.html page with a gallery will be generated
                  inside the exported ZIP. Images can be added after export by
                  placing them in the project folder.
                </p>
              </div>
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
          {/* Mini preview of the NordImmersive top bar */}
          <div className="w-full max-w-2xl overflow-hidden rounded-lg border border-border">
            <div
              className="flex items-center justify-between px-4 py-3"
              style={{ backgroundColor: "rgba(20, 24, 32, 0.92)" }}
            >
              {/* Brand */}
              <div className="flex items-center gap-2.5">
                <div className="flex h-[34px] w-[34px] items-center justify-center rounded-[10px] border border-white/10 bg-white/5">
                  <span className="text-[11px] text-white/60">Logo</span>
                </div>
                <div className="flex flex-col leading-none">
                  <span className="text-[14px] font-extrabold tracking-wide text-white/95">
                    {config.brandName || "Brand"}
                  </span>
                  <span className="text-[11px] text-white/70">
                    {config.brandTag || "Tagline"}
                  </span>
                </div>
              </div>

              {/* Center label */}
              <span className="text-xs font-extrabold uppercase tracking-wider text-white/90">
                {config.unitLabel || "Unit Label"}
              </span>

              {/* Buttons */}
              <div className="flex gap-2.5">
                {["Play", "Full", "List"].map((label) => (
                  <div
                    key={label}
                    className="flex h-[34px] w-[34px] items-center justify-center rounded-[10px] border border-white/10 bg-white/5"
                  >
                    <span className="text-[9px] text-white/50">{label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div
              className="flex h-48 items-center justify-center"
              style={{ backgroundColor: "#0b0f16" }}
            >
              <span className="text-xs text-white/30">
                Marzipano panorama area
              </span>
            </div>
          </div>

          {/* Drawer mini preview */}
          <div className="mt-6 w-full max-w-2xl">
            <div className="flex gap-4">
              {/* Drawer card */}
              <div
                className="flex w-80 flex-col overflow-hidden rounded-2xl border border-white/10"
                style={{ backgroundColor: "rgba(20, 24, 32, 0.70)" }}
              >
                <div className="flex flex-col items-center gap-2 border-b border-white/10 px-4 py-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                    <span className="text-[10px] text-white/50">Logo</span>
                  </div>
                  <span className="text-sm font-bold text-white/90">
                    {config.brandName}
                  </span>
                </div>
                <div className="flex flex-1 flex-col gap-2 p-4">
                  <div className="flex h-11 items-center justify-between rounded-xl border border-white/15 bg-white/10 px-3.5 text-sm text-white/90">
                    Information
                    <span className="text-white/85">&#9662;</span>
                  </div>
                  {config.commoditiesEnabled && (
                    <div className="flex h-11 items-center rounded-xl border border-white/15 bg-white/10 px-3.5 text-sm text-white/90">
                      commodites
                    </div>
                  )}
                </div>
                <div className="flex flex-col items-center gap-2 border-t border-white/10 px-4 py-3">
                  <span className="text-xs font-bold text-white/90">
                    {config.footerBrand}
                  </span>
                  <span className="text-center text-[11px] text-white/60">
                    {config.footerSlogan}
                  </span>
                </div>
              </div>

              {/* File list */}
              {fileList.length > 0 && (
                <div className="flex-1 rounded-lg border border-border bg-card p-4">
                  <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    ZIP Contents ({fileList.length} files)
                  </h4>
                  <div className="max-h-48 overflow-y-auto font-mono text-xs text-muted-foreground">
                    {fileList.slice(0, 25).map((f) => (
                      <div key={f} className="truncate py-0.5">
                        {f}
                      </div>
                    ))}
                    {fileList.length > 25 && (
                      <div className="py-0.5 text-primary">
                        + {fileList.length - 25} more files
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
