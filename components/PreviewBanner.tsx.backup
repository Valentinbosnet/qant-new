"use client"

import { useEffect, useState } from "react"
import { isPreviewEnvironment } from "@/lib/preview-data"

export default function PreviewBanner() {
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    setShowBanner(isPreviewEnvironment())
  }, [])

  if (!showBanner) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-yellow-500 text-black p-2 text-center font-medium">
      Mode Prévisualisation - Utilisation de données fictives à des fins de démonstration
    </div>
  )
}

