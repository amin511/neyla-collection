import Link from "next/link"
import Image from "next/image"
import { Mail, Phone, MapPin, Instagram } from "lucide-react"
import { siteConfig, navigationConfig } from "@/lib/config"

export default function Footer() {
  const { contact, social, logo, copyright } = siteConfig
  const { footerNav } = navigationConfig

  return (
    <footer className="border-t border-border bg-background mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand info */}
          <div
            className="space-y-4 opacity-0 animate-fade-in-rise"
            style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}
          >
            <Link href="/" className="block">
              <Image
                src={logo.src}
                alt={logo.alt}
                width={logo.width}
                height={logo.height}
                className="h-12 w-auto object-contain"
              />
            </Link>
            <p className="text-sm text-muted-foreground">
              {siteConfig.description}
            </p>
            {/* Social Media */}
            <div className="flex gap-3 pt-2">
              {social.instagram.url && (
                <a
                  href={social.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-pink-500 transition"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>

          {/* Quick links */}
          <div
            className="space-y-4 opacity-0 animate-fade-in-rise"
            style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}
          >
            <h3 className="font-medium text-foreground text-sm uppercase tracking-wide">{footerNav.shop.title}</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {footerNav.shop.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-foreground transition">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer service */}
          <div
            className="space-y-4 opacity-0 animate-fade-in-rise"
            style={{ animationDelay: '300ms', animationFillMode: 'forwards' }}
          >
            <h3 className="font-medium text-foreground text-sm uppercase tracking-wide">{footerNav.support.title}</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {footerNav.support.links.map((link) => (
                <li key={link.href}>
                  {link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-foreground transition"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <a href={link.href} className="hover:text-foreground transition">
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div
            className="space-y-4 opacity-0 animate-fade-in-rise"
            style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}
          >
            <h3 className="font-medium text-foreground text-sm uppercase tracking-wide">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition">
                <Phone className="w-4 h-4 shrink-0" />
                <a href={`tel:${contact.phone}`}>{contact.phoneDisplay}</a>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition">
                <Mail className="w-4 h-4 shrink-0" />
                <a href={`mailto:${contact.email}`}>{contact.email}</a>
              </li>
              <li className="flex items-start gap-2 text-muted-foreground hover:text-foreground transition">
                <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
                <a
                  href={contact.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {contact.address}
                </a>
              </li>
              {social.instagram.url && (
                <li className="flex items-center gap-2 text-muted-foreground hover:text-pink-500 transition">
                  <Instagram className="w-4 h-4 shrink-0" />
                  <a
                    href={social.instagram.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {social.instagram.handle}
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground opacity-0 animate-fade-in-rise"
          style={{ animationDelay: '500ms', animationFillMode: 'forwards' }}
        >
          <p>© {copyright.year} {siteConfig.name}. {copyright.text}</p>
        </div>
      </div>
    </footer>
  )
}
