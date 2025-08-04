"use client"

import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import { useLanguage } from "@/hooks/use-language"

interface BreadcrumbProps {
  currentSection?: "home" | "condo" | "townhome"
  currentPost?: string
}

export function BlogBreadcrumb({ currentSection, currentPost }: BreadcrumbProps) {
  const { t } = useLanguage()

  const getSectionName = (section: string) => {
    switch (section) {
      case "home":
        return t("blog.home")
      case "condo":
        return t("blog.condo")
      case "townhome":
        return t("blog.townhome")
      default:
        return section
    }
  }

  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
      <Link href="/" className="flex items-center hover:text-primary transition-colors">
        <Home className="h-4 w-4 mr-1" />
        Home
      </Link>

      <ChevronRight className="h-4 w-4" />

      <Link href="/blog" className="hover:text-primary transition-colors">
        {t("nav.blog")}
      </Link>

      {currentSection && (
        <>
          <ChevronRight className="h-4 w-4" />
          <Link
            href={`/blog/${currentSection}`}
            className={`hover:text-primary transition-colors ${!currentPost ? "text-primary font-medium" : ""}`}
          >
            {getSectionName(currentSection)}
          </Link>
        </>
      )}

      {currentPost && (
        <>
          <ChevronRight className="h-4 w-4" />
          <span className="text-primary font-medium truncate max-w-xs">{currentPost}</span>
        </>
      )}
    </nav>
  )
}
