"use client";

import { Navbar } from "@/components/navbar";
import { PropertyCard } from "@/components/property-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter, MapPin, DollarSign, Home } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import { allFakeProperties } from "@/lib/fake-data";
import { auth } from "@/auth";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
// import { logout } from "@/lib/auth";

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
];

export default function HomePage() {
  const { t } = useLanguage();

  const priceRanges = [
    t("option.any.price"),
    t("option.under.3m"),
    t("option.3m.5m"),
    t("option.5m.8m"),
    t("option.8m.12m"),
    t("option.12m.20m"),
    t("option.above.20m"),
  ];

  const roomTypes = [
    t("option.any.type"),
    t("option.studio"),
    t("option.1bed"),
    t("option.2bed"),
    t("option.3bed"),
    t("option.4bed"),
    t("option.penthouse"),
  ];

  const { data: session, status } = useSession();

  const [properties, setProperties] = useState([]);
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
        console.log('data:::',data)
        setProperties(data.properties);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  if (loading) return <p>Loading properties...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="min-h-screen bg-gray-50">

      <Navbar />

      {/* Hero Section */}
      <section className="relative py-12 overflow-hidden min-h-[500px]">
        {/* Background with gradient and image */}
        <div className="absolute inset-0">
          {/* Gradient background */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-green-600/80"></div>

          {/* Happy family image on the right side */}
          <div className="absolute inset-0">
            <img
              src="/images/happy-family-condo.png"
              alt="Happy family in luxury condo"
              className="w-full h-full object-cover object-center"
            />
          </div>

          {/* Gradient overlay to blend image with background */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/70 to-transparent"></div>

          {/* Additional overlay for better text readability */}
          <div className="absolute inset-0 bg-black/10"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 xl:px-16 text-white">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              {t("hero.title")}
            </h1>
            <p className="text-lg sm:text-xl mb-8 max-w-2xl mx-auto">
              {t("hero.subtitle")}
            </p>

            {/* Enhanced Search Section - Centered */}
            <div className="max-w-3xl mx-auto">
              {/* Main Search Bar */}
              <div className="bg-white rounded-lg p-4 shadow-lg mb-6">
                <div className="relative mb-4">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    placeholder={t("hero.search.placeholder")}
                    className="pl-12 h-12 text-gray-900 text-base border-gray-200"
                  />
                </div>

                {/* Filter Options */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="space-y-2">
                    <label className="flex items-center text-sm font-medium text-gray-700">
                      <MapPin className="h-4 w-4 mr-2" />
                      {t("hero.location")}
                    </label>
                    <Select defaultValue={t("option.all.areas")}>
                      <SelectTrigger className="h-10">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={t("option.all.areas")}>
                          {t("option.all.areas")}
                        </SelectItem>
                        {bangkokDistricts.map((district) => (
                          <SelectItem key={district} value={district}>
                            {district}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center text-sm font-medium text-gray-700">
                      <DollarSign className="h-4 w-4 mr-2" />
                      {t("hero.price")}
                    </label>
                    <Select defaultValue={t("option.any.price")}>
                      <SelectTrigger className="h-10">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {priceRanges.map((range) => (
                          <SelectItem key={range} value={range}>
                            {range}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center text-sm font-medium text-gray-700">
                      <Home className="h-4 w-4 mr-2" />
                      {t("hero.rooms")}
                    </label>
                    <Select defaultValue={t("option.any.type")}>
                      <SelectTrigger className="h-10">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {roomTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Search Button */}
                <div className="flex justify-center">
                  <Button size="lg" className="px-8 h-10 text-base">
                    <Search className="h-4 w-4 mr-2" />
                    {t("hero.search.button")}
                  </Button>
                </div>
              </div>

              {/* Quick Filters */}
              <div className="flex flex-wrap justify-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-white/20 border-white/30 text-white hover:bg-white/30 text-sm"
                >
                  {t("filter.new")}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-white/20 border-white/30 text-white hover:bg-white/30 text-sm"
                >
                  {t("filter.ready")}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-white/20 border-white/30 text-white hover:bg-white/30 text-sm"
                >
                  {t("filter.construction")}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-white/20 border-white/30 text-white hover:bg-white/30 text-sm"
                >
                  {t("filter.luxury")}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Properties Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 xl:px-16">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                {t("properties.title")} jjjjj
              </h2>
              <p className="text-gray-600 text-sm">
                {t("properties.subtitle")}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <p className="text-gray-600 text-sm">
                {properties.length} {t("properties.available")}
              </p>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                {t("properties.filters")}
              </Button>
            </div>
          </div>

          {/* xxxx Updated grid to show maximum 4 properties per row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {properties.map((property, index) => (
              <PropertyCard key={index} property={property} />
            ))}
          </div>

          {/* Load More Button */}
          <div className="text-center mt-12">
            <Button variant="outline" size="lg" className="px-8 bg-transparent">
              {t("properties.loadmore")}
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 xl:px-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">
                500+
              </div>
              <div className="text-gray-600 text-sm">
                {t("stats.properties")}
              </div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">
                50+
              </div>
              <div className="text-gray-600 text-sm">
                {t("stats.districts")}
              </div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">
                1000+
              </div>
              <div className="text-gray-600 text-sm">
                {t("stats.customers")}
              </div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">
                24/7
              </div>
              <div className="text-gray-600 text-sm">{t("stats.support")}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 xl:px-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4 text-primary">
                FocusProperty
              </h3>
              <p className="text-gray-400 mb-4 text-sm">
                {t("footer.description")}
              </p>
              <div className="flex space-x-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-transparent border-gray-600 text-gray-400 hover:text-white text-sm"
                >
                  Facebook
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-transparent border-gray-600 text-gray-400 hover:text-white text-sm"
                >
                  Line
                </Button>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-base">
                {t("footer.quicklinks")}
              </h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    {t("nav.properties")}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    {t("filter.new")}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-base">
                {t("footer.propertytypes")}
              </h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Condos
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    {t("option.studio")}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    {t("option.penthouse")}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Luxury Suites
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-base">
                {t("footer.contact")}
              </h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>Bangkok, Thailand</li>
                <li>+66 2 xxx xxxx</li>
                <li>info@focusproperty.com</li>
                <li>Line: @focusproperty</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p className="text-sm">{t("footer.copyright")}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
