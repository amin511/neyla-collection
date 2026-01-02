import ProductCard from "./product-card"
import { getWooCredentials } from "@/lib/config"

interface Product {
    id: number
    name: string
    price: string | number
    images: Array<{ src?: string }>
    stock_status: string
}

// Fetch products from WooCommerce
async function getProducts() {
    try {
        const { storeUrl, authHeader } = getWooCredentials()
        const apiUrl = `${storeUrl}/wp-json/wc/v3/products?per_page=20&page=1&orderby=modified&order=desc&status=publish`

        const response = await fetch(apiUrl, {
            headers: {
                Authorization: authHeader,
            },
            next: { revalidate: 300 } // ISR: Revalidate every 5 minutes
        })

        if (!response.ok) {
            console.error("[ProductsSection] API Error:", response.status)
            return []
        }

        const products = await response.json()
        return products
    } catch (error) {
        console.error("[ProductsSection] Error fetching products:", error)
        return []
    }
}

export default async function ProductsSectionServer() {
    const products = await getProducts()

    if (products.length === 0) {
        return (
            <section id="products" className="max-w-7xl mx-auto px-4 py-16 border-t border-border scroll-mt-20">
                <h2 className="text-xl font-light mb-8 text-foreground">Meilleurs ventes 2026</h2>
                <div className="p-8 bg-muted/50 border border-border rounded-sm">
                    <p className="text-muted-foreground">Aucun produit disponible pour le moment.</p>
                </div>
            </section>
        )
    }

    return (
        <section id="products" className="max-w-7xl mx-auto border-t border-border text-3xl py-16 px-4 scroll-mt-20">
            <h2 className="font-light mb-8 text-foreground mt-0 text-xl">Meilleurs ventes 2026</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {products.map((product: Product) => (
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
        </section>
    )
}
