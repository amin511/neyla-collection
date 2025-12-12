import Link from "next/link"
import { Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand info */}
          <div className="space-y-4">
            <div className="flex flex-col items-start gap-1">
              <div className="w-8 h-8 border-2 border-primary flex items-center justify-center">
                <div className="w-4 h-4 border border-primary transform rotate-45"></div>
              </div>
              <span className="text-sm font-light tracking-widest text-primary">{"NAALA"}</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Elegant fashion and lifestyle collections for the modern woman.
            </p>
          </div>

          {/* Quick links */}
          <div className="space-y-4">
            <h3 className="font-medium text-foreground text-sm uppercase tracking-wide">Shop</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/products" className="hover:text-foreground transition">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/new" className="hover:text-foreground transition">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link href="/sale" className="hover:text-foreground transition">
                  Sale
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer service */}
          <div className="space-y-4">
            <h3 className="font-medium text-foreground text-sm uppercase tracking-wide">Support</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/contact" className="hover:text-foreground transition">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="hover:text-foreground transition">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="/returns" className="hover:text-foreground transition">
                  Returns
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-medium text-foreground text-sm uppercase tracking-wide">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <a href="tel:+213xxx">+213 (0) XXX XXX</a>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <a href="mailto:info@leila.dz">info@leila.dz</a>
              </li>
              <li className="flex items-start gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>Algiers, Bordj el kiffan centre  </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© 2025 NAALA . All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-foreground transition">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-foreground transition">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
