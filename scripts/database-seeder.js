import fs from "fs"
import path from "path"

// Generate comprehensive fake data for the property database
function generateFakeProperties(count = 100) {
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

  const properties = []

  for (let i = 1; i <= count; i++) {
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

    properties.push({
      id: i.toString(),
      title: `${propertyType === "Studio" ? "Modern Studio" : propertyType === "Penthouse" ? "Luxury Penthouse" : `${bedrooms}BR ${propertyType}`} at ${condoName} ${district}`,
      description: `Beautiful ${propertyType.toLowerCase()} in the heart of ${district}. This property features modern amenities and is perfect for ${listingType === "rent" ? "rental" : "investment"}. Located in a prime area with easy access to BTS/MRT stations, shopping centers, and restaurants. The unit comes with high-quality finishes, modern appliances, and stunning city views.`,
      listingType,
      price,
      location: `${district}, Bangkok`,
      propertyType,
      bedrooms,
      bathrooms,
      area,
      floor: `${Math.floor(Math.random() * 30) + 5}${String.fromCharCode(65 + Math.floor(Math.random() * 3))}`,
      amenities: "Swimming Pool, Fitness Center, 24/7 Security, Parking, Garden, Sky Lounge",
      contact: `+66 ${Math.floor(Math.random() * 20) + 80} ${Math.floor(Math.random() * 900) + 100} ${Math.floor(Math.random() * 9000) + 1000}`,
      images: propertyImages,
      status: Math.random() > 0.85 ? "reserved" : "available",
      views: Math.floor(Math.random() * 490) + 10,
      userId: `user${Math.floor(Math.random() * 3) + 1}`,
      createdAt: new Date(2024, 0, Math.floor(Math.random() * 15) + 1).toISOString(),
      updatedAt: new Date(2024, 0, Math.floor(Math.random() * 15) + 1).toISOString(),
    })
  }

  return properties
}

function generateFakeUsers() {
  return [
    {
      id: "user1",
      username: "testuser",
      email: "test@focusproperty.com",
      name: "Test User",
      phone: "+66 81 234 5678",
      role: "agent",
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z",
    },
    {
      id: "user2",
      username: "john.doe",
      email: "john.doe@example.com",
      name: "John Doe",
      phone: "+66 82 345 6789",
      role: "agent",
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z",
    },
    {
      id: "user3",
      username: "admin",
      email: "admin@focusproperty.com",
      name: "Admin User",
      phone: "+66 83 456 7890",
      role: "admin",
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z",
    },
  ]
}

// Generate and save data
console.log("🌱 Generating fake data...")

const properties = generateFakeProperties(100)
const users = generateFakeUsers()

const data = {
  properties,
  users,
  metadata: {
    generated: new Date().toISOString(),
    totalProperties: properties.length,
    totalUsers: users.length,
  },
}

// Save to JSON file
const outputPath = path.join(process.cwd(), "fake-database.json")
fs.writeFileSync(outputPath, JSON.stringify(data, null, 2))

console.log(`✅ Generated ${properties.length} properties and ${users.length} users`)
console.log(`📁 Data saved to: ${outputPath}`)
console.log("🚀 You can now use this data in your API server!")

// Display some statistics
const saleProperties = properties.filter((p) => p.listingType === "sale").length
const rentProperties = properties.filter((p) => p.listingType === "rent").length
const avgSalePrice =
  properties.filter((p) => p.listingType === "sale").reduce((sum, p) => sum + p.price, 0) / saleProperties
const avgRentPrice =
  properties.filter((p) => p.listingType === "rent").reduce((sum, p) => sum + p.price, 0) / rentProperties

console.log("\n📊 Data Statistics:")
console.log(`   Sale Properties: ${saleProperties}`)
console.log(`   Rent Properties: ${rentProperties}`)
console.log(`   Average Sale Price: ฿${Math.round(avgSalePrice).toLocaleString()}`)
console.log(`   Average Rent Price: ฿${Math.round(avgRentPrice).toLocaleString()}/month`)
