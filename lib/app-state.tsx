"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"
import type { InjectorConfig } from "@/lib/injector"
import { DEFAULT_CONFIG } from "@/lib/injector"

export type AppStep = "upload" | "configure" | "preview" | "export"

interface AppState {
  step: AppStep
  zipFile: File | null
  htmlContent: string | null
  config: InjectorConfig
  fileList: string[]
  setStep: (step: AppStep) => void
  setZipFile: (file: File) => void
  setHtmlContent: (content: string) => void
  setConfig: (config: Partial<InjectorConfig>) => void
  setFileList: (files: string[]) => void
  reset: () => void
}

const AppContext = createContext<AppState | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [step, setStep] = useState<AppStep>("upload")
  const [zipFile, setZipFileState] = useState<File | null>(null)
  const [htmlContent, setHtmlContentState] = useState<string | null>(null)
  const [config, setConfigState] = useState<InjectorConfig>(DEFAULT_CONFIG)
  const [fileList, setFileListState] = useState<string[]>([])

  const setZipFile = useCallback((file: File) => {
    setZipFileState(file)
  }, [])

  const setHtmlContent = useCallback((content: string) => {
    setHtmlContentState(content)
  }, [])

  const setConfig = useCallback((partial: Partial<InjectorConfig>) => {
    setConfigState((prev) => ({ ...prev, ...partial }))
  }, [])

  const setFileList = useCallback((files: string[]) => {
    setFileListState(files)
  }, [])

  const reset = useCallback(() => {
    setStep("upload")
    setZipFileState(null)
    setHtmlContentState(null)
    setConfigState(DEFAULT_CONFIG)
    setFileListState([])
  }, [])

  return (
    <AppContext.Provider
      value={{
        step,
        zipFile,
        htmlContent,
        config,
        fileList,
        setStep,
        setZipFile,
        setHtmlContent,
        setConfig,
        setFileList,
        reset,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useAppState() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error("useAppState must be used within AppProvider")
  return ctx
}
