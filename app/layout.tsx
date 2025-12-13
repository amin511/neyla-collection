import type React from "react"
import type { Metadata } from "next"
import { Assistant, Playfair_Display } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const assistant = Assistant({ 
  subsets: ["latin"],
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
})

export const metadata: Metadata = {
  title: "NAALA - Fashion & Lifestyle",
  description:
    "Discover elegant fashion and lifestyle collections from NAALA. New collection 2025 featuring traditional and contemporary designs.",
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
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
        {children}
        <Analytics />
      </body>
    </html>
  )
}
