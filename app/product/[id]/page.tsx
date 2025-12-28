import { notFound } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import ProductDetailClient from "@/components/product-detail-client"
import { getWooCredentials, wooConfig } from "@/lib/config"

async function getProduct(id: string) {
  try {
    const { storeUrl, authHeader } = getWooCredentials()
    const apiUrl = `${storeUrl}/wp-json/wc/v3/products/${id}`

    const response = await fetch(apiUrl, {
      headers: {
        Authorization: authHeader,
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
    const { storeUrl, authHeader } = getWooCredentials()
    const apiUrl = `${storeUrl}/wp-json/wc/v3/products?per_page=5&exclude=${currentProductId}&status=publish`

    const response = await fetch(apiUrl, {
      headers: {
        Authorization: authHeader,
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
    const { storeUrl, authHeader } = getWooCredentials()
    const apiUrl = `${storeUrl}/wp-json/wc/v3/products/categories?per_page=${wooConfig.categories.perPage}&hide_empty=true`

    const response = await fetch(apiUrl, {
      headers: {
        Authorization: authHeader,
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
