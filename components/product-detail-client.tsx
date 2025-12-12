"use client"

import { useState } from "react"
import Image from "next/image"
import { Ruler } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

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

export default function ProductDetailClient({ product }: { product: Product }) {
  const [selectedSize, setSelectedSize] = useState<string>("")
  const [showSizeGuide, setShowSizeGuide] = useState(false)
  const router = useRouter()

  // Get size attribute
  const sizeAttribute = product.attributes?.find(
    (attr) => attr.name.toLowerCase() === "size" || attr.name.toLowerCase() === "taille",
  )
  const sizes = sizeAttribute?.options || []

  // Get main image
  const mainImage = product.images?.[0]?.src || "/placeholder.svg?height=600&width=600"

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
      <div className="grid md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="relative aspect-[3/4] bg-muted rounded-sm overflow-hidden">
          <Image src={mainImage || "/placeholder.svg"} alt={product.name} fill className="object-cover" priority />
          {/* Leila Collection watermark */}
          <div className="absolute top-4 left-4 text-white/80 text-sm tracking-wide">
            Leila
            <br />
            Collection
          </div>
        </div>

        {/* Product Details */}
        <div className="flex flex-col gap-6">
          {/* Brand */}
          

          {/* Product Name */}
          <h1 className="text-3xl md:text-4xl font-light text-balance">{product.name}</h1>

          {/* Price */}
          <div className="flex items-baseline gap-3">
            <span className="text-2xl font-medium">DA {Number.parseFloat(product.price).toLocaleString()}.00 DZD</span>
            {product.regular_price && Number.parseFloat(product.regular_price) > Number.parseFloat(product.price) && (
              <span className="text-lg text-muted-foreground line-through">
                DA {Number.parseFloat(product.regular_price).toLocaleString()}.00 DZD
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
                    className={`px-6 py-2 border rounded-full text-sm transition-colors ${
                      selectedSize === size
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
  )
}
