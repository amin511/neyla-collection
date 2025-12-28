"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Ruler, ChevronLeft, ChevronRight, X } from "lucide-react"
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
  const [showLightbox, setShowLightbox] = useState(false)
  const router = useRouter()

  // Maximum thumbnails to show before "+X more"
  const MAX_VISIBLE_THUMBNAILS = 5

  // Get size attribute
  const sizeAttribute = product.attributes?.find(
    (attr) => attr.name.toLowerCase() === "size" || attr.name.toLowerCase() === "taille",
  )
  const sizes = sizeAttribute?.options || []

  // Get all images
  const productImages = product.images?.length > 0 ? product.images : [{ id: 0, src: "/placeholder.svg?height=600&width=600", alt: product.name }]
  const mainImage = productImages[selectedImageIndex]?.src || "/placeholder.svg?height=600&width=600"

  // Calculate visible thumbnails and remaining count
  const visibleThumbnails = productImages.slice(0, MAX_VISIBLE_THUMBNAILS)
  const remainingCount = productImages.length - MAX_VISIBLE_THUMBNAILS

  // Navigation functions for lightbox
  const goToPrevious = () => {
    setSelectedImageIndex((prev) => (prev === 0 ? productImages.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setSelectedImageIndex((prev) => (prev === productImages.length - 1 ? 0 : prev + 1))
  }

  // Handle keyboard navigation in lightbox
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") goToPrevious()
    if (e.key === "ArrowRight") goToNext()
    if (e.key === "Escape") setShowLightbox(false)
  }

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
              <h3
                className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4 opacity-0 animate-fade-in-rise"
                style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}
              >
                Catégories
              </h3>
              <nav className="space-y-1">
                {categories.map((category, index) => (
                  <Link
                    key={category.id}
                    href={`/products?category=${category.slug}`}
                    className="flex items-center justify-between py-2 px-3 text-sm rounded-sm hover:bg-muted transition-colors group opacity-0 animate-fade-in-rise"
                    style={{ animationDelay: `${150 + index * 50}ms`, animationFillMode: 'forwards' }}
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
            <div
              className="space-y-4 opacity-0 animate-fade-in-rise"
              style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}
            >
              {/* Main Image */}
              <div
                className="relative bg-secondary rounded-sm overflow-hidden cursor-zoom-in"
                onClick={() => setShowLightbox(true)}
              >
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
                {/* Image counter badge */}
                {productImages.length > 1 && (
                  <div className="absolute bottom-4 right-4 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
                    {selectedImageIndex + 1} / {productImages.length}
                  </div>
                )}
              </div>

              {/* Thumbnail Gallery - Grid Layout */}
              {productImages.length > 1 && (
                <div className="grid grid-cols-5 gap-2">
                  {visibleThumbnails.map((image, index) => (
                    <button
                      key={image.id}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`relative aspect-[3/4] rounded-sm overflow-hidden transition-all ${selectedImageIndex === index
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
                  {/* Show "+X more" button if there are more images */}
                  {remainingCount > 0 && (
                    <button
                      onClick={() => setShowLightbox(true)}
                      className="relative aspect-[3/4] rounded-sm overflow-hidden bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors"
                    >
                      <span className="text-sm font-medium text-muted-foreground">
                        +{remainingCount}
                      </span>
                    </button>
                  )}
                </div>
              )}
            </div>            {/* Product Details */}
            <div className="flex flex-col gap-6 font-sans">
              {/* Product Name */}
              <h1
                className="text-3xl md:text-4xl font-light text-balance opacity-0 animate-fade-in-rise"
                style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}
              >
                {product.name}
              </h1>

              {/* Price */}
              <div
                className="flex items-baseline gap-3 opacity-0 animate-fade-in-rise"
                style={{ animationDelay: '300ms', animationFillMode: 'forwards' }}
              >
                <span className="text-2xl font-medium">{formatPrice(Number.parseFloat(product.price))}</span>
                {product.regular_price && Number.parseFloat(product.regular_price) > Number.parseFloat(product.price) && (
                  <span className="text-lg text-muted-foreground line-through">
                    {formatPrice(Number.parseFloat(product.regular_price))}
                  </span>
                )}
              </div>

              {/* Size Selection */}
              {sizes.length > 0 && (
                <div
                  className="space-y-3 opacity-0 animate-fade-in-rise"
                  style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}
                >
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
              <div
                className="opacity-0 animate-fade-in-rise"
                style={{ animationDelay: '500ms', animationFillMode: 'forwards' }}
              >
                <Button
                  size="lg"
                  className="w-full mt-4 rounded-full py-6 text-base"
                  disabled={sizes.length > 0 && !selectedSize}
                  onClick={handleAddToCart}
                >
                  Ajouter au panier
                </Button>
              </div>

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
          <h2
            className="text-2xl font-light mb-8 text-center opacity-0 animate-fade-in-rise"
            style={{ animationDelay: '600ms', animationFillMode: 'forwards' }}
          >
            Vous aimerez aussi
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {relatedProducts.slice(0, 4).map((relatedProduct, index) => (
              <Link
                key={relatedProduct.id}
                href={`/product/${relatedProduct.id}`}
                className="group opacity-0 animate-fade-in-rise"
                style={{ animationDelay: `${700 + index * 100}ms`, animationFillMode: 'forwards' }}
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

      {/* Lightbox Modal */}
      {showLightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={() => setShowLightbox(false)}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          {/* Close button */}
          <button
            onClick={() => setShowLightbox(false)}
            className="absolute top-4 right-4 z-10 p-2 text-white/80 hover:text-white transition-colors"
            aria-label="Fermer"
          >
            <X className="w-8 h-8" />
          </button>

          {/* Image counter */}
          <div className="absolute top-4 left-4 text-white/80 text-sm">
            {selectedImageIndex + 1} / {productImages.length}
          </div>

          {/* Previous button */}
          <button
            onClick={(e) => { e.stopPropagation(); goToPrevious(); }}
            className="absolute left-4 z-10 p-2 text-white/80 hover:text-white transition-colors bg-black/30 rounded-full"
            aria-label="Image précédente"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          {/* Main lightbox image */}
          <div
            className="relative max-w-[90vw] max-h-[85vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={productImages[selectedImageIndex]?.src || "/placeholder.svg"}
              alt={productImages[selectedImageIndex]?.alt || product.name}
              width={1200}
              height={1600}
              className="max-w-full max-h-[85vh] object-contain"
              priority
            />
          </div>

          {/* Next button */}
          <button
            onClick={(e) => { e.stopPropagation(); goToNext(); }}
            className="absolute right-4 z-10 p-2 text-white/80 hover:text-white transition-colors bg-black/30 rounded-full"
            aria-label="Image suivante"
          >
            <ChevronRight className="w-8 h-8" />
          </button>

          {/* Thumbnail strip at bottom */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 max-w-[90vw] overflow-x-auto px-4 py-2">
            {productImages.map((image, index) => (
              <button
                key={image.id}
                onClick={(e) => { e.stopPropagation(); setSelectedImageIndex(index); }}
                className={`relative flex-shrink-0 w-16 h-20 rounded-sm overflow-hidden transition-all ${selectedImageIndex === index
                    ? "ring-2 ring-white"
                    : "opacity-50 hover:opacity-100"
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
        </div>
      )}
    </div>
  )
}
