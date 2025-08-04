// Fake contact data
export interface TeamMember {
  id: string
  name: string
  position: string
  email: string
  phone: string
  image: string
  specialties: string[]
  experience: string
}

export interface ContactInfo {
  address: string
  phone: string
  email: string
  hours: {
    weekdays: string
    weekends: string
  }
  socialMedia: {
    facebook: string
    line: string
    instagram: string
  }
}

export const teamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Somchai Jaidee",
    position: "Managing Director",
    email: "somchai@focusproperty.com",
    phone: "+66 2 123 4567",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
    specialties: ["Luxury Properties", "Investment Strategy", "Market Analysis"],
    experience: "15+ years in Bangkok real estate",
  },
  {
    id: "2",
    name: "Siriporn Nakamura",
    position: "Senior Property Consultant",
    email: "siriporn@focusproperty.com",
    phone: "+66 2 123 4568",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face",
    specialties: ["Sukhumvit Area", "Condo Sales", "First-time Buyers"],
    experience: "8+ years helping families find homes",
  },
  {
    id: "3",
    name: "David Chen",
    position: "International Sales Manager",
    email: "david@focusproperty.com",
    phone: "+66 2 123 4569",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
    specialties: ["International Clients", "Investment Properties", "Rental Management"],
    experience: "10+ years serving expat community",
  },
  {
    id: "4",
    name: "Niran Pattanakul",
    position: "Property Investment Advisor",
    email: "niran@focusproperty.com",
    phone: "+66 2 123 4570",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=300&fit=crop&crop=face",
    specialties: ["Investment Analysis", "ROI Optimization", "Portfolio Management"],
    experience: "12+ years in property investment",
  },
  {
    id: "5",
    name: "Lisa Wang",
    position: "Customer Relations Manager",
    email: "lisa@focusproperty.com",
    phone: "+66 2 123 4571",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
    specialties: ["Customer Service", "After-sales Support", "Client Relations"],
    experience: "6+ years in customer excellence",
  },
  {
    id: "6",
    name: "Krit Somboon",
    position: "Market Research Analyst",
    email: "krit@focusproperty.com",
    phone: "+66 2 123 4572",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&h=300&fit=crop&crop=face",
    specialties: ["Market Trends", "Data Analysis", "Property Valuation"],
    experience: "7+ years in market research",
  },
]

export const contactInfo: ContactInfo = {
  address: "999/9 Ploenchit Tower, 32nd Floor, Ploenchit Road, Lumpini, Pathumwan, Bangkok 10330",
  phone: "+66 2 123 4567",
  email: "info@focusproperty.com",
  hours: {
    weekdays: "Monday - Friday: 9:00 AM - 7:00 PM",
    weekends: "Saturday - Sunday: 10:00 AM - 6:00 PM",
  },
  socialMedia: {
    facebook: "facebook.com/focusproperty",
    line: "@focusproperty",
    instagram: "@focusproperty_bangkok",
  },
}

export const companyHistory = {
  founded: "2018",
  milestones: [
    {
      year: "2018",
      title: "Company Founded",
      description: "FocusProperty was established with a vision to revolutionize Bangkok's premium condo market.",
    },
    {
      year: "2019",
      title: "First 100 Clients",
      description: "Successfully helped our first 100 families and investors find their perfect properties.",
    },
    {
      year: "2020",
      title: "Digital Transformation",
      description: "Launched our comprehensive online platform and virtual property tours during the pandemic.",
    },
    {
      year: "2021",
      title: "Partnership Expansion",
      description: "Formed strategic partnerships with top 20 developers in Bangkok.",
    },
    {
      year: "2022",
      title: "International Recognition",
      description: "Received 'Best Property Consultant' award from Bangkok Real Estate Association.",
    },
    {
      year: "2023",
      title: "1000+ Happy Clients",
      description: "Celebrated helping over 1,000 clients find their dream properties in Bangkok.",
    },
    {
      year: "2024",
      title: "Market Leadership",
      description: "Became the leading premium condo specialist in Bangkok with 25% market share.",
    },
  ],
  values: [
    {
      title: "Integrity",
      description: "We believe in honest, transparent dealings with all our clients and partners.",
    },
    {
      title: "Excellence",
      description: "We strive for excellence in every aspect of our service delivery.",
    },
    {
      title: "Innovation",
      description: "We embrace technology and innovation to enhance the property buying experience.",
    },
    {
      title: "Customer Focus",
      description: "Our clients' needs and satisfaction are at the heart of everything we do.",
    },
  ],
}
