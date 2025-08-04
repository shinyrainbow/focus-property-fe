
import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
// import { MockAuthProvider } from "@/components/mock-auth-provider"
import { LanguageProvider } from "@/hooks/use-language"
import SessionProvider from "@/components/SessionProvider";
import { auth } from "@/auth";

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "FocusProperty - Premium Condos in Bangkok",
  description: "Discover premium condominium properties in Bangkok with FocusProperty",
    generator: 'v0.dev'
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth();
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <LanguageProvider>
            {/* <MockAuthProvider> */}
              {children}
              <Toaster />
            {/* </MockAuthProvider> */}
          </LanguageProvider>
        </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
