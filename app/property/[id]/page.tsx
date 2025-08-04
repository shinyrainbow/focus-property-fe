"use client"

import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  ArrowLeft,
  Heart,
  Share2,
  Phone,
  MessageCircle,
  Calendar,
  MapPin,
  Bed,
  Bath,
  Square,
  Car,
  Wifi,
  Dumbbell,
  Shield,
  ChevronLeft,
  ChevronRight,
  Eye,
  Clock,
} from "lucide-react"
import { useLanguage } from "@/hooks/use-language"
import { allFakeProperties } from "@/lib/fake-data"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import Link from "next/link"

export default function PropertyDetailPage() {
  const { t } = useLanguage()
  const params = useParams()
  const router = useRouter()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isFavorite, setIsFavorite] = useState(false)

  const property = allFakeProperties.find((p) => p.id === params.id)

  if (!property) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Property Not Found</h1>
            <Button onClick={() => router.back()}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Go Back
            </Button>
          </div>
        </div>
      </div>
    )
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length)
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: property.title,
          text: `Check out this property: ${property.title}`,
          url: window.location.href,
        })
      } catch (err) {
        console.error("Error sharing:", err)
      }
    } else {
      // Fallback to clipboard
      try {
        await navigator.clipboard.writeText(window.location.href)
        alert("Link copied to clipboard!")
      } catch (err) {
        console.error("Failed to copy:", err)
      }
    }
  }

  const amenities = [
    { icon: Wifi, label: "High-Speed WiFi" },
    { icon: Dumbbell, label: "Fitness Center" },
    { icon: Car, label: "Parking" },
    { icon: Shield, label: "24/7 Security" },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Back Button */}
        <Button variant="ghost" onClick={() => router.back()} className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Properties
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Images and Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <Card>
              <CardContent className="p-0">
                <div className="relative">
                  <img
                    src={property.images[currentImageIndex] || "/placeholder.svg"}
                    alt={property.title}
                    className="w-full h-96 object-cover rounded-t-lg"
                  />

                  {/* Navigation Buttons */}
                  {property.images.length > 1 && (
                    <>
                      <Button
                        variant="outline"
                        size="icon"
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                        onClick={prevImage}
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                        onClick={nextImage}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </>
                  )}

                  {/* Image Counter */}
                  <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                    {currentImageIndex + 1} / {property.images.length}
                  </div>

                  {/* Action Buttons */}
                  <div className="absolute top-4 right-4 flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="bg-white/80 hover:bg-white"
                      onClick={() => setIsFavorite(!isFavorite)}
                    >
                      <Heart className={`h-4 w-4 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
                    </Button>
                    <Button variant="outline" size="icon" className="bg-white/80 hover:bg-white" onClick={handleShare}>
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Thumbnail Gallery */}
                {property.images.length > 1 && (
                  <div className="p-4">
                    <div className="flex gap-2 overflow-x-auto">
                      {property.images.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 ${
                            index === currentImageIndex ? "border-primary" : "border-gray-200"
                          }`}
                        >
                          <img
                            src={image || "/placeholder.svg"}
                            alt={`View ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Property Details */}
            <Card>
              <CardHeader>
                <CardTitle>Property Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex items-center gap-2">
                    <Bed className="h-5 w-5 text-gray-500" />
                    <span>{property.bedrooms} Bedrooms</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Bath className="h-5 w-5 text-gray-500" />
                    <span>{property.bathrooms} Bathrooms</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Square className="h-5 w-5 text-gray-500" />
                    <span>{property.area} sqm</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Car className="h-5 w-5 text-gray-500" />
                    <span>1 Parking</span>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="font-semibold mb-2">Description</h4>
                  <p className="text-gray-600 leading-relaxed">
                    This beautiful {property.propertyType.toLowerCase()} offers modern living in the heart of Bangkok.
                    Featuring {property.bedrooms} spacious bedrooms and {property.bathrooms} well-appointed bathrooms,
                    this property is perfect for those seeking comfort and convenience. Located in the prestigious{" "}
                    {property.location} area, you'll have easy access to shopping, dining, and transportation.
                  </p>
                </div>

                <Separator />

                <div>
                  <h4 className="font-semibold mb-3">Amenities</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <amenity.icon className="h-4 w-4 text-primary" />
                        <span className="text-sm">{amenity.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Property Info and Contact */}
          <div className="space-y-6">
            {/* Property Summary */}
            <Card>
              <CardContent className="p-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">{property.title}</h1>
                <p className="text-gray-600 mb-4 flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  {property.location}
                </p>

                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl font-bold text-primary">฿{property.price.toLocaleString()}</span>
                  <Badge variant={property.status === "available" ? "default" : "secondary"}>{property.status}</Badge>
                </div>

                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Price per sqm:</span>
                    <span>฿{Math.round(property.price / property.area).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Property Type:</span>
                    <span>{property.propertyType}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Views:</span>
                    <span className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      {Math.floor(Math.random() * 500) + 100}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Listed:</span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {Math.floor(Math.random() * 30) + 1} days ago
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Agent</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href={`/inquiry/${property.id}`}>
                  <Button className="w-full" size="lg">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Inquire via LINE
                  </Button>
                </Link>

                <Button variant="outline" className="w-full bg-transparent" size="lg">
                  <Phone className="h-4 w-4 mr-2" />
                  Call Agent
                </Button>

                <Button variant="outline" className="w-full bg-transparent" size="lg">
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Viewing
                </Button>
              </CardContent>
            </Card>

            {/* Agent Card */}
            <Card>
              <CardHeader>
                <CardTitle>Property Agent</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <img
                    src="/placeholder.svg?height=60&width=60"
                    alt="Agent"
                    className="w-15 h-15 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold">Somchai Thanakit</h3>
                    <p className="text-sm text-gray-600">Senior Consultant</p>
                    <p className="text-xs text-gray-500">5+ years experience</p>
                  </div>
                </div>
                <div className="mt-3 space-y-2">
                  <Button variant="outline" size="sm" className="w-full bg-transparent">
                    <MessageCircle className="h-3 w-3 mr-1" />
                    LINE: @somchai.fp
                  </Button>
                  <Button variant="outline" size="sm" className="w-full bg-transparent">
                    <Phone className="h-3 w-3 mr-1" />
                    +66 81 234 5678
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
