import type React from "react"
import type { Metadata } from "next"
import { Assistant, Playfair_Display } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { siteConfig } from "@/lib/config"
import { ShippingPreloader } from "@/components/shipping-preloader"
import "./globals.css"

const assistant = Assistant({
  subsets: ["latin"],
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
})

export const metadata: Metadata = {
  title: siteConfig.seo.defaultTitle,
  description: siteConfig.description,
  icons: {
    icon: siteConfig.favicon,
    apple: siteConfig.favicon,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`antialiased ${assistant.className} ${playfair.variable}`}>
        <ShippingPreloader />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
