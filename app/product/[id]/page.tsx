import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Header from "@/components/header"
import Footer from "@/components/footer"
import ProductDetailClient from "@/components/product-detail-client"
import { getWooCredentials, wooConfig, siteConfig } from "@/lib/config"

/**
 * SSG Configuration avec génération dynamique pour les nouveaux produits
 * 
 * - generateStaticParams() génère toutes les pages produits au build time
 * - dynamicParams = true permet de générer les NOUVEAUX produits à la demande
 * - Quand WooCommerce envoie un webhook "product.created", le revalidatePath 
 *   invalide le cache et permet la génération de la nouvelle page
 */
export const dynamicParams = true // Permet la génération des nouveaux produits

async function getProduct(id: string) {
  try {
    const { storeUrl, authHeader } = getWooCredentials()
    const apiUrl = `${storeUrl}/wp-json/wc/v3/products/${id}`

    const response = await fetch(apiUrl, {
      headers: {
        Authorization: authHeader,
      },
      cache: "force-cache", // SSG: Cache au build time
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
      cache: "force-cache", // SSG: Cache au build time
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
      cache: "force-cache", // SSG: Cache au build time
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

/**
 * Génère les paramètres statiques pour TOUS les produits au build time
 * Utilise la pagination pour récupérer jusqu'à 1000 produits
 */
export async function generateStaticParams() {
  try {
    const { storeUrl, authHeader } = getWooCredentials()
    const allProducts: any[] = []
    let page = 1
    const perPage = 100 // Maximum autorisé par WooCommerce
    const maxPages = 10 // Limite à 1000 produits maximum

    console.log("[SSG] Fetching all products for static generation...")

    while (page <= maxPages) {
      const apiUrl = `${storeUrl}/wp-json/wc/v3/products?per_page=${perPage}&page=${page}&status=publish`

      const response = await fetch(apiUrl, {
        headers: {
          Authorization: authHeader,
        },
        cache: "force-cache",
      })

      if (!response.ok) {
        console.error(`[SSG] Failed to fetch page ${page}:`, response.status)
        break
      }

      const products = await response.json()

      if (!products || products.length === 0) {
        console.log(`[SSG] No more products at page ${page}`)
        break
      }

      allProducts.push(...products)
      console.log(`[SSG] Fetched page ${page}: ${products.length} products (total: ${allProducts.length})`)

      // Si moins de produits que perPage, c'est la dernière page
      if (products.length < perPage) {
        break
      }

      page++
    }

    console.log(`[SSG] Total products to generate: ${allProducts.length}`)

    return allProducts.map((product: any) => ({
      id: String(product.id),
    }))
  } catch (error) {
    console.error("[SSG] Error in generateStaticParams:", error)
    return []
  }
}

/**
 * Génère les métadonnées SEO dynamiques pour chaque produit
 */
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const product = await getProduct(id)

  if (!product) {
    return {
      title: "Produit non trouvé",
    }
  }

  const productImage = product.images?.[0]?.src || "/placeholder.jpg"

  return {
    title: `${product.name} | ${siteConfig.name}`,
    description: product.short_description?.replace(/<[^>]*>/g, "") || product.description?.replace(/<[^>]*>/g, "").slice(0, 160),
    openGraph: {
      title: product.name,
      description: product.short_description?.replace(/<[^>]*>/g, "") || "",
      images: [productImage],
      type: "website",
    },
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
