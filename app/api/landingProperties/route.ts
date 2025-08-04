import { type NextRequest, NextResponse } from "next/server"
import { getFakeProperties, allFakeProperties } from "@/lib/fake-data"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "20")
    const location = searchParams.get("location")
    const listingType = searchParams.get("listingType")
    const propertyType = searchParams.get("propertyType")
    const minPrice = searchParams.get("minPrice")
    const maxPrice = searchParams.get("maxPrice")
    const bedrooms = searchParams.get("bedrooms")

    const offset = (page - 1) * limit

    // Use fake data instead of database
    const properties = getFakeProperties({
      location: location || undefined,
      listingType: listingType || undefined,
      propertyType: propertyType || undefined,
      minPrice: minPrice ? Number.parseInt(minPrice) : undefined,
      maxPrice: maxPrice ? Number.parseInt(maxPrice) : undefined,
      bedrooms: bedrooms ? Number.parseInt(bedrooms) : undefined,
      limit,
      offset,
    })

    const total = allFakeProperties.length

    return NextResponse.json({
      properties,
    //   pagination: {
    //     page,
    //     limit,
    //     total,
    //     pages: Math.ceil(total / limit),
    //   },
    })
  } catch (error) {
    console.error("Error fetching properties:", error)
    return NextResponse.json({ error: "Failed to fetch properties" }, { status: 500 })
  }
}
