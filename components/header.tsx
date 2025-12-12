"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Menu, Search, ShoppingCart, X } from "lucide-react"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [cartCount, setCartCount] = useState(0)

  useEffect(() => {
    const checkCart = () => {
      const cartItem = localStorage.getItem("cartItem")
      setCartCount(cartItem ? 1 : 0)
    }

    checkCart()

    window.addEventListener("storage", checkCart)
    window.addEventListener("cartUpdated", checkCart)

    return () => {
      window.removeEventListener("storage", checkCart)
      window.removeEventListener("cartUpdated", checkCart)
    }
  }, [])

  return (
    <header className="border-b border-border bg-background sticky top-0 z-40">
      <div className="bg-secondary text-secondary-foreground text-center py-2 text-sm">LIVRAISONS8 WILAYAS 📦</div>

      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <button
          className="text-foreground hover:text-accent transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Logo (centered) */}
        <Link href="/" className="absolute left-1/2 -translate-x-1/2">
          <div className="flex flex-col items-center gap-1">
            <div className="w-10 h-10 border-2 border-primary flex items-center justify-center">
              <div className="w-5 h-5 border border-primary transform rotate-45"></div>
            </div>
            <span className="text-base font-light tracking-widest text-primary">{""}</span>
          </div>
        </Link>

        <div className="flex items-center gap-4">
          <button
            className="text-foreground hover:text-accent transition-colors"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </button>
          <Link href="/cart" className="relative">
            <ShoppingCart className="w-5 h-5 text-foreground hover:text-accent transition-colors" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {isSearchOpen && (
        <div className="border-t border-border px-4 py-4 animate-in slide-in-from-top-2 duration-200">
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Rechercher des produits..."
              autoFocus
              className="w-full pl-10 pr-4 py-3 border border-border rounded-sm bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>
      )}

      {isMenuOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/40 z-40 animate-in fade-in duration-200"
            onClick={() => setIsMenuOpen(false)}
          />

          {/* Sidebar */}
          <nav className="fixed top-0 left-0 h-full w-64 bg-background border-r border-border z-50 animate-in slide-in-from-left duration-300">
            <div className="p-6">
              {/* Close button */}
              <button
                onClick={() => setIsMenuOpen(false)}
                className="mb-8 text-foreground hover:text-accent transition-colors"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Menu items */}
              <div className="space-y-6">
                <Link
                  href="/"
                  className="block text-base font-light hover:text-accent transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Accueil
                </Link>
                <Link
                  href="/products"
                  className="block text-base font-light hover:text-accent transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Nouvelle Collection
                </Link>
                <Link
                  href="/products"
                  className="block text-base font-light hover:text-accent transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Tous les Produits
                </Link>
                <Link
                  href="/about"
                  className="block text-base font-light hover:text-accent transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  À Propos
                </Link>
                <Link
                  href="/contact"
                  className="block text-base font-light hover:text-accent transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </Link>
              </div>
            </div>
          </nav>
        </>
      )}
    </header>
  )
}
