import "./globals.css"
import { Inter } from "next/font/google"
import type React from "react" // Import React

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
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
            document.documentElement.style.setProperty('--base-path', '${process.env.NEXT_PUBLIC_BASE_PATH || ""}');
          `,
          }}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}

