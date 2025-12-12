"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { Menu, Search, ShoppingCart, X, ChevronDown, ChevronRight } from "lucide-react"

interface Category {
  id: number
  name: string
  slug: string
  parent: number
  count: number
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [cartCount, setCartCount] = useState(0)
  const [categories, setCategories] = useState<Category[]>([])
  const [expandedCategories, setExpandedCategories] = useState<number[]>([])
  const [loadingCategories, setLoadingCategories] = useState(false)

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

  // Fetch categories when menu opens
  useEffect(() => {
    if (isMenuOpen && categories.length === 0 && !loadingCategories) {
      setLoadingCategories(true)
      fetch("/api/categories")
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data)) {
            setCategories(data)
          }
        })
        .catch((err) => console.error("Error fetching categories:", err))
        .finally(() => setLoadingCategories(false))
    }
  }, [isMenuOpen, categories.length, loadingCategories])

  // Get primary categories (parent = 0)
  const primaryCategories = categories.filter((cat) => cat.parent === 0)

  // Get child categories for a parent
  const getChildCategories = (parentId: number) => {
    return categories.filter((cat) => cat.parent === parentId)
  }

  // Toggle category expansion
  const toggleCategory = (categoryId: number) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    )
  }

  return (
    <header className="border-b border-border bg-background sticky top-0 z-40">
      <div className="bg-secondary text-secondary-foreground text-center py-2 text-sm">LIVRAISON 62 WILAYAS 📦</div>

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
          <Image
            src="/images/nalalogo.png"
            alt="NAALA"
            width={120}
            height={50}
            className="h-12 w-auto object-contain"
            priority
          />
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
          <nav className="fixed top-0 left-0 h-full w-72 bg-background border-r border-border z-50 animate-in slide-in-from-left duration-300 overflow-y-auto">
            <div className="p-6">
              {/* Close button */}
              <button
                onClick={() => setIsMenuOpen(false)}
                className="mb-8 text-foreground hover:text-accent transition-colors animate-fade-in-up"
                style={{ animationDelay: '100ms' }}
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Menu items */}
              <div className="space-y-4">
                <Link
                  href="/"
                  className="block text-base font-light hover:text-accent transition-colors animate-fade-in-up opacity-0"
                  style={{ animationDelay: '150ms', animationFillMode: 'forwards' }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Accueil
                </Link>
                <Link
                  href="/#products"
                  className="block text-base font-light hover:text-accent transition-colors animate-fade-in-up opacity-0"
                  style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Nouvelle Collection
                </Link>
                <Link
                  href="/products"
                  className="block text-base font-light hover:text-accent transition-colors animate-fade-in-up opacity-0"
                  style={{ animationDelay: '250ms', animationFillMode: 'forwards' }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Tous les Produits
                </Link>

                {/* Divider */}
                <div className="border-t border-border my-4 animate-fade-in-up opacity-0" style={{ animationDelay: '300ms', animationFillMode: 'forwards' }} />

                {/* Categories Section */}
                <div className="animate-fade-in-up opacity-0" style={{ animationDelay: '350ms', animationFillMode: 'forwards' }}>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                    Catégories
                  </h3>

                  {loadingCategories ? (
                    <div className="space-y-2">
                      {[...Array(4)].map((_, i) => (
                        <div key={i} className="h-6 bg-muted animate-pulse rounded" />
                      ))}
                    </div>
                  ) : primaryCategories.length > 0 ? (
                    <div className="space-y-1">
                      {primaryCategories.map((category) => {
                        const children = getChildCategories(category.id)
                        const hasChildren = children.length > 0
                        const isExpanded = expandedCategories.includes(category.id)

                        return (
                          <div key={category.id}>
                            <div className="flex items-center">
                              {hasChildren ? (
                                <button
                                  onClick={() => toggleCategory(category.id)}
                                  className="flex items-center justify-between w-full py-2 text-sm font-medium text-foreground hover:text-accent transition-colors"
                                >
                                  <span>{category.name}</span>
                                  {isExpanded ? (
                                    <ChevronDown className="w-4 h-4 text-muted-foreground" />
                                  ) : (
                                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                                  )}
                                </button>
                              ) : (
                                <Link
                                  href={`/products?category=${category.slug}`}
                                  className="block w-full py-2 text-sm font-medium text-foreground hover:text-accent transition-colors"
                                  onClick={() => setIsMenuOpen(false)}
                                >
                                  {category.name}
                                </Link>
                              )}
                            </div>

                            {/* Child Categories */}
                            {hasChildren && isExpanded && (
                              <div className="ml-4 border-l border-border pl-3 space-y-1 animate-in slide-in-from-top-2 duration-200">
                                {/* Link to view all in parent category */}
                                <Link
                                  href={`/products?category=${category.slug}`}
                                  className="block py-1.5 text-sm text-muted-foreground hover:text-accent transition-colors"
                                  onClick={() => setIsMenuOpen(false)}
                                >
                                  Voir tout
                                </Link>
                                {children.map((child) => (
                                  <Link
                                    key={child.id}
                                    href={`/products?category=${child.slug}`}
                                    className="block py-1.5 text-sm text-muted-foreground hover:text-accent transition-colors"
                                    onClick={() => setIsMenuOpen(false)}
                                  >
                                    {child.name}
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">Aucune catégorie</p>
                  )}
                </div>

                {/* Divider */}
                <div className="border-t border-border my-4 animate-fade-in-up opacity-0" style={{ animationDelay: '400ms', animationFillMode: 'forwards' }} />

                <a
                  href="https://www.instagram.com/naalasbrand/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-base font-light hover:text-accent transition-colors animate-fade-in-up opacity-0"
                  style={{ animationDelay: '450ms', animationFillMode: 'forwards' }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  À Propos
                </a>
                <a
                  href="https://www.instagram.com/naalasbrand/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-base font-light hover:text-accent transition-colors animate-fade-in-up opacity-0"
                  style={{ animationDelay: '500ms', animationFillMode: 'forwards' }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </a>
              </div>
            </div>
          </nav>
        </>
      )}
    </header>
  )
}
