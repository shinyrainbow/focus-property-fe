"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"

type Language = "EN" | "TH"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  EN: {
    // Navigation
    "nav.rent": "Rent",
    "nav.buy": "Buy",
    "nav.blog": "Blog",
    "nav.contact": "Contact Us",
    "nav.properties": "Properties",
    "nav.signin": "Sign In",
    "nav.signup": "Sign Up",
    "nav.dashboard": "Dashboard",
    "nav.signout": "Sign Out",

    // Contact Page
    "contact.title": "Contact Us",
    "contact.subtitle": "Get in touch with our expert team for all your property needs",
    "contact.form.title": "Send us a Message",
    "contact.form.name": "Full Name",
    "contact.form.email": "Email Address",
    "contact.form.phone": "Phone Number",
    "contact.form.subject": "Subject",
    "contact.form.message": "Message",
    "contact.form.send": "Send Message",
    "contact.info.title": "Contact Information",
    "contact.info.address": "Address",
    "contact.info.phone": "Phone",
    "contact.info.email": "Email",
    "contact.info.hours": "Business Hours",
    "contact.team.title": "Our Team",
    "contact.history.title": "About FocusProperty",
    "contact.history.content":
      "Founded in 2018, FocusProperty has become Bangkok's leading premium condominium specialist. We started with a simple mission: to help people find their perfect home in Thailand's vibrant capital. Over the years, we've built strong relationships with top developers and have successfully helped over 1,000 families and investors find their ideal properties. Our team of experienced professionals combines deep local market knowledge with international standards of service, ensuring every client receives personalized attention and expert guidance throughout their property journey.",

    // Sidebar
    "sidebar.dashboard": "Dashboard",
    "sidebar.add.property": "Add Property",
    "sidebar.my.properties": "My Properties",
    "sidebar.favorites": "Favorites",
    "sidebar.saved.searches": "Saved Searches",
    "sidebar.analytics": "Analytics",
    "sidebar.notifications": "Notifications",
    "sidebar.profile": "Profile",
    "sidebar.settings": "Settings",

    // Add Property
    "add.property.title": "Add New Property",
    "add.property.subtitle": "List your property for rent or sale",
    "add.property.basic.info": "Basic Information",
    "add.property.basic.desc": "Enter the basic details of your property",
    "add.property.details": "Property Details",
    "add.property.details.desc": "Specify the details of your property",
    "add.property.images": "Property Images",
    "add.property.images.desc": "Upload photos of your property",
    "add.property.contact": "Contact Information",
    "add.property.contact.desc": "How interested parties can reach you",
    "add.property.publish": "Publish Property",
    "add.property.save.draft": "Save as Draft",
    "add.property.success": "Property has been added successfully!",
    "add.property.error": "Failed to add property. Please try again.",

    // Form Fields
    "form.title": "Property Title",
    "form.title.placeholder": "e.g., Luxury 2BR Condo in Sukhumvit",
    "form.description": "Description",
    "form.description.placeholder": "Describe your property...",
    "form.listing.type": "Listing Type",
    "form.for.rent": "For Rent",
    "form.for.sale": "For Sale",
    "form.price": "Price (THB)",
    "form.price.rent.placeholder": "Monthly rent (e.g., 45000)",
    "form.price.sale.placeholder": "Sale price (e.g., 8500000)",
    "form.location": "Location",
    "form.location.placeholder": "Select district",
    "form.property.type": "Property Type",
    "form.bedrooms": "Bedrooms",
    "form.bathrooms": "Bathrooms",
    "form.area": "Area (sqm)",
    "form.floor": "Floor",
    "form.floor.placeholder": "e.g., 15th floor",
    "form.amenities": "Amenities",
    "form.amenities.placeholder": "Swimming pool, gym, parking, security...",
    "form.contact.details": "Contact Details",
    "form.contact.placeholder": "Phone number or email",
    "form.upload.images": "Click to upload images",
    "form.upload.desc": "PNG, JPG up to 10MB each",
    "form.choose.files": "Choose Files",

    // Search Page
    "search.title.rent": "Find Your Perfect Rental",
    "search.title.buy": "Find Your Dream Home",
    "search.subtitle.rent": "Discover premium condos for rent in Bangkok's best locations",
    "search.subtitle.buy": "Explore premium condos for sale in Bangkok's prime areas",
    "search.results": "Search Results",
    "search.found": "properties found",
    "search.no.results": "No properties found",
    "search.no.results.desc": "Try adjusting your search criteria to find more properties",
    "search.clear.filters": "Clear All Filters",
    "search.apply.filters": "Apply Filters",
    "search.sort.by": "Sort by",
    "search.sort.price.low": "Price: Low to High",
    "search.sort.price.high": "Price: High to Low",
    "search.sort.newest": "Newest First",
    "search.sort.area.large": "Area: Largest First",

    // Filters
    "filter.location": "Location",
    "filter.price.range": "Price Range",
    "filter.room.type": "Room Type",
    "filter.property.type": "Property Type",
    "filter.amenities": "Amenities",
    "filter.min.price": "Min Price",
    "filter.max.price": "Max Price",
    "filter.any.location": "Any Location",
    "filter.any.rooms": "Any Rooms",
    "filter.any.type": "Any Type",

    // Amenities
    "amenity.pool": "Swimming Pool",
    "amenity.gym": "Fitness Center",
    "amenity.parking": "Parking",
    "amenity.security": "24/7 Security",
    "amenity.elevator": "Elevator",
    "amenity.balcony": "Balcony",
    "amenity.furnished": "Fully Furnished",
    "amenity.pets": "Pet Friendly",

    // Hero Section
    "hero.title": "Premium Condos in Bangkok",
    "hero.subtitle":
      "Discover your perfect home among Bangkok's finest condominium properties. From luxury penthouses to cozy studios, find your ideal space in the heart of Thailand.",
    "hero.search.placeholder": "Search by project name, location, or developer...",
    "hero.location": "Location",
    "hero.price": "Price Range",
    "hero.rooms": "Room Type",
    "hero.search.button": "Search Properties",

    // Quick Filters
    "filter.new": "New Projects",
    "filter.ready": "Ready to Move",
    "filter.construction": "Under Construction",
    "filter.luxury": "Luxury Properties",

    // Properties Section
    "properties.title": "Featured Properties",
    "properties.subtitle": "Handpicked premium condos in Bangkok's prime locations",
    "properties.available": "properties available",
    "properties.filters": "More Filters",
    "properties.loadmore": "Load More Properties",

    // Property Card
    "property.bedrooms": "bedrooms",
    "property.bathrooms": "bathrooms",
    "property.sqm": "sqm",
    "property.available": "Available",
    "property.reserved": "Reserved",
    "property.view.detail": "View Detail",
    "property.inquiry": "Inquiry",
    "property.per.month": "/month",

    // Stats
    "stats.properties": "Properties Listed",
    "stats.districts": "Bangkok Districts",
    "stats.customers": "Happy Customers",
    "stats.support": "Customer Support",

    // Footer
    "footer.description": "Your trusted partner in finding premium condominium properties in Bangkok.",
    "footer.quicklinks": "Quick Links",
    "footer.propertytypes": "Property Types",
    "footer.contact": "Contact Info",
    "footer.copyright": "© 2024 FocusProperty. All rights reserved.",

    // Options
    "option.all.areas": "All Areas",
    "option.any.price": "Any Price",
    "option.any.type": "Any Type",
    "option.under.3m": "Under ฿3M",
    "option.3m.5m": "฿3M - ฿5M",
    "option.5m.8m": "฿5M - ฿8M",
    "option.8m.12m": "฿8M - ฿12M",
    "option.12m.20m": "฿12M - ฿20M",
    "option.above.20m": "Above ฿20M",
    "option.under.20k": "Under ฿20K",
    "option.20k.40k": "฿20K - ฿40K",
    "option.40k.60k": "฿40K - ฿60K",
    "option.60k.100k": "฿60K - ฿100K",
    "option.above.100k": "Above ฿100K",
    "option.studio": "Studio",
    "option.1bed": "1 Bedroom",
    "option.2bed": "2 Bedrooms",
    "option.3bed": "3 Bedrooms",
    "option.4bed": "4+ Bedrooms",
    "option.penthouse": "Penthouse",

    // Blog
    "blog.title": "Property Blog",
    "blog.subtitle": "Latest insights, tips, and news about Bangkok real estate",
    "blog.home": "Home & Living",
    "blog.condo": "Condo Insights",
    "blog.townhome": "Townhome Guide",
    "blog.home.desc": "Tips for home decoration, living, and lifestyle",
    "blog.condo.desc": "Everything about condo living in Bangkok",
    "blog.townhome.desc": "Complete guide to townhome investment and living",
    "blog.read.more": "Read More",
    "blog.minutes.read": "min read",
    "blog.published": "Published",
  },
  TH: {
    // Navigation
    "nav.rent": "เช่า",
    "nav.buy": "ซื้อ",
    "nav.blog": "บล็อก",
    "nav.contact": "ติดต่อเรา",
    "nav.properties": "อสังหาริมทรัพย์",
    "nav.signin": "เข้าสู่ระบบ",
    "nav.signup": "สมัครสมาชิก",
    "nav.dashboard": "แดชบอร์ด",
    "nav.signout": "ออกจากระบบ",

    // Contact Page
    "contact.title": "ติดต่อเรา",
    "contact.subtitle": "ติดต่อทีมผู้เชี่ยวชาญของเราสำหรับความต้องการด้านอสังหาริมทรัพย์ทั้งหมด",
    "contact.form.title": "ส่งข้อความถึงเรา",
    "contact.form.name": "ชื่อ-นามสกุล",
    "contact.form.email": "อีเมล",
    "contact.form.phone": "หมายเลขโทรศัพท์",
    "contact.form.subject": "หัวข้อ",
    "contact.form.message": "ข้อความ",
    "contact.form.send": "ส่งข้อความ",
    "contact.info.title": "ข้อมูลติดต่อ",
    "contact.info.address": "ที่อยู่",
    "contact.info.phone": "โทรศัพท์",
    "contact.info.email": "อีเมล",
    "contact.info.hours": "เวลาทำการ",
    "contact.team.title": "ทีมงานของเรา",
    "contact.history.title": "เกี่ยวกับ FocusProperty",
    "contact.history.content":
      "ก่อตั้งขึ้นในปี 2561 FocusProperty ได้กลายเป็นผู้เชี่ยวชาญด้านคอนโดมิเนียมพรีเมียมชั้นนำของกรุงเทพฯ เราเริ่มต้นด้วยภารกิจง่ายๆ คือช่วยให้ผู้คนค้นหาบ้านในฝันในเมืองหลวงที่มีชีวิتชีวาของประเทศไทย ตลอดหลายปีที่ผ่านมา เราได้สร้างความสัมพันธ์ที่แข็งแกร่งกับนักพัฒนาชั้นนำ และได้ช่วยเหลือครอบครัวและนักลงทุนกว่า 1,000 รายในการค้นหาอสังหาริมทรัพย์ในอุดมคติ ทีมผู้เชี่ยวชาญที่มีประสบการณ์ของเราผสมผสานความรู้ตลาดท้องถิ่นอย่างลึกซึ้งกับมาตรฐานการบริการระดับสากล เพื่อให้มั่นใจว่าลูกค้าทุกรายได้รับความเอาใจใส่เป็นรายบุคคลและคำแนะนำจากผู้เชี่ยวชาญตลอดการเดินทางด้านอสังหาริมทรัพย์",

    // Sidebar
    "sidebar.dashboard": "แดชบอร์ด",
    "sidebar.add.property": "เพิ่มอสังหาริมทรัพย์",
    "sidebar.my.properties": "อสังหาริมทรัพย์ของฉัน",
    "sidebar.favorites": "รายการโปรด",
    "sidebar.saved.searches": "การค้นหาที่บันทึก",
    "sidebar.analytics": "สถิติ",
    "sidebar.notifications": "การแจ้งเตือน",
    "sidebar.profile": "โปรไฟล์",
    "sidebar.settings": "การตั้งค่า",

    // Add Property
    "add.property.title": "เพิ่มอสังหาริมทรัพย์ใหม่",
    "add.property.subtitle": "ลงประกาศอสังหาริมทรัพย์ของคุณเพื่อให้เช่าหรือขาย",
    "add.property.basic.info": "ข้อมูลพื้นฐาน",
    "add.property.basic.desc": "กรอกรายละเอียดพื้นฐานของอสังหาริมทรัพย์",
    "add.property.details": "รายละเอียดอสังหาริมทรัพย์",
    "add.property.details.desc": "ระบุรายละเอียดของอสังหาริมทรัพย์",
    "add.property.images": "รูปภาพอสังหาริมทรัพย์",
    "add.property.images.desc": "อัปโหลดรูปภาพของอสังหาริมทรัพย์",
    "add.property.contact": "ข้อมูลติดต่อ",
    "add.property.contact.desc": "วิธีที่ผู้สนใจสามารถติดต่อคุณได้",
    "add.property.publish": "เผยแพร่อสังหาริมทรัพย์",
    "add.property.save.draft": "บันทึกร่าง",
    "add.property.success": "เพิ่มอสังหาริมทรัพย์เรียบร้อยแล้ว!",
    "add.property.error": "ไม่สามารถเพิ่มอสังหาริมทรัพย์ได้ กรุณาลองใหม่อีกครั้ง",

    // Form Fields
    "form.title": "ชื่ออสังหาริมทรัพย์",
    "form.title.placeholder": "เช่น คอนโดหรู 2 ห้องนอนในสุขุมวิท",
    "form.description": "รายละเอียด",
    "form.description.placeholder": "อธิบายอสังหาริมทรัพย์ของคุณ...",
    "form.listing.type": "ประเภทการลงประกาศ",
    "form.for.rent": "ให้เช่า",
    "form.for.sale": "ขาย",
    "form.price": "ราคา (บาท)",
    "form.price.rent.placeholder": "ค่าเช่ารายเดือน (เช่น 45000)",
    "form.price.sale.placeholder": "ราคาขาย (เช่น 8500000)",
    "form.location": "ทำเล",
    "form.location.placeholder": "เลือกเขต",
    "form.property.type": "ประเภทอสังหาริมทรัพย์",
    "form.bedrooms": "ห้องนอน",
    "form.bathrooms": "ห้องน้ำ",
    "form.area": "พื้นที่ (ตร.ม.)",
    "form.floor": "ชั้น",
    "form.floor.placeholder": "เช่น ชั้น 15",
    "form.amenities": "สิ่งอำนวยความสะดวก",
    "form.amenities.placeholder": "สระว่ายน้ำ, ฟิตเนส, ที่จอดรถ, รักษาความปลอดภัย...",
    "form.contact.details": "ข้อมูลติดต่อ",
    "form.contact.placeholder": "หมายเลขโทรศัพท์หรืออีเมล",
    "form.upload.images": "คลิกเพื่ออัปโหลดรูปภาพ",
    "form.upload.desc": "PNG, JPG ขนาดไม่เกิน 10MB ต่อไฟล์",
    "form.choose.files": "เลือกไฟล์",

    // Search Page
    "search.title.rent": "ค้นหาที่เช่าในฝัน",
    "search.title.buy": "ค้นหาบ้านในฝัน",
    "search.subtitle.rent": "ค้นพบคอนโดพรีเมียมให้เช่าในทำเลดีที่สุดของกรุงเทพฯ",
    "search.subtitle.buy": "สำรวจคอนโดพรีเมียมขายในพื้นที่ดีที่สุดของกรุงเทพฯ",
    "search.results": "ผลการค้นหา",
    "search.found": "อสังหาริมทรัพย์ที่พบ",
    "search.no.results": "ไม่พบอสังหาริมทรัพย์",
    "search.no.results.desc": "ลองปรับเกณฑ์การค้นหาเพื่อหาอสังหาริมทรัพย์เพิ่มเติม",
    "search.clear.filters": "ล้างตัวกรองทั้งหมด",
    "search.apply.filters": "ใช้ตัวกรอง",
    "search.sort.by": "เรียงตาม",
    "search.sort.price.low": "ราคา: ต่ำไปสูง",
    "search.sort.price.high": "ราคา: สูงไปต่ำ",
    "search.sort.newest": "ใหม่ล่าสุด",
    "search.sort.area.large": "พื้นที่: ใหญ่ที่สุดก่อน",

    // Filters
    "filter.location": "ทำเล",
    "filter.price.range": "ช่วงราคา",
    "filter.room.type": "ประเภทห้อง",
    "filter.property.type": "ประเภทอสังหาริมทรัพย์",
    "filter.amenities": "สิ่งอำนวยความสะดวก",
    "filter.min.price": "ราคาต่ำสุด",
    "filter.max.price": "ราคาสูงสุด",
    "filter.any.location": "ทุกทำเล",
    "filter.any.rooms": "ห้องใดก็ได้",
    "filter.any.type": "ประเภทใดก็ได้",

    // Amenities
    "amenity.pool": "สระว่ายน้ำ",
    "amenity.gym": "ฟิตเนส",
    "amenity.parking": "ที่จอดรถ",
    "amenity.security": "รักษาความปลอดภัย 24 ชม.",
    "amenity.elevator": "ลิฟต์",
    "amenity.balcony": "ระเบียง",
    "amenity.furnished": "เฟอร์นิเจอร์ครบ",
    "amenity.pets": "เลี้ยงสัตว์ได้",

    // Hero Section
    "hero.title": "คอนโดพรีเมียมในกรุงเทพฯ",
    "hero.subtitle":
      "ค้นพบบ้านในฝันของคุณจากคอนโดมิเนียมชั้นนำในกรุงเทพฯ ตั้งแต่เพนท์เฮาส์หรูหราไปจนถึงสตูดิโอแสนอบอุ่น พบพื้นที่ในอุดมคติของคุณในใจกลางประเทศไทย",
    "hero.search.placeholder": "ค้นหาตามชื่อโครงการ สถานที่ หรือผู้พัฒนา...",
    "hero.location": "ทำเล",
    "hero.price": "ช่วงราคา",
    "hero.rooms": "ประเภทห้อง",
    "hero.search.button": "ค้นหาอสังหาริมทรัพย์",

    // Quick Filters
    "filter.new": "โครงการใหม่",
    "filter.ready": "พร้อมอยู่",
    "filter.construction": "กำลังก่อสร้าง",
    "filter.luxury": "อสังหาริมทรัพย์หรู",

    // Properties Section
    "properties.title": "อสังหาริมทรัพย์แนะนำ",
    "properties.subtitle": "คอนโดพรีเมียมคัดสรรในทำเลดีที่สุดของกรุงเทพฯ",
    "properties.available": "อสังหาริมทรัพย์ที่มีจำหน่าย",
    "properties.filters": "ตัวกรองเพิ่มเติม",
    "properties.loadmore": "โหลดเพิ่มเติม",

    // Property Card
    "property.bedrooms": "ห้องนอน",
    "property.bathrooms": "ห้องน้ำ",
    "property.sqm": "ตร.ม.",
    "property.available": "ว่าง",
    "property.reserved": "จอง",
    "property.view.detail": "ดูรายละเอียด",
    "property.inquiry": "สอบถาม",
    "property.per.month": "/เดือน",

    // Stats
    "stats.properties": "อสังหาริมทรัพย์ที่ลงประกาศ",
    "stats.districts": "เขตในกรุงเทพฯ",
    "stats.customers": "ลูกค้าที่พึงพอใจ",
    "stats.support": "บริการลูกค้า",

    // Footer
    "footer.description": "พันธมิตรที่เชื่อถือได้ในการค้นหาคอนโดมิเนียมพรีเมียมในกรุงเทพฯ",
    "footer.quicklinks": "ลิงก์ด่วน",
    "footer.propertytypes": "ประเภทอสังหาริมทรัพย์",
    "footer.contact": "ข้อมูลติดต่อ",
    "footer.copyright": "© 2024 FocusProperty สงวนลิขสิทธิ์",

    // Options
    "option.all.areas": "ทุกพื้นที่",
    "option.any.price": "ราคาใดก็ได้",
    "option.any.type": "ประเภทใดก็ได้",
    "option.under.3m": "ต่ำกว่า 3 ล้านบาท",
    "option.3m.5m": "3-5 ล้านบาท",
    "option.5m.8m": "5-8 ล้านบาท",
    "option.8m.12m": "8-12 ล้านบาท",
    "option.12m.20m": "12-20 ล้านบาท",
    "option.above.20m": "มากกว่า 20 ล้านบาท",
    "option.under.20k": "ต่ำกว่า 20,000 บาท",
    "option.20k.40k": "20,000-40,000 บาท",
    "option.40k.60k": "40,000-60,000 บาท",
    "option.60k.100k": "60,000-100,000 บาท",
    "option.above.100k": "มากกว่า 100,000 บาท",
    "option.studio": "สตูดิโอ",
    "option.1bed": "1 ห้องนอน",
    "option.2bed": "2 ห้องนอน",
    "option.3bed": "3 ห้องนอน",
    "option.4bed": "4+ ห้องนอน",
    "option.penthouse": "เพนท์เฮาส์",

    // Blog
    "blog.title": "บล็อกอสังหาริมทรัพย์",
    "blog.subtitle": "ข้อมูลเชิงลึก เคล็ดลับ และข่าวสารล่าสุดเกี่ยวกับอสังหาริมทรัพย์ในกรุงเทพฯ",
    "blog.home": "บ้านและการใช้ชีวิต",
    "blog.condo": "ข้อมูลเชิงลึกคอนโด",
    "blog.townhome": "คู่มือทาวน์โฮม",
    "blog.home.desc": "เคล็ดลับการตแต่งบ้าน การใช้ชีวิต และไลฟ์สไตล์",
    "blog.condo.desc": "ทุกสิ่งเกี่ยวกับการใช้ชีวิตในคอนโดที่กรุงเทพฯ",
    "blog.townhome.desc": "คู่มือสมบูรณ์สำหรับการลงทุนและการใช้ชีวิตในทาวน์โฮม",
    "blog.read.more": "อ่านเพิ่มเติม",
    "blog.minutes.read": "นาทีในการอ่าน",
    "blog.published": "เผยแพร่",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("EN")

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && (savedLanguage === "EN" || savedLanguage === "TH")) {
      setLanguage(savedLanguage)
    }
  }, [])

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem("language", lang)
  }

  const t = (key: string): string => {
    return translations[language][key as keyof (typeof translations)[typeof language]] || key
  }


  // return (
  //     <LanguageContext.Provider
  //         value={{
  //         setLanguage,
  //         translations
  //         }}
  //     >
  //         {children}
  //     </LanguageContext.Provider>
  // );
  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
