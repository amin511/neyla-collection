"use client"

import { useEffect, useState } from "react"
import ProductCard from "./product-card"

interface Product {
  id: number
  name: string
  price: string | number
  images: Array<{ src?: string }>
  stock_status: string
}

export default function ProductsSection() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const response = await fetch("/api/products?per_page=20&categoty=caftans&page=1&orderby=modified&order=desc")
        const data = await response.json()

        if (!response.ok) {
          const errorMsg = data.message || data.error || "Failed to fetch products"
          console.error("[v0] API Error:", data)
          throw new Error(errorMsg)
        }

        console.log("[v0] Products fetched from WooCommerce:", data)
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

    fetchProducts()
  }, [])

  if (loading) {
    return (
      <section id="products" className="max-w-7xl mx-auto border-t border-border text-3xl py-16 px-4 scroll-mt-20">
        <h2 className="font-light mb-8 text-foreground mt-0 text-xl">Meilleurs ventes 2026</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="aspect-[3/4] bg-muted rounded-sm mb-4" />
              <div className="h-4 bg-muted rounded mb-2" />
              <div className="h-4 bg-muted rounded w-2/3" />
            </div>
          ))}
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section id="products" className="max-w-7xl mx-auto px-4 py-16 border-t border-border scroll-mt-20">
        <h2 className="text-xl font-light mb-8 text-foreground">Meilleurs ventes 2025</h2>
        <div className="p-8 bg-destructive/10 border border-destructive rounded-sm">
          <p className="text-destructive font-medium">Unable to load products: {error}</p>
          <p className="text-sm text-muted-foreground mt-2">
            Please add your WooCommerce API credentials to your Vercel project environment variables:
          </p>
          <ul className="text-sm text-muted-foreground mt-3 space-y-1 ml-4">
            <li>• WOOCOMMERCE_STORE_URL</li>
            <li>• WOOCOMMERCE_CONSUMER_KEY</li>
            <li>• WOOCOMMERCE_CONSUMER_SECRET</li>
          </ul>
        </div>
      </section>
    )
  }

  if (products.length === 0) {
    return (
      <section id="products" className="max-w-7xl mx-auto px-4 py-16 border-t border-border scroll-mt-20">
        <h2 className="text-xl font-light mb-8 text-foreground">Meilleurs ventes 2025</h2>
        <p className="text-muted-foreground">No products available</p>
      </section>
    )
  }

  return (
    <section id="products" className="max-w-7xl mx-auto border-t border-border text-3xl py-8 px-4 scroll-mt-20">
      <h2
        className="font-light mb-8 text-foreground mt-0 text-xl opacity-0 animate-fade-in-rise "
        style={{ animationDelay: '50ms', animationFillMode: 'forwards' }}
      >
        Meilleurs ventes 2026
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {products.map((product, index) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            price={typeof product.price === "string" ? Number.parseFloat(product.price) : product.price}
            image={product.images?.[0]?.src || ""}
            stockStatus={product.stock_status}
            index={index}
          />
        ))}
      </div>
    </section>
  )
}
