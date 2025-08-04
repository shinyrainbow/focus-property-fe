"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Bed, Bath, Square, Heart, ChevronLeft, ChevronRight, Eye, MessageCircle } from "lucide-react"
import { useLanguage } from "@/hooks/use-language"

interface Property {
  id: string
  title: string
  price: number
  location: string
  bedrooms: number
  bathrooms: number
  area: number
  images: string[]
  type: string
  status: "available" | "reserved"
}

interface PropertyCardProps {
  property: Property
}

export function PropertyCard({ property }: PropertyCardProps) {
  const { t } = useLanguage()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isFavorite, setIsFavorite] = useState(false)

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length)
  }

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length)
  }

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsFavorite(!isFavorite)
  }

  const handleViewDetail = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    // Navigate to property detail page
    window.location.href = `/property/${property.id}`
  }

  const handleInquiry = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    // Navigate to inquiry page
    window.location.href = `/inquiry/${property.id}`
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
      <div className="relative h-48 overflow-hidden">
        {/* Main Image */}
        <Image
          src={property.images[currentImageIndex] || "/placeholder.svg"}
          alt={property.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Status Badge - Top Left */}
        <Badge
          className={`absolute top-3 left-3 z-10 ${
            property.status === "available"
              ? "bg-green-500 hover:bg-green-600 text-white"
              : "bg-red-500 hover:bg-red-600 text-white"
          }`}
        >
          {property.status === "available" ? t("property.available") : t("property.reserved")}
        </Badge>

        {/* Property Type Badge - Top Right */}
        <Badge className="absolute top-3 right-3 z-10 bg-primary hover:bg-primary/90">{property.type}</Badge>

        {/* Image Navigation - Only show if multiple images */}
        {property.images.length > 1 && (
          <>
            {/* Previous Button */}
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            {/* Next Button */}
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              aria-label="Next image"
            >
              <ChevronRight className="h-4 w-4" />
            </button>

            {/* Image Indicators */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex space-x-1">
              {property.images.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    setCurrentImageIndex(index)
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    index === currentImageIndex ? "bg-white" : "bg-white/50"
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}

        {/* Favorite Button */}
        <button
          onClick={toggleFavorite}
          className="absolute top-3 right-14 z-10 bg-white/90 hover:bg-white text-gray-700 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110"
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart
            className={`h-4 w-4 transition-colors duration-200 ${
              isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"
            }`}
          />
        </button>

        {/* Image Counter */}
        {property.images.length > 1 && (
          <div className="absolute bottom-3 right-3 z-10 bg-black/50 text-white text-xs px-2 py-1 rounded">
            {currentImageIndex + 1}/{property.images.length}
          </div>
        )}
      </div>

      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {property.title}
        </h3>

        <div className="flex items-center text-gray-600 mb-3">
          <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
          <span className="text-sm truncate">{property.location}</span>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
          <div className="flex items-center">
            <Bed className="h-4 w-4 mr-1" />
            <span>
              {property.bedrooms} {t("property.bedrooms")}
            </span>
          </div>
          <div className="flex items-center">
            <Bath className="h-4 w-4 mr-1" />
            <span>
              {property.bathrooms} {t("property.bathrooms")}
            </span>
          </div>
          <div className="flex items-center">
            <Square className="h-4 w-4 mr-1" />
            <span>
              {property.area} {t("property.sqm")}
            </span>
          </div>
        </div>

        <div className="text-2xl font-bold text-primary mb-4">฿{property.price.toLocaleString()}</div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 bg-transparent hover:bg-primary hover:text-white transition-colors"
            onClick={handleViewDetail}
          >
            <Eye className="h-4 w-4 mr-2" />
            {t("property.view.detail")}
          </Button>
          <Button size="sm" className="flex-1" onClick={handleInquiry}>
            <MessageCircle className="h-4 w-4 mr-2" />
            {t("property.inquiry")}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
