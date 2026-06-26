"use client"

import * as React from "react"
import Link from "next/link"
import { useSession, signOut } from "next-auth/react"
import { Menu, X, Globe, User } from "lucide-react"

import { Button } from "@/components/ui/button"

export function Navbar() {
  const { data: session } = useSession()
  const [isScrolled, setIsScrolled] = React.useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm border-b"
          : "bg-white/50 backdrop-blur-sm border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-2xl font-bold text-(--color-primary) flex items-center gap-2">
              <Globe className="w-8 h-8 text-(--color-accent)" />
              <span className="hidden sm:block">Local Bridge</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/events" className="text-gray-600 hover:text-(--color-primary) font-medium transition-colors">
              Events
            </Link>
            <Link href="/community" className="text-gray-600 hover:text-(--color-primary) font-medium transition-colors">
              Community
            </Link>
            <Link href="/host" className="text-gray-600 hover:text-(--color-primary) font-medium transition-colors">
              Become a Host
            </Link>
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center space-x-2 lg:space-x-4">
            <Button 
              variant="ghost" 
              className="font-medium text-gray-700 flex items-center gap-1.5 px-3"
              onClick={() => alert("Language translation feature is coming soon!")}
            >
              <Globe className="w-4 h-4" />
              <span>EN</span>
            </Button>
            <div className="w-px h-6 bg-gray-200 mx-2"></div>
            
            {session ? (
              <div className="flex items-center gap-4">
                <span className="font-medium text-gray-700">Hello, {session.user?.name || "User"}</span>
                {session.user?.role === "CURATOR" ? (
                  <Link href="/curator" className="text-(--color-primary) font-medium hover:underline">
                    Curator Panel
                  </Link>
                ) : (
                  <Link href="/dashboard" className="text-(--color-primary) font-medium hover:underline">
                    Dashboard
                  </Link>
                )}
                <Button variant="outline" onClick={() => signOut()} className="rounded-full px-6">
                  Log out
                </Button>
              </div>
            ) : (
              <>
                <Button variant="ghost" className="font-medium text-gray-700" asChild>
                  <Link href="/login">Log in</Link>
                </Button>
                <Button className="rounded-full px-6 shadow-sm shadow-(--color-primary)/20" asChild>
                  <Link href="/register" className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Sign up
                  </Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b absolute w-full shadow-lg">
          <div className="px-4 pt-2 pb-6 space-y-2">
            <Link
              href="/events"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-(--color-primary) hover:bg-gray-50"
            >
              Events
            </Link>
            <Link
              href="/community"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-(--color-primary) hover:bg-gray-50"
            >
              Community
            </Link>
            <Link
              href="/host"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-(--color-primary) hover:bg-gray-50"
            >
              Become a Host
            </Link>
            <div className="pt-4 flex flex-col gap-3">
              {session ? (
                <>
                  {session.user?.role === "CURATOR" ? (
                    <Button className="w-full justify-center rounded-full" asChild>
                      <Link href="/curator">Curator Panel</Link>
                    </Button>
                  ) : (
                    <Button className="w-full justify-center rounded-full" asChild>
                      <Link href="/dashboard">Dashboard</Link>
                    </Button>
                  )}
                  <Button variant="outline" className="w-full justify-center" onClick={() => signOut()}>
                    Log out
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="outline" className="w-full justify-center" asChild>
                    <Link href="/login">Log in</Link>
                  </Button>
                  <Button className="w-full justify-center rounded-full" asChild>
                    <Link href="/register">Sign up</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
