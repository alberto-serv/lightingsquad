"use client"

import { useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"

interface ReviewHarvestWidgetProps {
  /**
   * The Review Harvest embed code/script that Alex will provide
   * This should be the complete script tag or embed code from Review Harvest
   */
  embedCode?: string
}

export function ReviewHarvestWidget({ embedCode }: ReviewHarvestWidgetProps) {
  useEffect(() => {
    // If embedCode is provided and contains a script, inject it
    if (embedCode && embedCode.includes("<script")) {
      const container = document.getElementById("review-harvest-container")
      if (container) {
        container.innerHTML = embedCode

        // Execute any scripts in the embed code
        const scripts = container.getElementsByTagName("script")
        for (let i = 0; i < scripts.length; i++) {
          const script = scripts[i]
          const newScript = document.createElement("script")
          if (script.src) {
            newScript.src = script.src
          } else {
            newScript.textContent = script.textContent
          }
          document.body.appendChild(newScript)
        }
      }
    }
  }, [embedCode])

  // If no embed code is provided, show instructions
  if (!embedCode) {
    return (
      <Card className="border-2 border-dashed border-[#FFCB00]">
        <CardContent className="p-8">
          <div className="flex items-start gap-4">
            <AlertCircle className="h-6 w-6 text-[#FFCB00] flex-shrink-0 mt-1" />
            <div className="space-y-4">
              <h3 className="text-xl font-bold">Review Harvest Integration Instructions</h3>
              <div className="space-y-3 text-muted-foreground">
                <p>To display your Review Harvest reviews, follow these steps:</p>
                <ol className="list-decimal list-inside space-y-2 ml-4">
                  <li>Contact Alex to get your Review Harvest embed code</li>
                  <li>
                    Open the file <code className="bg-muted px-2 py-1 rounded">app/home/page.tsx</code>
                  </li>
                  <li>
                    Find the <code className="bg-muted px-2 py-1 rounded">&lt;ReviewHarvestWidget /&gt;</code> component
                  </li>
                  <li>
                    Add the embed code as a prop:{" "}
                    <code className="bg-muted px-2 py-1 rounded">embedCode="YOUR_EMBED_CODE_HERE"</code>
                  </li>
                </ol>
                <div className="bg-blue-50 p-4 rounded-lg mt-4">
                  <p className="font-semibold mb-2">Example:</p>
                  <pre className="text-xs bg-white p-3 rounded overflow-x-auto">
                    {`<ReviewHarvestWidget 
  embedCode='<script src="https://reviewharvest.com/widget.js"></script>'
/>`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Render the embed code container
  return (
    <div className="w-full">
      <div id="review-harvest-container" className="min-h-[400px]" />
    </div>
  )
}
