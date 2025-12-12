import { notFound } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import ProductDetailClient from "@/components/product-detail-client"

async function getProduct(id: string) {
  try {
    const storeUrl = "https://naalas-brand.com"
    const consumerKey = "ck_2257526fafa995a7d5d7fe02c46dbe1a42de245e"
    const consumerSecret = "cs_af4a042c6bfb24c5c162360e1edecb3a3730d3c9"

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

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id)

  if (!product) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <ProductDetailClient product={product} />
      <Footer />
    </main>
  )
}
