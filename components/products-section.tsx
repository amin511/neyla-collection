"use client"

import { useEffect, useState, useMemo, useRef } from "react"
import ProductCard from "./product-card"

interface Product {
  id: number
  name: string
  price: string | number
  images: Array<{ src?: string }>
  stock_status: string
}

// Global cache with timestamp validation
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes
const STORAGE_KEY = "products_cache"

interface ProductsCache {
  data: Product[] | null
  timestamp: number
  promise: Promise<Product[]> | null
}

const globalProductsCache: ProductsCache = {
  data: null,
  timestamp: 0,
  promise: null,
}

// LocalStorage functions
function loadFromCache(): Product[] | null {
  if (typeof window === "undefined") return null

  try {
    const cached = localStorage.getItem(STORAGE_KEY)
    if (!cached) return null

    const { data, timestamp } = JSON.parse(cached)
    const isValid = Date.now() - timestamp < CACHE_DURATION

    if (isValid && data) {
      console.log("[ProductsSection] Loaded from localStorage cache")
      return data
    }

    // Clean expired cache
    localStorage.removeItem(STORAGE_KEY)
  } catch (error) {
    console.error("[ProductsSection] Error loading cache:", error)
  }

  return null
}

function saveToCache(data: Product[]): void {
  if (typeof window === "undefined") return

  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        data,
        timestamp: Date.now(),
      })
    )
  } catch (error) {
    console.error("[ProductsSection] Error saving cache:", error)
  }
}

// Internal fetch function
async function fetchProductsData(): Promise<Product[]> {
  const response = await fetch("/api/products?per_page=20&category=caftans&page=1&orderby=modified&order=desc")
  const data = await response.json()

  if (!response.ok) {
    const errorMsg = data.message || data.error || "Failed to fetch products"
    console.error("[ProductsSection] API Error:", data)
    throw new Error(errorMsg)
  }

  console.log("[ProductsSection] Products fetched from WooCommerce:", data)
  return data
}

export default function ProductsSection() {
  // Smart initial state - load from cache immediately
  const [products, setProducts] = useState<Product[]>(() => {
    const cachedData = loadFromCache()
    if (cachedData) {
      globalProductsCache.data = cachedData
      globalProductsCache.timestamp = Date.now()
      return cachedData
    }
    return globalProductsCache.data || []
  })

  const [loading, setLoading] = useState(() => !globalProductsCache.data)
  const [error, setError] = useState<string | null>(null)
  const isMounted = useRef(true)

  useEffect(() => {
    isMounted.current = true

    const fetchProducts = async () => {
      try {
        // Check if cache is still valid
        const isCacheValid = globalProductsCache.data &&
          Date.now() - globalProductsCache.timestamp < CACHE_DURATION

        if (isCacheValid) {
          console.log("[ProductsSection] Using valid cache")
          setProducts(globalProductsCache.data!)
          setLoading(false)
          setError(null)
          return
        }

        // Check if there's already a pending request
        if (globalProductsCache.promise) {
          console.log("[ProductsSection] Reusing pending request")
          const data = await globalProductsCache.promise

          if (isMounted.current) {
            setProducts(data)
            setError(null)
          }
          return
        }

        // Create new fetch promise
        setLoading(true)
        globalProductsCache.promise = fetchProductsData()

        const data = await globalProductsCache.promise

        // Update cache
        globalProductsCache.data = data
        globalProductsCache.timestamp = Date.now()
        saveToCache(data)

        if (isMounted.current) {
          setProducts(data)
          setError(null)
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "An error occurred"
        console.error("[ProductsSection] Error fetching products:", errorMessage)

        if (isMounted.current) {
          setError(errorMessage)
        }
      } finally {
        globalProductsCache.promise = null

        if (isMounted.current) {
          setLoading(false)
        }
      }
    }

    fetchProducts()

    return () => {
      isMounted.current = false
    }
  }, [])

  // Memoize product list to prevent unnecessary re-renders
  const productList = useMemo(() => products, [products])

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

  if (productList.length === 0) {
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
        {productList.map((product, index) => (
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
