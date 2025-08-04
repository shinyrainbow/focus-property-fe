"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { MapPin, DollarSign, Home, Settings, X } from "lucide-react"
import { useLanguage } from "@/hooks/use-language"

interface SearchFiltersProps {
  searchType: "rent" | "buy"
  onFiltersChange: (filters: any) => void
}

const bangkokDistricts = [
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
]

const propertyTypes = ["Condo", "Studio", "Penthouse", "Suite", "Duplex", "Loft"]

export function SearchFilters({ searchType, onFiltersChange }: SearchFiltersProps) {
  const { t } = useLanguage()
  const [filters, setFilters] = useState({
    location: "any",
    minPrice: searchType === "rent" ? 10000 : 1000000,
    maxPrice: searchType === "rent" ? 150000 : 30000000,
    roomType: "any",
    propertyType: "any",
    amenities: [] as string[],
  })

  const amenitiesList = [
    { id: "pool", label: t("amenity.pool") },
    { id: "gym", label: t("amenity.gym") },
    { id: "parking", label: t("amenity.parking") },
    { id: "security", label: t("amenity.security") },
    { id: "elevator", label: t("amenity.elevator") },
    { id: "balcony", label: t("amenity.balcony") },
    { id: "furnished", label: t("amenity.furnished") },
    { id: "pets", label: t("amenity.pets") },
  ]

  const roomTypes = [
    t("option.studio"),
    t("option.1bed"),
    t("option.2bed"),
    t("option.3bed"),
    t("option.4bed"),
    t("option.penthouse"),
  ]

  const handleFilterChange = (key: string, value: any) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFiltersChange(newFilters)
  }

  const handleAmenityChange = (amenityId: string, checked: boolean) => {
    const newAmenities = checked
      ? [...filters.amenities, amenityId]
      : filters.amenities.filter((id) => id !== amenityId)
    handleFilterChange("amenities", newAmenities)
  }

  const clearAllFilters = () => {
    const clearedFilters = {
      location: "any",
      minPrice: searchType === "rent" ? 10000 : 1000000,
      maxPrice: searchType === "rent" ? 150000 : 30000000,
      roomType: "any",
      propertyType: "any",
      amenities: [],
    }
    setFilters(clearedFilters)
    onFiltersChange(clearedFilters)
  }

  const priceStep = searchType === "rent" ? 5000 : 500000
  const priceMin = searchType === "rent" ? 5000 : 500000
  const priceMax = searchType === "rent" ? 200000 : 50000000

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0 pb-4">
        <CardTitle className="flex items-center text-lg">
          <Settings className="h-5 w-5 mr-2" />
          Filters
        </CardTitle>
        <Button variant="ghost" size="sm" onClick={clearAllFilters} className="self-start sm:self-auto">
          <X className="h-4 w-4 mr-2" />
          {t("search.clear.filters")}
        </Button>
      </CardHeader>
      <CardContent className="space-y-4 sm:space-y-6">
        {/* Location Filter */}
        <div className="space-y-2">
          <Label className="flex items-center text-sm font-medium">
            <MapPin className="h-4 w-4 mr-2" />
            {t("filter.location")}
          </Label>
          <Select value={filters.location} onValueChange={(value) => handleFilterChange("location", value)}>
            <SelectTrigger>
              <SelectValue placeholder={t("filter.any.location")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">{t("filter.any.location")}</SelectItem>
              {bangkokDistricts.map((district) => (
                <SelectItem key={district} value={district}>
                  {district}, Bangkok
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Price Range Filter */}
        <div className="space-y-3 sm:space-y-4">
          <Label className="flex items-center text-sm font-medium">
            <DollarSign className="h-4 w-4 mr-2" />
            {t("filter.price.range")}
          </Label>
          <div className="px-1 sm:px-2">
            <Slider
              value={[filters.minPrice, filters.maxPrice]}
              onValueChange={([min, max]) => {
                handleFilterChange("minPrice", min)
                handleFilterChange("maxPrice", max)
              }}
              min={priceMin}
              max={priceMax}
              step={priceStep}
              className="w-full"
            />
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
            <div className="flex-1">
              <Label className="text-xs text-gray-500">{t("filter.min.price")}</Label>
              <Input
                type="number"
                value={filters.minPrice}
                onChange={(e) => handleFilterChange("minPrice", Number.parseInt(e.target.value) || priceMin)}
                className="mt-1 text-sm"
              />
            </div>
            <div className="flex-1">
              <Label className="text-xs text-gray-500">{t("filter.max.price")}</Label>
              <Input
                type="number"
                value={filters.maxPrice}
                onChange={(e) => handleFilterChange("maxPrice", Number.parseInt(e.target.value) || priceMax)}
                className="mt-1 text-sm"
              />
            </div>
          </div>
          <div className="text-center text-sm text-gray-600">
            ฿{filters.minPrice.toLocaleString()} - ฿{filters.maxPrice.toLocaleString()}
            {searchType === "rent" && ` ${t("property.per.month")}`}
          </div>
        </div>

        {/* Room Type Filter */}
        <div className="space-y-2">
          <Label className="flex items-center text-sm font-medium">
            <Home className="h-4 w-4 mr-2" />
            {t("filter.room.type")}
          </Label>
          <Select value={filters.roomType} onValueChange={(value) => handleFilterChange("roomType", value)}>
            <SelectTrigger>
              <SelectValue placeholder={t("filter.any.rooms")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">{t("filter.any.rooms")}</SelectItem>
              {roomTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Property Type Filter */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">{t("filter.property.type")}</Label>
          <Select value={filters.propertyType} onValueChange={(value) => handleFilterChange("propertyType", value)}>
            <SelectTrigger>
              <SelectValue placeholder={t("filter.any.type")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">{t("filter.any.type")}</SelectItem>
              {propertyTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Amenities Filter */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">{t("filter.amenities")}</Label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2 sm:gap-3">
            {amenitiesList.map((amenity) => (
              <div key={amenity.id} className="flex items-center space-x-2">
                <Checkbox
                  id={amenity.id}
                  checked={filters.amenities.includes(amenity.id)}
                  onCheckedChange={(checked) => handleAmenityChange(amenity.id, checked as boolean)}
                />
                <Label htmlFor={amenity.id} className="text-sm font-normal cursor-pointer leading-tight">
                  {amenity.label}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Apply Filters Button */}
        <Button className="w-full" onClick={() => onFiltersChange(filters)}>
          {t("search.apply.filters")}
        </Button>
      </CardContent>
    </Card>
  )
}
