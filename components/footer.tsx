import Link from "next/link"
import Image from "next/image"
import { Mail, Phone, MapPin, Instagram } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand info */}
          <div className="space-y-4">
            <Link href="/" className="block">
              <Image
                src="/images/nalalogo.png"
                alt="NAALA"
                width={120}
                height={50}
                className="h-12 w-auto object-contain"
              />
            </Link>
            <p className="text-sm text-muted-foreground">
              Elegant fashion and lifestyle collections for the modern woman.
            </p>
            {/* Social Media */}
            <div className="flex gap-3 pt-2">
              <a
                href="https://www.instagram.com/naalasbrand/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-pink-500 transition"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div className="space-y-4">
            <h3 className="font-medium text-foreground text-sm uppercase tracking-wide">Shop</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/products" className="hover:text-foreground transition">
                  Tous les Produits
                </Link>
              </li>
              <li>
                <Link href="/#products" className="hover:text-foreground transition">
                  Nouveautés
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer service */}
          <div className="space-y-4">
            <h3 className="font-medium text-foreground text-sm uppercase tracking-wide">Support</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a
                  href="https://www.instagram.com/naalasbrand/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition"
                >
                  Contactez-nous
                </a>
              </li>
              <li>
                <a href="tel:+213770499357" className="hover:text-foreground transition">
                  Appelez-nous
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-medium text-foreground text-sm uppercase tracking-wide">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <a href="tel:+213770499357">07 70 49 93 57</a>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <a href="mailto:Naalasbrand@gmail.com">Naalasbrand@gmail.com</a>
              </li>
              <li className="flex items-start gap-2 text-muted-foreground hover:text-foreground transition">
                <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <a
                  href="https://maps.app.goo.gl/fqYdbdd2hrBqNUxX6"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Algiers, Bordj el kiffan centre
                </a>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground hover:text-pink-500 transition">
                <Instagram className="w-4 h-4 flex-shrink-0" />
                <a
                  href="https://www.instagram.com/naalasbrand/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  @naalasbrand
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© 2025 NAALA. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
}
