"use client"

import { AlertTriangle, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface RiskAlertProps {
  title: string
  description: string
  onDetails: () => void
  onContactDoctor: () => void
  onDismiss: () => void
}

export function RiskAlert({
  title,
  description,
  onDetails,
  onContactDoctor,
  onDismiss,
}: RiskAlertProps) {
  return (
    <div className="mx-auto max-w-3xl px-6 py-3">
      <div className="relative rounded-xl border border-warning/30 bg-warning/10 p-4">
        <button
          onClick={onDismiss}
          className="absolute right-3 top-3 text-warning-foreground/60 hover:text-warning-foreground"
        >
          <X className="h-4 w-4" />
        </button>
        
        <div className="flex gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-warning text-warning-foreground">
            <AlertTriangle className="h-5 w-5" />
          </div>
          
          <div className="flex-1 pr-6">
            <h3 className="font-semibold text-warning-foreground">{title}</h3>
            <p className="mt-1 text-sm text-warning-foreground/80">
              {description}
            </p>
            
            <div className="mt-3 flex flex-wrap gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={onDetails}
                className="border-warning/30 text-warning-foreground hover:bg-warning/20"
              >
                More Details
              </Button>
              <Button
                size="sm"
                onClick={onContactDoctor}
                className="bg-warning text-warning-foreground hover:bg-warning/90"
              >
                Contact Doctor
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={onDismiss}
                className="text-warning-foreground/70 hover:text-warning-foreground hover:bg-warning/10"
              >
                Ignore
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
