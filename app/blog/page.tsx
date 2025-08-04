"use client"

import { Navbar } from "@/components/navbar"
import { BlogBreadcrumb } from "@/components/blog-breadcrumb"
import { BlogCard } from "@/components/blog-card"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Home, Building2, Building } from "lucide-react"
import { useLanguage } from "@/hooks/use-language"
import { getBlogPostsByCategory, getRecentBlogPosts } from "@/lib/blog-data"
import Link from "next/link"

export default function BlogPage() {
  const { t } = useLanguage()

  const homePosts = getBlogPostsByCategory("home").slice(0, 2)
  const condoPosts = getBlogPostsByCategory("condo").slice(0, 2)
  const townhomePosts = getBlogPostsByCategory("townhome").slice(0, 2)
  const recentPosts = getRecentBlogPosts(3)

  const categories = [
    {
      id: "home",
      title: t("blog.home"),
      description: t("blog.home.desc"),
      icon: Home,
      posts: homePosts,
      color: "from-blue-500 to-blue-600",
    },
    {
      id: "condo",
      title: t("blog.condo"),
      description: t("blog.condo.desc"),
      icon: Building2,
      posts: condoPosts,
      color: "from-green-500 to-green-600",
    },
    {
      id: "townhome",
      title: t("blog.townhome"),
      description: t("blog.townhome.desc"),
      icon: Building,
      posts: townhomePosts,
      color: "from-purple-500 to-purple-600",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">{t("blog.title")}</h1>
            <p className="text-lg sm:text-xl mb-6 max-w-2xl mx-auto">{t("blog.subtitle")}</p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
          <BlogBreadcrumb />

          {/* Recent Posts */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Latest Posts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          </div>

          {/* Category Sections */}
          <div className="space-y-12">
            {categories.map((category) => {
              const Icon = category.icon
              return (
                <div key={category.id}>
                  {/* Category Header */}
                  <Card className="mb-6">
                    <CardHeader className={`bg-gradient-to-r ${category.color} text-white`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Icon className="h-8 w-8" />
                          <div>
                            <CardTitle className="text-2xl">{category.title}</CardTitle>
                            <CardDescription className="text-white/90 mt-1">{category.description}</CardDescription>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          asChild
                          className="bg-white/10 border-white/30 text-white hover:bg-white/20"
                        >
                          <Link href={`/blog/${category.id}`}>View All →</Link>
                        </Button>
                      </div>
                    </CardHeader>
                  </Card>

                  {/* Category Posts */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {category.posts.map((post) => (
                      <BlogCard key={post.id} post={post} />
                    ))}
                  </div>

                  {/* View More Button */}
                  {category.posts.length > 0 && (
                    <div className="text-center mt-6">
                      <Button variant="outline" asChild className="bg-transparent">
                        <Link href={`/blog/${category.id}`}>View More {category.title} Posts</Link>
                      </Button>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
