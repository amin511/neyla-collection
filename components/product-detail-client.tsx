"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Ruler } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

// Format price with comma as thousands separator and 2 decimal places
function formatPrice(price: number): string {
  const formatted = price.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
  return `DA ${formatted} DZD`
}

interface ProductImage {
  id: number
  src: string
  alt: string
}

interface ProductAttribute {
  id: number
  name: string
  options: string[]
}

interface Product {
  id: number
  name: string
  price: string
  regular_price: string
  description: string
  images: ProductImage[]
  attributes: ProductAttribute[]
  stock_status: string
}

interface RelatedProduct {
  id: number
  name: string
  price: string
  images: ProductImage[]
}

interface Category {
  id: number
  name: string
  slug: string
  count: number
}

interface ProductDetailClientProps {
  product: Product
  relatedProducts?: RelatedProduct[]
  categories?: Category[]
}

export default function ProductDetailClient({ product, relatedProducts = [], categories = [] }: ProductDetailClientProps) {
  const [selectedSize, setSelectedSize] = useState<string>("")
  const [showSizeGuide, setShowSizeGuide] = useState(false)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const router = useRouter()

  // Get size attribute
  const sizeAttribute = product.attributes?.find(
    (attr) => attr.name.toLowerCase() === "size" || attr.name.toLowerCase() === "taille",
  )
  const sizes = sizeAttribute?.options || []

  // Get all images
  const productImages = product.images?.length > 0 ? product.images : [{ id: 0, src: "/placeholder.svg?height=600&width=600", alt: product.name }]
  const mainImage = productImages[selectedImageIndex]?.src || "/placeholder.svg?height=600&width=600"

  // Function to handle add to cart and navigate to checkout
  const handleAddToCart = () => {
    if (sizes.length > 0 && !selectedSize) {
      alert("Veuillez sélectionner une taille")
      return
    }

    // Store product in localStorage for checkout
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      size: selectedSize,
      image: mainImage,
      quantity: 1,
    }

    localStorage.setItem("cartItem", JSON.stringify(cartItem))

    // Navigate to checkout
    router.push("/checkout")
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex gap-8">
        {/* Categories Sidebar */}
        {categories.length > 0 && (
          <aside className="hidden lg:block w-56 flex-shrink-0">
            <div className="sticky top-24">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                Catégories
              </h3>
              <nav className="space-y-1">
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    href={`/products?category=${category.slug}`}
                    className="flex items-center justify-between py-2 px-3 text-sm rounded-sm hover:bg-muted transition-colors group"
                  >
                    <span className="group-hover:text-foreground">{category.name}</span>
                    <span className="text-xs text-muted-foreground bg-muted group-hover:bg-background px-2 py-0.5 rounded-full">
                      {category.count}
                    </span>
                  </Link>
                ))}
              </nav>
            </div>
          </aside>
        )}

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Product Images */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative bg-secondary rounded-sm overflow-hidden">
                <Image 
                  src={mainImage || "/placeholder.svg"} 
                  alt={product.name} 
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="w-full h-auto"
                  priority 
                />
                {/* Naala Brand logo */}
                <div className="absolute top-4 left-4">
                  <Image
                    src="/images/nalalogo.png"
                    alt="Naala Brand"
                    width={60}
                    height={60}
                    className="opacity-80"
                  />
                </div>
              </div>

              {/* Thumbnail Gallery */}
              {productImages.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {productImages.map((image, index) => (
                    <button
                      key={image.id}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`relative flex-shrink-0 w-20 h-24 rounded-sm overflow-hidden transition-all ${selectedImageIndex === index
                          ? "ring-2 ring-foreground ring-offset-2"
                          : "opacity-70 hover:opacity-100"
                        }`}
                    >
                      <Image
                        src={image.src}
                        alt={image.alt || `${product.name} - Image ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="flex flex-col gap-6 font-sans">
              {/* Brand */}


              {/* Product Name */}
              <h1 className="text-3xl md:text-4xl font-light text-balance">{product.name}</h1>

              {/* Price */}
              <div className="flex items-baseline gap-3">
                <span className="text-2xl font-medium">{formatPrice(Number.parseFloat(product.price))}</span>
                {product.regular_price && Number.parseFloat(product.regular_price) > Number.parseFloat(product.price) && (
                  <span className="text-lg text-muted-foreground line-through">
                    {formatPrice(Number.parseFloat(product.regular_price))}
                  </span>
                )}
              </div>

              {/* Size Selection */}
              {sizes.length > 0 && (
                <div className="space-y-3">
                  <div className="text-sm font-medium">Taille</div>
                  <div className="flex flex-wrap gap-2">
                    {sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-6 py-2 border rounded-full text-sm transition-colors ${selectedSize === size
                            ? "bg-foreground text-background border-foreground"
                            : "border-border hover:border-foreground"
                          }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Guide */}
              <button
                onClick={() => setShowSizeGuide(!showSizeGuide)}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors self-start"
              >
                <Ruler className="w-4 h-4" />
                Guides des tailles
              </button>

              {/* Add to Cart Button */}
              <Button
                size="lg"
                className="w-full mt-4 rounded-full py-6 text-base"
                disabled={sizes.length > 0 && !selectedSize}
                onClick={handleAddToCart}
              >
                Ajouter au panier
              </Button>

              {/* Product Description */}
              <div className="pt-6 border-t border-border">
                <div
                  className="prose prose-sm max-w-none text-muted-foreground"
                  dangerouslySetInnerHTML={{ __html: product.description }}
                />
              </div>

              {/* Stock Status */}
              {product.stock_status === "instock" && (
                <div className="text-sm text-green-600 dark:text-green-400">En stock</div>
              )}
              {product.stock_status === "outofstock" && (
                <div className="text-sm text-red-600 dark:text-red-400">Épuisé</div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Product Recommendations */}
      {relatedProducts.length > 0 && (
        <div className="mt-16 pt-12 border-t border-border">
          <h2 className="text-2xl font-light mb-8 text-center">Vous aimerez aussi</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {relatedProducts.slice(0, 4).map((relatedProduct) => (
              <Link
                key={relatedProduct.id}
                href={`/product/${relatedProduct.id}`}
                className="group"
              >
                <div className="relative aspect-[3/4] bg-secondary rounded-sm overflow-hidden mb-3">
                  <Image
                    src={relatedProduct.images?.[0]?.src || "/placeholder.svg"}
                    alt={relatedProduct.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <h3 className="text-sm font-medium line-clamp-2 group-hover:underline">
                  {relatedProduct.name}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {formatPrice(Number.parseFloat(relatedProduct.price))}
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
