import Link from "next/link"
import { Globe } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Globe className="w-6 h-6 text-(--color-accent)" />
              <span className="text-xl font-bold text-(--color-primary)">Local Bridge</span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              Meet locals. Explore Kazakhstan. Feel safe. Connecting verified locals and expats for meaningful experiences.
            </p>
            <div className="flex space-x-4 text-gray-400 font-medium text-sm">
              <a href="#" className="hover:text-(--color-primary) transition-colors">Instagram</a>
              <a href="#" className="hover:text-(--color-primary) transition-colors">Twitter</a>
              <a href="#" className="hover:text-(--color-primary) transition-colors">LinkedIn</a>
            </div>
          </div>

          {/* Links Group 1 */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Explore</h3>
            <ul className="space-y-3">
              <li><Link href="/events" className="text-sm text-gray-500 hover:text-(--color-primary) transition-colors">Upcoming Events</Link></li>
              <li><Link href="/weekend-trips" className="text-sm text-gray-500 hover:text-(--color-primary) transition-colors">Weekend Trips</Link></li>
              <li><Link href="/language-exchange" className="text-sm text-gray-500 hover:text-(--color-primary) transition-colors">Language Exchange</Link></li>
              <li><Link href="/city-tours" className="text-sm text-gray-500 hover:text-(--color-primary) transition-colors">City Tours</Link></li>
            </ul>
          </div>

          {/* Links Group 2 */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Community</h3>
            <ul className="space-y-3">
              <li><Link href="/how-it-works" className="text-sm text-gray-500 hover:text-(--color-primary) transition-colors">How it works</Link></li>
              <li><Link href="/trust-and-safety" className="text-sm text-gray-500 hover:text-(--color-primary) transition-colors">Trust & Safety</Link></li>
              <li><Link href="/host" className="text-sm text-gray-500 hover:text-(--color-primary) transition-colors">Become a Host</Link></li>
              <li><Link href="/guidelines" className="text-sm text-gray-500 hover:text-(--color-primary) transition-colors">Community Guidelines</Link></li>
            </ul>
          </div>

          {/* Links Group 3 */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Support</h3>
            <ul className="space-y-3">
              <li><Link href="/help" className="text-sm text-gray-500 hover:text-(--color-primary) transition-colors">Help Center</Link></li>
              <li><Link href="/contact" className="text-sm text-gray-500 hover:text-(--color-primary) transition-colors">Contact Us</Link></li>
              <li><Link href="/privacy" className="text-sm text-gray-500 hover:text-(--color-primary) transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-sm text-gray-500 hover:text-(--color-primary) transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Local Bridge Kazakhstan. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Globe className="w-4 h-4" />
            <span>English (EN)</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

