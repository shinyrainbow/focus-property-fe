// Fake JSON data to replace database calls
export const fakeProperties = [
  {
    id: "1",
    title: "fake Luxury 2BR Condo at Noble Ploenchit Sukhumvit",
    description:
      "Beautiful condo in the heart of Sukhumvit. This property features modern amenities and is perfect for investment. Located in a prime area with easy access to BTS/MRT stations, shopping centers, and restaurants.",
    listingType: "sale",
    price: 8500000,
    location: "Sukhumvit, Bangkok",
    propertyType: "Condo",
    bedrooms: 2,
    bathrooms: 2,
    area: 85,
    floor: "15A",
    amenities: "Swimming Pool, Fitness Center, 24/7 Security, Parking",
    contact: "+66 81 234 5678",
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400&h=300&fit=crop",
    ],
    status: "available",
    views: 245,
    userId: "user1",
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z",
  },
  {
    id: "2",
    title: "Modern Studio at Rhythm Asoke",
    description:
      "Modern studio in Silom district. Perfect for young professionals with easy access to business district and nightlife. Fully furnished with contemporary design.",
    listingType: "rent",
    price: 25000,
    location: "Silom, Bangkok",
    propertyType: "Studio",
    bedrooms: 0,
    bathrooms: 1,
    area: 35,
    floor: "8B",
    amenities: "Pool, Fitness Center, Security, Parking, BBQ Area",
    contact: "+66 82 345 6789",
    images: [
      "https://images.unsplash.com/photo-1502672023488-70e25813eb80?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=400&h=300&fit=crop",
    ],
    status: "available",
    views: 89,
    userId: "user2",
    createdAt: "2024-01-10T14:30:00Z",
    updatedAt: "2024-01-10T14:30:00Z",
  },
  {
    id: "3",
    title: "Luxury Penthouse at The Emporio Asoke",
    description:
      "Stunning penthouse with panoramic city views. Features premium finishes, private terrace, and exclusive amenities. Perfect for luxury living in the heart of Bangkok.",
    listingType: "sale",
    price: 15000000,
    location: "Asoke, Bangkok",
    propertyType: "Penthouse",
    bedrooms: 3,
    bathrooms: 3,
    area: 150,
    floor: "35PH",
    amenities: "Rooftop Pool, Spa, Business Center, Garden, Concierge",
    contact: "+66 83 456 7890",
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1505873242700-f289a29e1e0f?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop",
    ],
    status: "reserved",
    views: 156,
    userId: "user1",
    createdAt: "2024-01-08T09:15:00Z",
    updatedAt: "2024-01-08T09:15:00Z",
  },
  {
    id: "4",
    title: "Cozy 1BR at Life Ladprao Thonglor",
    description:
      "Comfortable 1-bedroom condo in trendy Thonglor area. Close to EmQuartier, restaurants, and nightlife. Great for young professionals and expats.",
    listingType: "rent",
    price: 35000,
    location: "Thonglor, Bangkok",
    propertyType: "Condo",
    bedrooms: 1,
    bathrooms: 1,
    area: 45,
    floor: "12C",
    amenities: "Swimming Pool, Gym, Security, Parking, Playground",
    contact: "+66 84 567 8901",
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop",
    ],
    status: "available",
    views: 78,
    userId: "user3",
    createdAt: "2024-01-12T16:45:00Z",
    updatedAt: "2024-01-12T16:45:00Z",
  },
  {
    id: "5",
    title: "Spacious 2BR at Noble Remix Sathorn",
    description:
      "Spacious 2-bedroom unit in prestigious Sathorn district. Perfect for families or professionals. Easy access to BTS and business district.",
    listingType: "sale",
    price: 9200000,
    location: "Sathorn, Bangkok",
    propertyType: "Condo",
    bedrooms: 2,
    bathrooms: 2,
    area: 78,
    floor: "18A",
    amenities: "Infinity Pool, Gym, Sauna, Library, Co-working Space",
    contact: "+66 85 678 9012",
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400&h=300&fit=crop",
    ],
    status: "available",
    views: 134,
    userId: "user2",
    createdAt: "2024-01-05T11:20:00Z",
    updatedAt: "2024-01-05T11:20:00Z",
  },
  {
    id: "6",
    title: "Executive Suite at The Address Phrom Phong",
    description:
      "Premium executive suite with modern amenities. Perfect for business travelers and executives. Located in prime Phrom Phong area with excellent connectivity.",
    listingType: "rent",
    price: 75000,
    location: "Phrom Phong, Bangkok",
    propertyType: "Suite",
    bedrooms: 2,
    bathrooms: 3,
    area: 95,
    floor: "22B",
    amenities: "Rooftop Pool, Gym, 24/7 Security, Shuttle Service",
    contact: "+66 86 789 0123",
    images: [
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=300&fit=crop",
    ],
    status: "available",
    views: 92,
    userId: "user1",
    createdAt: "2024-01-03T13:10:00Z",
    updatedAt: "2024-01-03T13:10:00Z",
  },
  {
    id: "7",
    title: "Modern Loft at Circle Living Ari",
    description:
      "Unique loft-style apartment in trendy Ari district. High ceilings, industrial design, and modern amenities. Perfect for creative professionals.",
    listingType: "rent",
    price: 42000,
    location: "Ari, Bangkok",
    propertyType: "Loft",
    bedrooms: 1,
    bathrooms: 2,
    area: 65,
    floor: "6L",
    amenities: "Pool, Fitness Center, Security, Parking, BBQ Area",
    contact: "+66 87 890 1234",
    images: [
      "https://images.unsplash.com/photo-1505873242700-f289a29e1e0f?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop",
    ],
    status: "available",
    views: 67,
    userId: "user3",
    createdAt: "2024-01-07T15:30:00Z",
    updatedAt: "2024-01-07T15:30:00Z",
  },
  {
    id: "8",
    title: "Luxury 3BR at Quattro Ratchathewi",
    description:
      "Spacious 3-bedroom luxury condo in Ratchathewi. Premium location with easy access to shopping, dining, and transportation. Perfect for families.",
    listingType: "sale",
    price: 11800000,
    location: "Ratchathewi, Bangkok",
    propertyType: "Condo",
    bedrooms: 3,
    bathrooms: 2,
    area: 105,
    floor: "20A",
    amenities: "Swimming Pool, Gym, Parking, Security, Elevator, Balcony",
    contact: "+66 88 901 2345",
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1502672023488-70e25813eb80?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=400&h=300&fit=crop",
    ],
    status: "available",
    views: 203,
    userId: "user2",
    createdAt: "2024-01-01T08:00:00Z",
    updatedAt: "2024-01-01T08:00:00Z",
  },
  {
    id: "9",
    title: "Stylish Studio at Ideo Chatuchak",
    description:
      "Stylish studio apartment near Chatuchak Weekend Market. Modern design with efficient use of space. Great for young professionals and students.",
    listingType: "rent",
    price: 18000,
    location: "Chatuchak, Bangkok",
    propertyType: "Studio",
    bedrooms: 0,
    bathrooms: 1,
    area: 28,
    floor: "5A",
    amenities: "Pool, Fitness, Security, Parking, Playground",
    contact: "+66 89 012 3456",
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1505873242700-f289a29e1e0f?w=400&h=300&fit=crop",
    ],
    status: "available",
    views: 45,
    userId: "user1",
    createdAt: "2024-01-14T12:15:00Z",
    updatedAt: "2024-01-14T12:15:00Z",
  },
  {
    id: "10",
    title: "Premium 2BR at The Line Huai Khwang",
    description:
      "Premium 2-bedroom condo with city views. Modern amenities and excellent location with MRT access. Perfect for professionals and small families.",
    listingType: "sale",
    price: 7800000,
    location: "Huai Khwang, Bangkok",
    propertyType: "Condo",
    bedrooms: 2,
    bathrooms: 2,
    area: 68,
    floor: "14B",
    amenities: "Swimming Pool, Fitness Center, 24/7 Security, Parking",
    contact: "+66 90 123 4567",
    images: [
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop",
    ],
    status: "available",
    views: 112,
    userId: "user3",
    createdAt: "2024-01-09T10:45:00Z",
    updatedAt: "2024-01-09T10:45:00Z",
  },
]

export const fakeUsers = [
  {
    id: "user1",
    username: "testuser",
    email: "test@focusproperty.com",
    name: "Test User",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "user2",
    username: "john.doe",
    email: "john.doe@example.com",
    name: "John Doe",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "user3",
    username: "admin",
    email: "admin@focusproperty.com",
    name: "Admin User",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
]

// Utility functions for fake data operations
export function getFakeProperties(filters?: {
  location?: string
  minPrice?: number
  maxPrice?: number
  propertyType?: string
  listingType?: string
  bedrooms?: number
  limit?: number
  offset?: number
}) {
  let filtered = [...fakeProperties, ...allFakeProperties]

  if (filters) {
    if (filters.location && filters.location !== "any") {
      filtered = filtered.filter((p) => p.location.toLowerCase().includes(filters.location!.toLowerCase()))
    }

    if (filters.minPrice !== undefined) {
      filtered = filtered.filter((p) => p.price >= filters.minPrice!)
    }

    if (filters.maxPrice !== undefined) {
      filtered = filtered.filter((p) => p.price <= filters.maxPrice!)
    }

    if (filters.propertyType && filters.propertyType !== "any") {
      filtered = filtered.filter((p) => p.propertyType === filters.propertyType)
    }

    if (filters.listingType) {
      filtered = filtered.filter((p) => p.listingType === filters.listingType)
    }

    if (filters.bedrooms !== undefined) {
      filtered = filtered.filter((p) => p.bedrooms === filters.bedrooms)
    }

    if (filters.offset) {
      filtered = filtered.slice(filters.offset)
    }

    if (filters.limit) {
      filtered = filtered.slice(0, filters.limit)
    }
  }

  return filtered
}

export function getFakePropertyById(id: string) {
  return fakeProperties.find((p) => p.id === id)
}

export function getFakeUserById(id: string) {
  return fakeUsers.find((u) => u.id === id)
}

export function getFakeUserProperties(userId: string) {
  return fakeProperties.filter((p) => p.userId === userId)
}

export function getFakeDatabaseStats() {
  const totalProperties = fakeProperties.length
  const totalUsers = fakeUsers.length

  const propertiesByType = fakeProperties.reduce(
    (acc, property) => {
      const existing = acc.find((item) => item.listingType === property.listingType)
      if (existing) {
        existing._count.id++
      } else {
        acc.push({
          listingType: property.listingType,
          _count: { id: 1 },
        })
      }
      return acc
    },
    [] as Array<{ listingType: string; _count: { id: number } }>,
  )

  const propertiesByLocation = fakeProperties
    .reduce(
      (acc, property) => {
        const existing = acc.find((item) => item.location === property.location)
        if (existing) {
          existing._count.id++
        } else {
          acc.push({
            location: property.location,
            _count: { id: 1 },
          })
        }
        return acc
      },
      [] as Array<{ location: string; _count: { id: number } }>,
    )
    .sort((a, b) => b._count.id - a._count.id)

  const propertiesByPropertyType = fakeProperties.reduce(
    (acc, property) => {
      const existing = acc.find((item) => item.propertyType === property.propertyType)
      if (existing) {
        existing._count.id++
      } else {
        acc.push({
          propertyType: property.propertyType,
          _count: { id: 1 },
        })
      }
      return acc
    },
    [] as Array<{ propertyType: string; _count: { id: number } }>,
  )

  return {
    totalProperties,
    totalUsers,
    propertiesByType,
    propertiesByLocation,
    propertiesByListingType: propertiesByPropertyType,
  }
}

// Generate more fake properties for larger datasets
export function generateMoreFakeProperties(count = 90) {
  const districts = [
    "Sukhumvit",
    "Silom",
    "Sathorn",
    "Asoke",
    "Thonglor",
    "Phrom Phong",
    "Ari",
    "Phaya Thai",
    "Ratchathewi",
    "Chatuchak",
    "Huai Khwang",
    "Din Daeng",
    "Dusit",
    "Phra Nakhon",
    "Bang Rak",
    "Samphanthawong",
  ]

  const propertyTypes = ["Condo", "Studio", "Penthouse", "Suite", "Duplex", "Loft"]

  const condoNames = [
    "The Residence",
    "Noble Plaza",
    "Quattro",
    "The Address",
    "Circle Living",
    "Rhythm",
    "Ideo",
    "Life Ladprao",
    "The Line",
    "Whizdom",
    "Knightsbridge",
    "The Lumpini",
    "Ashton",
    "The Diplomat",
    "Noble Ploenchit",
    "Via 31",
  ]

  const images = [
    "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1502672023488-70e25813eb80?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1505873242700-f289a29e1e0f?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop",
  ]

  const additionalProperties = []

  for (let i = 11; i <= count + 10; i++) {
    const district = districts[Math.floor(Math.random() * districts.length)]
    const propertyType = propertyTypes[Math.floor(Math.random() * propertyTypes.length)]
    const condoName = condoNames[Math.floor(Math.random() * condoNames.length)]
    const listingType = Math.random() > 0.6 ? "sale" : "rent"
    const bedrooms = propertyType === "Studio" ? 0 : Math.floor(Math.random() * 4) + 1
    const bathrooms = Math.floor(Math.random() * bedrooms + 1) + 1
    const area =
      propertyType === "Studio"
        ? Math.floor(Math.random() * 20) + 25
        : propertyType === "Penthouse"
          ? Math.floor(Math.random() * 80) + 120
          : Math.floor(Math.random() * 75) + 45

    let basePrice = area * (district.includes("Sukhumvit") || district.includes("Silom") ? 120000 : 80000)
    if (listingType === "rent") {
      basePrice = Math.floor(basePrice * 0.005)
    }
    const price = Math.floor(basePrice * (0.8 + Math.random() * 0.4))

    const numImages = Math.floor(Math.random() * 4) + 2
    const propertyImages = []
    for (let j = 0; j < numImages; j++) {
      propertyImages.push(images[Math.floor(Math.random() * images.length)])
    }

    additionalProperties.push({
      id: i.toString(),
      title: `${propertyType === "Studio" ? "Modern Studio" : propertyType === "Penthouse" ? "Luxury Penthouse" : `${bedrooms}BR ${propertyType}`} at ${condoName} ${district}`,
      description: `Beautiful ${propertyType.toLowerCase()} in the heart of ${district}. This property features modern amenities and is perfect for ${listingType === "rent" ? "rental" : "investment"}. Located in a prime area with easy access to BTS/MRT stations, shopping centers, and restaurants.`,
      listingType,
      price,
      location: `${district}, Bangkok`,
      propertyType,
      bedrooms,
      bathrooms,
      area,
      floor: `${Math.floor(Math.random() * 30) + 5}${String.fromCharCode(65 + Math.floor(Math.random() * 3))}`,
      amenities: "Swimming Pool, Fitness Center, 24/7 Security, Parking",
      contact: `+66 ${Math.floor(Math.random() * 20) + 80} ${Math.floor(Math.random() * 900) + 100} ${Math.floor(Math.random() * 9000) + 1000}`,
      images: propertyImages,
      status: Math.random() > 0.85 ? "reserved" : "available",
      views: Math.floor(Math.random() * 490) + 10,
      userId: `user${Math.floor(Math.random() * 3) + 1}`,
      createdAt: new Date(2024, 0, Math.floor(Math.random() * 15) + 1).toISOString(),
      updatedAt: new Date(2024, 0, Math.floor(Math.random() * 15) + 1).toISOString(),
    })
  }

  return [...fakeProperties, ...additionalProperties]
}

// Export expanded dataset
export const allFakeProperties = generateMoreFakeProperties(90) // Total of 100 properties
