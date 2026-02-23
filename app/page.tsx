"use client"

import { AppProvider, useAppState } from "@/lib/app-state"
import { AppHeader } from "@/components/app-header"
import { UploadStep } from "@/components/upload-step"
import { ConfigureStep } from "@/components/configure-step"
import { PreviewStep } from "@/components/preview-step"
import { ExportStep } from "@/components/export-step"

function AppContent() {
  const { step } = useAppState()

  return (
    <div className="flex h-screen flex-col bg-background">
      <AppHeader />
      {step === "upload" && <UploadStep />}
      {step === "configure" && <ConfigureStep />}
      {step === "preview" && <PreviewStep />}
      {step === "export" && <ExportStep />}
    </div>
  )
}

export default function Page() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  )
}
