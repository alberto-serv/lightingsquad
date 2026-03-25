import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Suspense } from "react"
import "./globals.css"
import { ScrollToTop } from "@/components/scroll-to-top"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Dryer Vent Superheroes - Professional Dryer Vent Cleaning Services",
  description:
    "Protect your home from fire hazards with professional dryer vent cleaning services. Clean dryers prevent fires.",
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
      <body className={`font-sans ${inter.variable} antialiased`}>
        <ScrollToTop />
        <Suspense fallback={null}>{children}</Suspense>
      </body>
    </html>
  )
}
