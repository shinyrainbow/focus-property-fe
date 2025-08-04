"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Building2, User, LogOut, Plus } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LanguageSwitcher } from "@/components/language-switcher";
import { useLanguage } from "@/hooks/use-language";
import { usePathname } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react";

export function Navbar() {
  const { data: session, status } = useSession();

  const user = session?.user;
  const { t } = useLanguage();
  const pathname = usePathname();

  return (
    <nav className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 xl:px-16">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Building2 className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold text-primary">
                FocusProperty
              </span>
            </Link>
          </div>

          <div className="flex items-center space-x-6">
            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-6">
              <Link
                href="/rent"
                className={`text-gray-700 hover:text-primary transition-colors font-medium ${
                  pathname === "/rent"
                    ? "text-primary border-b-2 border-primary pb-1"
                    : ""
                }`}
              >
                {t("nav.rent")}
              </Link>
              {/* <Link
                href="/buy"
                className={`text-gray-700 hover:text-primary transition-colors font-medium ${
                  pathname === "/buy"
                    ? "text-primary border-b-2 border-primary pb-1"
                    : ""
                }`}
              >
                {t("nav.buy")}
              </Link> */}
              <Link
                href="/blog"
                className={`text-gray-700 hover:text-primary transition-colors font-medium ${
                  pathname.startsWith("/blog")
                    ? "text-primary border-b-2 border-primary pb-1"
                    : ""
                }`}
              >
                {t("nav.blog")}
              </Link>
              <Link
                href="/contact"
                className={`text-gray-700 hover:text-primary transition-colors font-medium ${
                  pathname === "/contact"
                    ? "text-primary border-b-2 border-primary pb-1"
                    : ""
                }`}
              >
                {t("nav.contact")}
              </Link>
            </div>

            <LanguageSwitcher />

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <User className="h-4 w-4 mr-2" />
                    {/* {user.username} */} user name here 
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="flex items-center">
                      <Plus className="h-4 w-4 mr-2" />
                      {t("nav.dashboard")}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => signOut()}>
                    <LogOut className="h-4 w-4 mr-2" />
                    {t("nav.signout")}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" asChild>
                  <Link href="/auth/signin">{t("nav.signin")}</Link>
                </Button>
                <Button size="sm" asChild>
                  <Link href="/auth/signup">{t("nav.signup")}</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
