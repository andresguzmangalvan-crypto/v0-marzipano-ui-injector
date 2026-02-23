"use client"

import { useAppState } from "@/lib/app-state"
import { Layers } from "lucide-react"

const STEPS = [
  { key: "upload", label: "Upload" },
  { key: "configure", label: "Configure" },
  { key: "preview", label: "Preview" },
  { key: "export", label: "Export" },
] as const

export function AppHeader() {
  const { step, reset } = useAppState()
  const currentIndex = STEPS.findIndex((s) => s.key === step)

  return (
    <header className="flex items-center justify-between border-b border-border px-6 py-4">
      <button
        onClick={reset}
        className="flex items-center gap-3 text-foreground transition-colors hover:text-primary"
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <Layers className="h-4 w-4" />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-semibold leading-none">
            Marzipano UI Injector
          </span>
          <span className="text-xs text-muted-foreground">
            Premium virtual tour toolkit
          </span>
        </div>
      </button>

      <nav className="hidden items-center gap-1 md:flex" aria-label="Progress steps">
        {STEPS.map((s, i) => {
          const isCurrent = s.key === step
          const isCompleted = i < currentIndex

          return (
            <div key={s.key} className="flex items-center">
              {i > 0 && (
                <div
                  className={`mx-2 h-px w-8 transition-colors ${
                    isCompleted ? "bg-primary" : "bg-border"
                  }`}
                />
              )}
              <div
                className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                  isCurrent
                    ? "bg-primary text-primary-foreground"
                    : isCompleted
                      ? "bg-secondary text-primary"
                      : "text-muted-foreground"
                }`}
              >
                <span
                  className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold ${
                    isCurrent
                      ? "bg-primary-foreground text-primary"
                      : isCompleted
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-muted-foreground"
                  }`}
                >
                  {isCompleted ? "\u2713" : i + 1}
                </span>
                {s.label}
              </div>
            </div>
          )
        })}
      </nav>

      <div className="text-xs text-muted-foreground">
        Step {currentIndex + 1} of {STEPS.length}
      </div>
    </header>
  )
}
