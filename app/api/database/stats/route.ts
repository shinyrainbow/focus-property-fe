import { NextResponse } from "next/server"
import { getFakeDatabaseStats } from "@/lib/fake-data"

export async function GET() {
  try {
    const stats = getFakeDatabaseStats()
    return NextResponse.json(stats)
  } catch (error) {
    console.error("Error in stats API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
