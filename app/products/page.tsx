import { Suspense } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import ProductCard from "@/components/product-card"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { getWooCredentials } from "@/lib/config"

interface Product {
  id: number
  name: string
  price: string | number
  images: Array<{ src?: string }>
  stock_status: string
}

interface Category {
  id: number
  name: string
  slug: string
  parent: number
}

// ISR: Revalidate every 5 minutes (300 seconds)
export const revalidate = 300

async function getProducts(categorySlug?: string | null) {
  try {
    const { storeUrl, authHeader } = getWooCredentials()
    let apiUrl = `${storeUrl}/wp-json/wc/v3/products?per_page=100&page=1&status=publish`

    if (categorySlug) {
      const categoriesUrl = `${storeUrl}/wp-json/wc/v3/products/categories?slug=${categorySlug}`
      const catResponse = await fetch(categoriesUrl, {
        headers: {
          Authorization: authHeader,
        },
        next: { revalidate: 300 }
      })

      if (catResponse.ok) {
        const categories = await catResponse.json()
        if (categories.length > 0) {
          apiUrl += `&category=${categories[0].id}`
        }
      }
    }

    const response = await fetch(apiUrl, {
      headers: {
        Authorization: authHeader,
      },
      next: { revalidate: 300 }
    })

    if (!response.ok) {
      console.error("[Products] API Error:", response.status)
      return []
    }

    const products = await response.json()
    return products
  } catch (error) {
    console.error("[Products] Error fetching products:", error)
    return []
  }
}

async function getCategories() {
  try {
    const { storeUrl, authHeader } = getWooCredentials()
    const response = await fetch(`${storeUrl}/wp-json/wc/v3/products/categories?per_page=100&hide_empty=true`, {
      headers: {
        Authorization: authHeader,
      },
      next: { revalidate: 300 }
    })

    if (!response.ok) {
      return []
    }

    return await response.json()
  } catch (error) {
    console.error("[Products] Error fetching categories:", error)
    return []
  }
}

async function ProductsContent({ categorySlug }: { categorySlug?: string | null }) {
  const [products, categories] = await Promise.all([
    getProducts(categorySlug),
    getCategories()
  ])

  const category = categorySlug
    ? categories.find((cat: Category) => cat.slug === categorySlug)
    : null

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
          {category?.name || "Tous les Produits"}
        </h1>

        {categorySlug && (
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-sm text-accent hover:underline mb-6"
          >
            Voir tous les produits
          </Link>
        )}

        {/* Products Grid */}
        {products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">
              {category?.name
                ? `Aucun produit disponible dans la catégorie "${category.name}"`
                : "Aucun produit disponible"
              }
            </p>
            {categorySlug && (
              <Link
                href="/products"
                className="inline-flex items-center gap-2 text-accent hover:underline"
              >
                Voir tous les produits
              </Link>
            )}
          </div>
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

export default async function ProductsPage({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const params = await searchParams
  return <ProductsContent categorySlug={params.category} />
}
