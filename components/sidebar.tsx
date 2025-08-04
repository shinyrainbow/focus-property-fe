"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Home, Plus, Building2, Heart, Search, User, Settings, Bell, BarChart3 } from "lucide-react"
import { useLanguage } from "@/hooks/use-language"

import { useSession } from "next-auth/react"

export  function Sidebar() {
  const { t } = useLanguage()
  const {data: session, status } = useSession()
  const pathname = usePathname()

  if (!session?.user) return null

  const menuItems = [
    {
      title: t("sidebar.dashboard"),
      href: "/dashboard",
      icon: Home,
    },
    {
      title: t("sidebar.add.property"),
      href: "/add-property",
      icon: Plus,
    },
    {
      title: t("sidebar.my.properties"),
      href: "/dashboard/properties",
      icon: Building2,
    },
    {
      title: t("sidebar.favorites"),
      href: "/dashboard/favorites",
      icon: Heart,
    },
    {
      title: t("sidebar.saved.searches"),
      href: "/dashboard/searches",
      icon: Search,
    },
    {
      title: t("sidebar.analytics"),
      href: "/dashboard/analytics",
      icon: BarChart3,
    },
    {
      title: t("sidebar.notifications"),
      href: "/dashboard/notifications",
      icon: Bell,
    },
    {
      title: t("sidebar.profile"),
      href: "/dashboard/profile",
      icon: User,
    },
    {
      title: t("sidebar.settings"),
      href: "/dashboard/settings",
      icon: Settings,
    },
  ]

  return (
    <div className="w-64 h-screen bg-secondary/30 border-r border-border fixed left-0 top-16 z-40 overflow-y-auto">
      <div className="p-4">
        <Card className="mb-4">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <User className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <p className="font-semibold text-sm">{session?.user.name}</p>
                <p className="text-xs text-muted-foreground">{session?.user.email}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={isActive ? "default" : "ghost"}
                  className={`w-full justify-start ${
                    isActive ? "bg-primary text-primary-foreground" : "hover:bg-secondary"
                  }`}
                >
                  <Icon className="h-4 w-4 mr-3" />
                  {item.title}
                </Button>
              </Link>
            )
          })}
        </nav>
      </div>
    </div>
  )
}
