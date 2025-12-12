import { notFound } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import ProductDetailClient from "@/components/product-detail-client"

const storeUrl = "https://naalas-brand.com"
const consumerKey = "ck_2257526fafa995a7d5d7fe02c46dbe1a42de245e"
const consumerSecret = "cs_af4a042c6bfb24c5c162360e1edecb3a3730d3c9"

async function getProduct(id: string) {
  try {
    const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString("base64")
    const apiUrl = `${storeUrl}/wp-json/wc/v3/products/${id}`

    const response = await fetch(apiUrl, {
      headers: {
        Authorization: `Basic ${auth}`,
      },
      cache: "no-store",
    })

    if (!response.ok) {
      return null
    }

    const product = await response.json()
    return product
  } catch (error) {
    console.error("[v0] Error fetching product:", error)
    return null
  }
}

async function getRelatedProducts(currentProductId: string) {
  try {
    const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString("base64")
    const apiUrl = `${storeUrl}/wp-json/wc/v3/products?per_page=5&exclude=${currentProductId}&status=publish`

    const response = await fetch(apiUrl, {
      headers: {
        Authorization: `Basic ${auth}`,
      },
      cache: "no-store",
    })

    if (!response.ok) {
      return []
    }

    const products = await response.json()
    return products
  } catch (error) {
    console.error("[v0] Error fetching related products:", error)
    return []
  }
}

async function getCategories() {
  try {
    const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString("base64")
    const apiUrl = `${storeUrl}/wp-json/wc/v3/products/categories?per_page=100&hide_empty=true`

    const response = await fetch(apiUrl, {
      headers: {
        Authorization: `Basic ${auth}`,
      },
      cache: "no-store",
    })

    if (!response.ok) {
      return []
    }

    const categories = await response.json()
    return categories
  } catch (error) {
    console.error("[v0] Error fetching categories:", error)
    return []
  }
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const [product, relatedProducts, categories] = await Promise.all([
    getProduct(id),
    getRelatedProducts(id),
    getCategories()
  ])

  if (!product) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <ProductDetailClient product={product} relatedProducts={relatedProducts} categories={categories} />
      <Footer />
    </main>
  )
}
