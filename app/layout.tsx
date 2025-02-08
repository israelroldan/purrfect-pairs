import "./globals.css"
import { Inter } from "next/font/google"
import { BasePathProvider } from "../components/BasePathProvider"
import type React from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Purrfect Pairs",
  description: "A cat-themed memory game",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <BasePathProvider>{children}</BasePathProvider>
      </body>
    </html>
  )
}

