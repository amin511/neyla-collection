"use client"

import { useEffect, useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import ProductCard from "@/components/product-card"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

interface Product {
  id: number
  name: string
  price: string | number
  images: Array<{ src?: string }>
  stock_status: string
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        setLoading(true)
        // Fetch more products - up to 100
        const response = await fetch("/api/products?per_page=100&page=1")
        const data = await response.json()

        if (!response.ok) {
          const errorMsg = data.message || data.error || "Failed to fetch products"
          console.error("[v0] API Error:", data)
          throw new Error(errorMsg)
        }

        console.log("[v0] All products fetched:", data.length)
        setProducts(data)
        setError(null)
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "An error occurred"
        console.error("[v0] Error fetching products:", errorMessage)
        setError(errorMessage)
      } finally {
        setLoading(false)
      }
    }

    fetchAllProducts()
  }, [])

  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Retour à l'accueil</span>
        </Link>

        {/* Page Title */}
        <h1 className="text-3xl md:text-4xl font-light mb-8 text-foreground">
          Tous les Produits
        </h1>

        {/* Products Grid */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[3/4] bg-muted rounded-sm mb-4" />
                <div className="h-4 bg-muted rounded mb-2" />
                <div className="h-4 bg-muted rounded w-2/3" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="p-8 bg-destructive/10 border border-destructive rounded-sm">
            <p className="text-destructive font-medium">Impossible de charger les produits: {error}</p>
          </div>
        ) : products.length === 0 ? (
          <p className="text-muted-foreground text-center py-12">Aucun produit disponible</p>
        ) : (
          <>
            <p className="text-muted-foreground mb-6">{products.length} produit{products.length > 1 ? 's' : ''}</p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  price={typeof product.price === "string" ? Number.parseFloat(product.price) : product.price}
                  image={product.images?.[0]?.src}
                  stockStatus={product.stock_status}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <Footer />
    </main>
  )
}

