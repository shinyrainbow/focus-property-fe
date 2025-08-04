"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Home, Settings, LogOut, User, Menu, X } from "lucide-react"
import { useLanguage } from "@/hooks/use-language"
// import { useMockAuth as useAuth } from "@/components/mock-auth-provider"
import { useState } from "react"

export function DashboardSidebar() {
  const { t } = useLanguage()
  // const { user, signOut } = useAuth()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  // if (!user) return null

  const menuItems = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: Home,
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: Settings,
    },
  ]

  const handleSignOut = async () => {
    // await signOut()
  }

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="outline"
        size="sm"
        className="fixed top-20 left-4 z-50 md:hidden bg-white shadow-md"
        onClick={toggleSidebar}
      >
        {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </Button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={() => setIsOpen(false)} />
      )}

      {/* Sidebar */}
      <div
        className={`w-64 h-screen bg-secondary/30 border-r border-border fixed left-0 top-16 z-40 overflow-y-auto transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="p-4">
          <Card className="mb-4">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                  <User className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  {/* <p className="font-semibold text-sm">{user.username}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p> */}
                </div>
              </div>
            </CardContent>
          </Card>

          <nav className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href

              return (
                <Link key={item.href} href={item.href} onClick={() => setIsOpen(false)}>
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

            {/* Logout Button */}
            <Button
              variant="ghost"
              className="w-full justify-start hover:bg-red-50 hover:text-red-600"
              onClick={handleSignOut}
            >
              <LogOut className="h-4 w-4 mr-3" />
              Logout
            </Button>
          </nav>
        </div>
      </div>
    </>
  )
}
