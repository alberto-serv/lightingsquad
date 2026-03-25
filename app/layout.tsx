import type React from "react"
import type { Metadata } from "next"
import { Lora, Urbanist } from "next/font/google"
import { Suspense } from "react"
import "./globals.css"
import { ScrollToTop } from "@/components/scroll-to-top"

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  display: "swap",
})

const urbanist = Urbanist({
  subsets: ["latin"],
  variable: "--font-urbanist",
  display: "swap",
})

export const metadata: Metadata = {
  title: "The Lighting Squad - Your Electrical Handyman",
  description:
    "Professional lighting installation, electrical services, and smart home solutions for homeowners and businesses in Nashville and Middle Tennessee.",
  generator: "v0.app",
  icons: {
    icon: "/favicon.ico",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${lora.variable} ${urbanist.variable} antialiased`}>
        <ScrollToTop />
        <Suspense fallback={null}>{children}</Suspense>
      </body>
    </html>
  )
}
