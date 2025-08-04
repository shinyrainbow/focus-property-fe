"use client"

import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Copy, Phone, Mail, MapPin, Clock, User, MessageCircle, ExternalLink } from "lucide-react"
import { useLanguage } from "@/hooks/use-language"
import { allFakeProperties } from "@/lib/fake-data"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"

export default function InquiryPage() {
  const { t } = useLanguage()
  const params = useParams()
  const router = useRouter()
  const [copied, setCopied] = useState(false)

  const property = allFakeProperties.find((p) => p.id === params.id)

  if (!property) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-4xl mx-auto px-6 py-12">
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

  const copyLineId = async () => {
    try {
      await navigator.clipboard.writeText("@focusproperty")
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Back Button */}
        <Button variant="ghost" onClick={() => router.back()} className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Property
        </Button>

        {/* Property Summary */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <img
                src={property.images[0] || "/placeholder.svg"}
                alt={property.title}
                className="w-full md:w-48 h-32 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">{property.title}</h1>
                <p className="text-gray-600 mb-2 flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  {property.location}
                </p>
                <div className="flex items-center gap-4 mb-2">
                  <span className="text-2xl font-bold text-primary">฿{property.price.toLocaleString()}</span>
                  <Badge variant={property.status === "available" ? "default" : "secondary"}>{property.status}</Badge>
                </div>
                <div className="flex gap-4 text-sm text-gray-600">
                  <span>{property.bedrooms} bed</span>
                  <span>{property.bathrooms} bath</span>
                  <span>{property.area} sqm</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* LINE Contact */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-green-600">
                <MessageCircle className="h-5 w-5 mr-2" />
                Contact via LINE
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* QR Code */}
              <div className="text-center">
                <div className="inline-block p-4 bg-white border-2 border-gray-200 rounded-lg">
                  <img src="/placeholder.svg?height=200&width=200" alt="LINE QR Code" className="w-48 h-48" />
                </div>
                <p className="text-sm text-gray-600 mt-2">Scan QR code to add us on LINE</p>
              </div>

              {/* LINE ID */}
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">Or search LINE ID:</p>
                <div className="flex items-center justify-center gap-2">
                  <code className="bg-gray-100 px-3 py-2 rounded text-lg font-mono">@focusproperty</code>
                  <Button size="sm" variant="outline" onClick={copyLineId}>
                    <Copy className="h-4 w-4" />
                    {copied ? "Copied!" : "Copy"}
                  </Button>
                </div>
              </div>

              {/* Instructions */}
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">How to inquire:</h4>
                <ol className="text-sm text-green-700 space-y-1">
                  <li>1. Scan QR code or search LINE ID</li>
                  <li>2. Add @focusproperty as friend</li>
                  <li>
                    3. Send property ID: <strong>{property.id}</strong>
                  </li>
                  <li>4. Our agent will respond within 30 minutes</li>
                </ol>
              </div>
            </CardContent>
          </Card>

          {/* Other Contact Methods */}
          <Card>
            <CardHeader>
              <CardTitle>Other Contact Methods</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Phone */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Phone className="h-5 w-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">Call Us</p>
                  <p className="text-sm text-gray-600">+66 2 123 4567</p>
                </div>
                <Button size="sm" variant="outline">
                  <Phone className="h-4 w-4 mr-1" />
                  Call
                </Button>
              </div>

              <Separator />

              {/* Email */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <Mail className="h-5 w-5 text-purple-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">Email</p>
                  <p className="text-sm text-gray-600">inquiry@focusproperty.com</p>
                </div>
                <Button size="sm" variant="outline">
                  <Mail className="h-4 w-4 mr-1" />
                  Email
                </Button>
              </div>

              <Separator />

              {/* Office Visit */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-orange-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">Visit Office</p>
                  <p className="text-sm text-gray-600">Sukhumvit 21, Bangkok</p>
                </div>
                <Button size="sm" variant="outline">
                  <ExternalLink className="h-4 w-4 mr-1" />
                  Map
                </Button>
              </div>

              <Separator />

              {/* Business Hours */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-4 w-4 text-gray-600" />
                  <span className="font-medium">Business Hours</span>
                </div>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>Monday - Friday: 9:00 AM - 7:00 PM</p>
                  <p>Saturday - Sunday: 10:00 AM - 6:00 PM</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Property Agent */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="h-5 w-5 mr-2" />
              Your Property Agent
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <img
                src="/placeholder.svg?height=80&width=80"
                alt="Agent"
                className="w-20 h-20 rounded-full object-cover"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-lg">Somchai Thanakit</h3>
                <p className="text-gray-600">Senior Property Consultant</p>
                <p className="text-sm text-gray-500 mt-1">5+ years experience • 200+ properties sold</p>
                <div className="flex gap-2 mt-2">
                  <Button size="sm">
                    <MessageCircle className="h-4 w-4 mr-1" />
                    LINE: @somchai.fp
                  </Button>
                  <Button size="sm" variant="outline">
                    <Phone className="h-4 w-4 mr-1" />
                    +66 81 234 5678
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
