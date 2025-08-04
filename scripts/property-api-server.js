import express from "express"
import cors from "cors"
import { fileURLToPath } from "url"
import { dirname } from "path"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.static("public"))

// Mock database - In production, you'd use MongoDB, PostgreSQL, etc.
const properties = [
  {
    id: "1",
    title: "Luxury 2BR Condo at Noble Ploenchit Sukhumvit",
    description:
      "Beautiful condo in the heart of Sukhumvit. This property features modern amenities and is perfect for investment.",
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
    ],
    status: "available",
    views: 245,
    userId: "user1",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Modern Studio at Rhythm Asoke",
    description:
      "Modern studio in Silom district. Perfect for young professionals with easy access to business district.",
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
    images: ["https://images.unsplash.com/photo-1502672023488-70e25813eb80?w=400&h=300&fit=crop"],
    status: "available",
    views: 89,
    userId: "user2",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

const users = [
  {
    id: "user1",
    username: "testuser",
    email: "test@focusproperty.com",
    name: "Test User",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "user2",
    username: "john.doe",
    email: "john.doe@example.com",
    name: "John Doe",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

// Routes

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() })
})

// Get all properties with filtering and pagination
app.get("/api/properties", (req, res) => {
  try {
    const { page = 1, limit = 20, location, listingType, propertyType, minPrice, maxPrice, bedrooms } = req.query

    let filteredProperties = [...properties]

    // Apply filters
    if (location && location !== "any") {
      filteredProperties = filteredProperties.filter((p) => p.location.toLowerCase().includes(location.toLowerCase()))
    }

    if (listingType) {
      filteredProperties = filteredProperties.filter((p) => p.listingType === listingType)
    }

    if (propertyType && propertyType !== "any") {
      filteredProperties = filteredProperties.filter((p) => p.propertyType === propertyType)
    }

    if (minPrice) {
      filteredProperties = filteredProperties.filter((p) => p.price >= Number.parseInt(minPrice))
    }

    if (maxPrice) {
      filteredProperties = filteredProperties.filter((p) => p.price <= Number.parseInt(maxPrice))
    }

    if (bedrooms) {
      filteredProperties = filteredProperties.filter((p) => p.bedrooms === Number.parseInt(bedrooms))
    }

    // Pagination
    const startIndex = (Number.parseInt(page) - 1) * Number.parseInt(limit)
    const endIndex = startIndex + Number.parseInt(limit)
    const paginatedProperties = filteredProperties.slice(startIndex, endIndex)

    res.json({
      properties: paginatedProperties,
      pagination: {
        page: Number.parseInt(page),
        limit: Number.parseInt(limit),
        total: filteredProperties.length,
        pages: Math.ceil(filteredProperties.length / Number.parseInt(limit)),
      },
    })
  } catch (error) {
    console.error("Error fetching properties:", error)
    res.status(500).json({ error: "Failed to fetch properties" })
  }
})

// Get single property by ID
app.get("/api/properties/:id", (req, res) => {
  try {
    const { id } = req.params
    const property = properties.find((p) => p.id === id)

    if (!property) {
      return res.status(404).json({ error: "Property not found" })
    }

    // Increment views
    property.views += 1
    property.updatedAt = new Date().toISOString()

    res.json(property)
  } catch (error) {
    console.error("Error fetching property:", error)
    res.status(500).json({ error: "Failed to fetch property" })
  }
})

// Create new property
app.post("/api/properties", (req, res) => {
  try {
    const {
      title,
      description,
      listingType,
      price,
      location,
      propertyType,
      bedrooms,
      bathrooms,
      area,
      floor,
      amenities,
      contact,
      images,
      userId,
    } = req.body

    // Validation
    if (!title || !description || !listingType || !price || !location) {
      return res.status(400).json({ error: "Missing required fields" })
    }

    const newProperty = {
      id: (properties.length + 1).toString(),
      title,
      description,
      listingType,
      price: Number.parseInt(price),
      location,
      propertyType,
      bedrooms: Number.parseInt(bedrooms) || 0,
      bathrooms: Number.parseInt(bathrooms) || 1,
      area: Number.parseInt(area) || 0,
      floor: floor || "",
      amenities: amenities || "",
      contact,
      images: images || [],
      status: "available",
      views: 0,
      userId: userId || "user1",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    properties.push(newProperty)

    res.status(201).json(newProperty)
  } catch (error) {
    console.error("Error creating property:", error)
    res.status(500).json({ error: "Failed to create property" })
  }
})

// Update property
app.put("/api/properties/:id", (req, res) => {
  try {
    const { id } = req.params
    const propertyIndex = properties.findIndex((p) => p.id === id)

    if (propertyIndex === -1) {
      return res.status(404).json({ error: "Property not found" })
    }

    const updatedProperty = {
      ...properties[propertyIndex],
      ...req.body,
      id, // Ensure ID doesn't change
      updatedAt: new Date().toISOString(),
    }

    properties[propertyIndex] = updatedProperty

    res.json(updatedProperty)
  } catch (error) {
    console.error("Error updating property:", error)
    res.status(500).json({ error: "Failed to update property" })
  }
})

// Delete property
app.delete("/api/properties/:id", (req, res) => {
  try {
    const { id } = req.params
    const propertyIndex = properties.findIndex((p) => p.id === id)

    if (propertyIndex === -1) {
      return res.status(404).json({ error: "Property not found" })
    }

    properties.splice(propertyIndex, 1)

    res.json({ message: "Property deleted successfully" })
  } catch (error) {
    console.error("Error deleting property:", error)
    res.status(500).json({ error: "Failed to delete property" })
  }
})

// User routes
app.get("/api/users/:id", (req, res) => {
  try {
    const { id } = req.params
    const user = users.find((u) => u.id === id)

    if (!user) {
      return res.status(404).json({ error: "User not found" })
    }

    res.json(user)
  } catch (error) {
    console.error("Error fetching user:", error)
    res.status(500).json({ error: "Failed to fetch user" })
  }
})

// Get user's properties
app.get("/api/users/:id/properties", (req, res) => {
  try {
    const { id } = req.params
    const userProperties = properties.filter((p) => p.userId === id)

    res.json(userProperties)
  } catch (error) {
    console.error("Error fetching user properties:", error)
    res.status(500).json({ error: "Failed to fetch user properties" })
  }
})

// Database stats
app.get("/api/database/stats", (req, res) => {
  try {
    const totalProperties = properties.length
    const totalUsers = users.length

    const propertiesByType = properties.reduce((acc, property) => {
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
    }, [])

    const propertiesByLocation = properties
      .reduce((acc, property) => {
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
      }, [])
      .sort((a, b) => b._count.id - a._count.id)

    const propertiesByPropertyType = properties.reduce((acc, property) => {
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
    }, [])

    res.json({
      totalProperties,
      totalUsers,
      propertiesByType,
      propertiesByLocation,
      propertiesByListingType: propertiesByPropertyType,
    })
  } catch (error) {
    console.error("Error fetching stats:", error)
    res.status(500).json({ error: "Failed to fetch stats" })
  }
})

// Contact form submission
app.post("/api/contact", (req, res) => {
  try {
    const { name, email, phone, message, subject } = req.body

    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({ error: "Name, email, and message are required" })
    }

    // In a real app, you'd save to database and send email
    console.log("Contact form submission:", {
      name,
      email,
      phone,
      message,
      subject,
      timestamp: new Date().toISOString(),
    })

    res.json({
      message: "Thank you for your message. We will get back to you soon!",
      success: true,
    })
  } catch (error) {
    console.error("Error processing contact form:", error)
    res.status(500).json({ error: "Failed to process contact form" })
  }
})

// Property inquiry
app.post("/api/properties/:id/inquiry", (req, res) => {
  try {
    const { id } = req.params
    const { name, email, phone, message } = req.body

    const property = properties.find((p) => p.id === id)
    if (!property) {
      return res.status(404).json({ error: "Property not found" })
    }

    // In a real app, you'd save inquiry to database and notify property owner
    console.log("Property inquiry:", {
      propertyId: id,
      propertyTitle: property.title,
      inquirer: { name, email, phone },
      message,
      timestamp: new Date().toISOString(),
    })

    res.json({
      message: "Your inquiry has been sent successfully!",
      success: true,
    })
  } catch (error) {
    console.error("Error processing inquiry:", error)
    res.status(500).json({ error: "Failed to process inquiry" })
  }
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ error: "Something went wrong!" })
})

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" })
})

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Property API Server running on http://localhost:${PORT}`)
  console.log(`📊 Health check: http://localhost:${PORT}/health`)
  console.log(`🏠 Properties API: http://localhost:${PORT}/api/properties`)
})
