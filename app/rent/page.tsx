"use client"

import { useEffect, useState } from "react"
import { Navbar } from "@/components/navbar"
import { PropertyCard } from "@/components/property-card"
import { SearchFilters } from "@/components/search-filters"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, SlidersHorizontal, Grid3X3, List } from "lucide-react"
import { useLanguage } from "@/hooks/use-language"
import { allFakeProperties } from "@/lib/fake-data"

// Filter for rental properties only
// const rentalProperties = allFakeProperties
//   .filter((property) => property.listingType === "rent")
//   .map((property) => ({
//     id: property.id,
//     title: property.title,
//     price: property.price,
//     location: property.location,
//     bedrooms: property.bedrooms,
//     bathrooms: property.bathrooms,
//     area: property.area,
//     images: property.images,
//     type: property.propertyType,
//     status: property.status as "available" | "reserved",
//   }))

export default function RentPage() {
  const { t } = useLanguage()
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("newest")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showFilters, setShowFilters] = useState(true)
  const [properties, setProperties] = useState([]);

  const [filteredProperties, setFilteredProperties] = useState(properties)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch("/api/properties");
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('data:::lengthhhhh::',data.properties.length)
        setProperties(data.properties);
        setFilteredProperties(data.properties);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  const handleFiltersChange = (filters: any) => {
    let filtered = properties
// console.log(filtered, 9999)
    // Apply search query filter
    if (searchQuery) {
      filtered = filtered.filter(
        (property) =>
          property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          property.location.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Apply location filter
    if (filters.location && filters.location !== "any") {
      filtered = filtered.filter((property) => property.location.includes(filters.location))
    }

    // Apply price range filter
    filtered = filtered.filter((property) => property.price >= filters.minPrice && property.price <= filters.maxPrice)

    // Apply room type filter
    if (filters.roomType && filters.roomType !== "any") {
      if (filters.roomType === t("option.studio")) {
        filtered = filtered.filter((property) => property.type === "Studio")
      } else if (filters.roomType === t("option.1bed")) {
        filtered = filtered.filter((property) => property.bedrooms === 1 && property.type !== "Studio")
      } else if (filters.roomType === t("option.2bed")) {
        filtered = filtered.filter((property) => property.bedrooms === 2)
      } else if (filters.roomType === t("option.3bed")) {
        filtered = filtered.filter((property) => property.bedrooms === 3)
      } else if (filters.roomType === t("option.penthouse")) {
        filtered = filtered.filter((property) => property.type === "Penthouse")
      }
    }

    // Apply property type filter
    if (filters.propertyType && filters.propertyType !== "any") {
      filtered = filtered.filter((property) => property.type === filters.propertyType)
    }

    // Apply sorting
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "area-large":
        filtered.sort((a, b) => b.area - a.area)
        break
      default:
        // newest first (default order)
        break
    }

    setFilteredProperties(filtered)
  }

  const handleSearch = () => {
    handleFiltersChange({})
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl font-bold mb-3">{t("search.title.rent")}</h1>
            <p className="text-base sm:text-lg mb-4 sm:mb-6 max-w-xl mx-auto px-4">{t("search.subtitle.rent")}</p>

            {/* Search Bar - Reduced Width */}
            <div className="max-w-xl mx-auto">
              <div className="bg-white rounded-lg p-3 sm:p-4 shadow-lg">
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder={t("hero.search.placeholder")}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9 h-9 sm:h-10 text-gray-900 border-gray-200 text-sm"
                    />
                  </div>
                  <Button size="sm" onClick={handleSearch} className="h-9 sm:h-10 px-3 sm:px-4 text-sm">
                    <Search className="h-3 sm:h-4 w-3 sm:w-4 mr-1 sm:mr-2" />
                    <span className="hidden sm:inline">Search</span>
                    <span className="sm:hidden">Search</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            {/* Mobile Filter Toggle */}
            <div className="lg:hidden">
              <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="w-full mb-4 text-sm">
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                {showFilters ? "Hide Filters" : "Show Filters"}
              </Button>
            </div>

            {/* Filters Sidebar */}
            {showFilters && (
              <div className="w-full lg:w-80 lg:flex-shrink-0">
                <div className="lg:sticky lg:top-4">
                  <SearchFilters searchType="rent" onFiltersChange={handleFiltersChange} />
                </div>
              </div>
            )}

            {/* Results Section */}
            <div className="flex-1 min-w-0">
              {/* Results Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                  <h2 className="text-lg sm:text-xl font-bold text-gray-900">{t("search.results")}</h2>
                  <p className="text-sm text-gray-600">
                    {filteredProperties.length} {t("search.found")}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                  {/* Sort Dropdown */}
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-full sm:w-40 text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">{t("search.sort.newest")}</SelectItem>
                      <SelectItem value="price-low">{t("search.sort.price.low")}</SelectItem>
                      <SelectItem value="price-high">{t("search.sort.price.high")}</SelectItem>
                      <SelectItem value="area-large">{t("search.sort.area.large")}</SelectItem>
                    </SelectContent>
                  </Select>

                  <div className="flex items-center gap-2">
                    {/* View Mode Toggle */}
                    <div className="flex border rounded-lg">
                      <Button
                        variant={viewMode === "grid" ? "default" : "ghost"}
                        size="sm"
                        onClick={() => setViewMode("grid")}
                      >
                        <Grid3X3 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant={viewMode === "list" ? "default" : "ghost"}
                        size="sm"
                        onClick={() => setViewMode("list")}
                      >
                        <List className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Desktop Toggle Filters */}
                    <Button
                      variant="outline"
                      onClick={() => setShowFilters(!showFilters)}
                      className="hidden lg:flex text-sm"
                    >
                      <SlidersHorizontal className="h-4 w-4 mr-2" />
                      Filters
                    </Button>
                  </div>
                </div>
              </div>

              {/* Results Grid */}
              {filteredProperties.length > 0 ? (
                <div
                  className={
                    viewMode === "grid"
                      ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-6"
                      : "space-y-4"
                  }
                >
                  {filteredProperties.map((property) => (
                    <PropertyCard key={property.id} property={property} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="text-gray-400 mb-4">
                    <Search className="h-12 sm:h-16 w-12 sm:w-16 mx-auto" />
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">{t("search.no.results")}</h3>
                  <p className="text-sm text-gray-600 mb-6 px-4">{t("search.no.results.desc")}</p>
                  <Button onClick={() => handleFiltersChange({})} className="text-sm">
                    {t("search.clear.filters")}
                  </Button>
                </div>
              )}

              {/* Load More Button */}
              {filteredProperties.length > 0 && (
                <div className="text-center mt-8 sm:mt-12">
                  <Button variant="outline" size="lg" className="px-6 sm:px-8 bg-transparent text-sm">
                    {t("properties.loadmore")}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
