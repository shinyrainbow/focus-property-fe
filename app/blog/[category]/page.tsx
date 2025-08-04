"use client"

import { useParams } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { BlogBreadcrumb } from "@/components/blog-breadcrumb"
import { BlogCard } from "@/components/blog-card"
import { Button } from "@/components/ui/button"
import { Home, Building2, Building, ArrowLeft } from "lucide-react"
import { useLanguage } from "@/hooks/use-language"
import { getBlogPostsByCategory } from "@/lib/blog-data"
import Link from "next/link"

export default function BlogCategoryPage() {
  const params = useParams()
  const { t } = useLanguage()
  const category = params.category as "home" | "condo" | "townhome"

  const posts = getBlogPostsByCategory(category)

  const getCategoryInfo = (cat: string) => {
    switch (cat) {
      case "home":
        return {
          title: t("blog.home"),
          description: t("blog.home.desc"),
          icon: Home,
          color: "from-blue-500 to-blue-600",
        }
      case "condo":
        return {
          title: t("blog.condo"),
          description: t("blog.condo.desc"),
          icon: Building2,
          color: "from-green-500 to-green-600",
        }
      case "townhome":
        return {
          title: t("blog.townhome"),
          description: t("blog.townhome.desc"),
          icon: Building,
          color: "from-purple-500 to-purple-600",
        }
      default:
        return {
          title: cat,
          description: "",
          icon: Home,
          color: "from-gray-500 to-gray-600",
        }
    }
  }

  const categoryInfo = getCategoryInfo(category)
  const Icon = categoryInfo.icon

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section className={`bg-gradient-to-r ${categoryInfo.color} text-white py-12`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
          <div className="flex items-center space-x-4 mb-6">
            <Button
              variant="outline"
              size="sm"
              asChild
              className="bg-white/10 border-white/30 text-white hover:bg-white/20"
            >
              <Link href="/blog">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Blog
              </Link>
            </Button>
          </div>
          <div className="flex items-center space-x-4">
            <Icon className="h-12 w-12" />
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold mb-2">{categoryInfo.title}</h1>
              <p className="text-lg sm:text-xl opacity-90">{categoryInfo.description}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
          <BlogBreadcrumb currentSection={category} />

          {/* Posts Grid */}
          {posts.length > 0 ? (
            <>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {posts.length} {posts.length === 1 ? "Post" : "Posts"}
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-16">
              <Icon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No posts yet</h3>
              <p className="text-gray-600 mb-6">
                We're working on adding more {categoryInfo.title.toLowerCase()} content. Check back soon!
              </p>
              <Button asChild>
                <Link href="/blog">Browse Other Categories</Link>
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
