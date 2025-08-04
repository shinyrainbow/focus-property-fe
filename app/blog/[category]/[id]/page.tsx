"use client"

import { useParams } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { BlogBreadcrumb } from "@/components/blog-breadcrumb"
import { BlogCard } from "@/components/blog-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Clock, User, Calendar, Share2, Heart, MessageCircle } from "lucide-react"
import { useLanguage } from "@/hooks/use-language"
import { getBlogPostById, getBlogPostsByCategory } from "@/lib/blog-data"
import { useToast } from "@/hooks/use-toast"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"

export default function BlogPostPage() {
  const params = useParams()
  const { t } = useLanguage()
  const { toast } = useToast()
  const [isLiked, setIsLiked] = useState(false)

  const postId = params.id as string
  const category = params.category as "home" | "condo" | "townhome"
  const post = getBlogPostById(postId)

  // Get related posts from the same category
  const relatedPosts = getBlogPostsByCategory(category)
    .filter((p) => p.id !== postId)
    .slice(0, 3)

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Post Not Found</h1>
          <p className="text-gray-600 mb-8">The blog post you're looking for doesn't exist.</p>
          <Button asChild>
            <Link href="/blog">Back to Blog</Link>
          </Button>
        </div>
      </div>
    )
  }

  const getCategoryName = (cat: string) => {
    switch (cat) {
      case "home":
        return t("blog.home")
      case "condo":
        return t("blog.condo")
      case "townhome":
        return t("blog.townhome")
      default:
        return cat
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      toast({
        title: "Link copied!",
        description: "Blog post link copied to clipboard",
      })
    }
  }

  const toggleLike = () => {
    setIsLiked(!isLiked)
    toast({
      title: isLiked ? "Removed from favorites" : "Added to favorites",
      description: isLiked ? "Post removed from your favorites" : "Post added to your favorites",
    })
  }

  // Extended content for the blog post
  const fullContent = `
    ${post.content}

    ## Key Takeaways

    This comprehensive guide covers everything you need to know about ${post.title.toLowerCase()}. Whether you're a first-time buyer or an experienced investor, understanding these concepts will help you make informed decisions in Bangkok's dynamic real estate market.

    ### Market Insights

    Bangkok's property market continues to evolve, with new developments and changing buyer preferences shaping the landscape. Our team at FocusProperty has been tracking these trends closely, and we're seeing increased interest in:

    - **Sustainable living**: Properties with green certifications and eco-friendly features
    - **Smart home technology**: Automated systems and IoT integration
    - **Community amenities**: Shared spaces that foster social connections
    - **Location flexibility**: Properties with good connectivity to multiple business districts

    ### Expert Recommendations

    Based on our years of experience in the Bangkok property market, we recommend:

    1. **Research thoroughly**: Understand the neighborhood, future development plans, and market trends
    2. **Visit multiple properties**: Don't settle on the first property you see
    3. **Consider long-term value**: Think about resale potential and rental yields
    4. **Work with professionals**: Partner with experienced agents who know the local market

    ### Investment Considerations

    When evaluating properties in Bangkok, consider these key factors:

    - **Location and accessibility**: Proximity to BTS/MRT stations significantly impacts property value
    - **Developer reputation**: Established developers typically deliver better quality and maintain property values
    - **Building management**: Well-managed properties retain their value and provide better living experiences
    - **Future development plans**: Understanding area development can help predict future value appreciation

    ### Financing Options

    Bangkok's property market offers various financing options for both local and international buyers:

    - **Bank loans**: Thai banks offer competitive rates for qualified buyers
    - **Developer financing**: Some projects offer attractive payment plans
    - **International financing**: Options available for foreign investors
    - **Cash purchases**: Often preferred and may result in better pricing

    ### Legal Considerations

    Understanding the legal framework is crucial for property investment in Thailand:

    - **Foreign ownership rules**: Condos allow foreign ownership up to 49% of total units
    - **Leasehold vs freehold**: Different ownership structures have different implications
    - **Due diligence**: Proper legal checks are essential before purchase
    - **Transfer procedures**: Understanding the transfer process helps avoid delays

    ### Market Trends and Future Outlook

    The Bangkok property market shows several promising trends:

    - **Digital transformation**: PropTech solutions are improving the buying and selling experience
    - **Sustainability focus**: Green buildings are becoming more popular and valuable
    - **Lifestyle developments**: Mixed-use projects combining residential, retail, and office spaces
    - **Infrastructure improvements**: New transportation links continue to open up new areas

    ### Next Steps

    If you're interested in exploring properties related to this topic, our team is here to help. We offer personalized consultations, property viewings, and market analysis to ensure you find the perfect property for your needs.

    Contact us today to schedule a consultation with one of our expert property consultants. We're committed to helping you navigate Bangkok's property market with confidence and success.

    ### About FocusProperty

    FocusProperty has been serving the Bangkok real estate market for over a decade, helping thousands of clients find their ideal properties. Our team of experienced professionals provides comprehensive services including:

    - Property search and selection
    - Market analysis and valuation
    - Legal and financial guidance
    - After-sales support and property management

    Whether you're looking for your first home, an investment property, or planning to upgrade, we have the expertise and local knowledge to guide you through every step of the process.
  `

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <BlogBreadcrumb currentSection={category} currentPost={post.title} />

        {/* Back Button */}
        <div className="mb-6">
          <Button variant="outline" size="sm" asChild className="bg-transparent">
            <Link href={`/blog/${category}`}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to {getCategoryName(category)}
            </Link>
          </Button>
        </div>

        {/* Article Header */}
        <article className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
          {/* Featured Image */}
          <div className="relative h-64 md:h-96">
            <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute bottom-6 left-6 right-6">
              <Badge className="mb-3 bg-primary hover:bg-primary/90">{getCategoryName(post.category)}</Badge>
              <h1 className="text-2xl md:text-4xl font-bold text-white mb-2">{post.title}</h1>
            </div>
          </div>

          {/* Article Meta */}
          <div className="p-6 border-b">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>{formatDate(post.publishedAt)}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>
                    {post.readTime} {t("blog.minutes.read")}
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" onClick={toggleLike} className="bg-transparent">
                  <Heart className={`h-4 w-4 mr-2 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
                  {isLiked ? "Liked" : "Like"}
                </Button>
                <Button variant="outline" size="sm" onClick={handleShare} className="bg-transparent">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>
          </div>

          {/* Article Content */}
          <div className="p-6">
            <div className="prose prose-gray max-w-none">
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">{post.excerpt}</p>

              <div className="space-y-4 text-gray-700 leading-relaxed">
                {fullContent.split("\n\n").map((paragraph, index) => {
                  if (paragraph.startsWith("##")) {
                    return (
                      <h2 key={index} className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                        {paragraph.replace("## ", "")}
                      </h2>
                    )
                  } else if (paragraph.startsWith("###")) {
                    return (
                      <h3 key={index} className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                        {paragraph.replace("### ", "")}
                      </h3>
                    )
                  } else if (paragraph.includes("- **")) {
                    // Handle bullet points with bold text
                    const lines = paragraph.split("\n").filter((line) => line.trim())
                    return (
                      <ul key={index} className="list-disc list-inside space-y-2 ml-4">
                        {lines.map((line, i) => {
                          if (line.includes("- **")) {
                            const parts = line.split("**")
                            return (
                              <li key={i} className="text-gray-700">
                                <strong>{parts[1]}</strong>: {parts[2]}
                              </li>
                            )
                          }
                          return null
                        })}
                      </ul>
                    )
                  } else if (paragraph.match(/^\d+\./)) {
                    // Handle numbered lists
                    const lines = paragraph.split("\n").filter((line) => line.trim())
                    return (
                      <ol key={index} className="list-decimal list-inside space-y-2 ml-4">
                        {lines.map((line, i) => {
                          if (line.match(/^\d+\./)) {
                            const parts = line.split("**")
                            if (parts.length >= 3) {
                              return (
                                <li key={i} className="text-gray-700">
                                  <strong>{parts[1]}</strong>: {parts[2]}
                                </li>
                              )
                            }
                            return (
                              <li key={i} className="text-gray-700">
                                {line}
                              </li>
                            )
                          }
                          return null
                        })}
                      </ol>
                    )
                  } else if (paragraph.trim()) {
                    return (
                      <p key={index} className="mb-4">
                        {paragraph}
                      </p>
                    )
                  }
                  return null
                })}
              </div>
            </div>

            {/* Tags */}
            <Separator className="my-8" />
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </article>

        {/* Author Bio */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-start space-x-4">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">
                {post.author
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </span>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-2">About {post.author}</h3>
              <p className="text-gray-600 text-sm mb-3">
                {post.author} is a senior property consultant at FocusProperty with over 10 years of experience in
                Bangkok's real estate market. Specializing in {getCategoryName(post.category).toLowerCase()} properties,
                {" " + post.author.split(" ")[0]} has helped hundreds of clients find their perfect homes and investment
                properties.
              </p>
              <Button variant="outline" size="sm" className="bg-transparent">
                <MessageCircle className="h-4 w-4 mr-2" />
                Contact {post.author.split(" ")[0]}
              </Button>
            </div>
          </div>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <BlogCard key={relatedPost.id} post={relatedPost} />
              ))}
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="bg-white rounded-lg shadow-sm p-8 mt-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Find Your Dream Property?</h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Browse our extensive collection of properties in Bangkok or get personalized recommendations from our expert
            consultants.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/buy">Browse Properties</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/contact">Contact Expert</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
