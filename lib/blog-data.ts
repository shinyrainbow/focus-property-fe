// Fake blog data
export interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  category: "home" | "condo" | "townhome"
  author: string
  publishedAt: string
  readTime: number
  image: string
  tags: string[]
}

export const blogPosts: BlogPost[] = [
  // Home & Living Posts
  {
    id: "1",
    title: "10 Essential Tips for First-Time Home Buyers in Bangkok",
    excerpt:
      "Navigate the Bangkok property market with confidence. Learn the essential tips every first-time buyer should know before making their investment.",
    content:
      "Buying your first home in Bangkok can be overwhelming, but with the right knowledge, you can make informed decisions...",
    category: "home",
    author: "Sarah Johnson",
    publishedAt: "2024-01-15",
    readTime: 8,
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=250&fit=crop",
    tags: ["First-time buyer", "Bangkok", "Investment", "Tips"],
  },
  {
    id: "2",
    title: "Interior Design Trends for Modern Bangkok Homes",
    excerpt:
      "Discover the latest interior design trends that are shaping modern homes in Bangkok. From minimalist aesthetics to tropical influences.",
    content:
      "Bangkok's interior design scene is evolving rapidly, blending traditional Thai elements with contemporary styles...",
    category: "home",
    author: "Michael Chen",
    publishedAt: "2024-01-12",
    readTime: 6,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=250&fit=crop",
    tags: ["Interior Design", "Trends", "Modern", "Bangkok"],
  },
  {
    id: "3",
    title: "Creating a Smart Home in Your Bangkok Property",
    excerpt:
      "Transform your Bangkok home into a smart, efficient living space with the latest technology and automation solutions.",
    content:
      "Smart home technology is becoming increasingly popular in Bangkok, offering convenience, security, and energy efficiency...",
    category: "home",
    author: "Lisa Wang",
    publishedAt: "2024-01-10",
    readTime: 7,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=250&fit=crop",
    tags: ["Smart Home", "Technology", "Automation", "Efficiency"],
  },

  // Condo Posts
  {
    id: "4",
    title: "The Ultimate Guide to Condo Living in Sukhumvit",
    excerpt:
      "Everything you need to know about living in Sukhumvit condos - from amenities to transportation and lifestyle benefits.",
    content:
      "Sukhumvit is one of Bangkok's most sought-after areas for condo living, offering unparalleled convenience and luxury...",
    category: "condo",
    author: "David Park",
    publishedAt: "2024-01-14",
    readTime: 10,
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=250&fit=crop",
    tags: ["Sukhumvit", "Condo Living", "Lifestyle", "Bangkok"],
  },
  {
    id: "5",
    title: "Condo Investment ROI: Bangkok vs Other Asian Cities",
    excerpt:
      "Compare condo investment returns in Bangkok with other major Asian cities. Discover why Bangkok remains a top choice for investors.",
    content:
      "Bangkok's condo market continues to attract international investors due to its strong fundamentals and growth potential...",
    category: "condo",
    author: "Jennifer Liu",
    publishedAt: "2024-01-11",
    readTime: 9,
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=250&fit=crop",
    tags: ["Investment", "ROI", "Comparison", "Asian Markets"],
  },
  {
    id: "6",
    title: "Luxury Condo Amenities: What to Look For",
    excerpt:
      "Discover the must-have amenities in luxury Bangkok condos and how they enhance your living experience and property value.",
    content: "Modern luxury condos in Bangkok offer an array of amenities that go beyond basic facilities...",
    category: "condo",
    author: "Robert Kim",
    publishedAt: "2024-01-08",
    readTime: 5,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=250&fit=crop",
    tags: ["Luxury", "Amenities", "Condo Features", "Value"],
  },

  // Townhome Posts
  {
    id: "7",
    title: "Townhome vs Condo: Which is Right for Your Family?",
    excerpt:
      "Compare the benefits of townhome and condo living in Bangkok. Find out which option best suits your family's needs and lifestyle.",
    content:
      "Choosing between a townhome and condo in Bangkok depends on various factors including family size, lifestyle preferences...",
    category: "townhome",
    author: "Amanda Thompson",
    publishedAt: "2024-01-13",
    readTime: 8,
    image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=250&fit=crop",
    tags: ["Townhome", "Condo", "Comparison", "Family Living"],
  },
  {
    id: "8",
    title: "Townhome Communities in Bangkok: Top Locations",
    excerpt:
      "Explore the best townhome communities in Bangkok, from family-friendly neighborhoods to luxury developments.",
    content: "Bangkok offers numerous townhome communities, each with unique characteristics and advantages...",
    category: "townhome",
    author: "Mark Rodriguez",
    publishedAt: "2024-01-09",
    readTime: 7,
    image: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=400&h=250&fit=crop",
    tags: ["Communities", "Locations", "Neighborhoods", "Family"],
  },
  {
    id: "9",
    title: "Townhome Maintenance: A Complete Owner's Guide",
    excerpt:
      "Essential maintenance tips for townhome owners in Bangkok. Keep your property in perfect condition and maintain its value.",
    content: "Owning a townhome comes with maintenance responsibilities that differ from condo ownership...",
    category: "townhome",
    author: "Emily Davis",
    publishedAt: "2024-01-07",
    readTime: 6,
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400&h=250&fit=crop",
    tags: ["Maintenance", "Ownership", "Property Care", "Value"],
  },
]

export function getBlogPostsByCategory(category: "home" | "condo" | "townhome") {
  return blogPosts.filter((post) => post.category === category)
}

export function getBlogPostById(id: string) {
  return blogPosts.find((post) => post.id === id)
}

export function getRecentBlogPosts(limit = 6) {
  return blogPosts.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()).slice(0, limit)
}
