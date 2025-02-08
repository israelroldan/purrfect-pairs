import "./globals.css"
import { Inter } from "next/font/google"
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
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
            (function() {
              var basePath = '${process.env.NEXT_PUBLIC_BASE_PATH || ""}';
              var cursorUrl = basePath + '/cat-cursor.svg';
              document.addEventListener('DOMContentLoaded', function() {
                document.body.style.cursor = 'url(' + cursorUrl + ') 20 20, auto';
              });
            })();
          `,
          }}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}

