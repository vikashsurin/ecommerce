import { Geist, Geist_Mono } from "next/font/google"

import { ThemeProvider } from "@/components/theme-provider"
import "@workspace/ui/globals.css"
import { cn } from "@workspace/ui/lib/utils"
import Providers from "../lib/Provider"
const geist = Geist({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        geist.variable
      )}
    >
      <body>
        <Providers>
          <div className="root">
            <ThemeProvider>{children}</ThemeProvider>
          </div>
        </Providers>
      </body>
    </html>
  )
}
