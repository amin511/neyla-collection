"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react"

// Format price with comma as thousands separator and 2 decimal places
function formatPrice(price: number): string {
  const formatted = price.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
  return `DA ${formatted} DZD`
}

interface CartItem {
  id: number
  name: string
  price: string
  size: string
  color?: string
  image: string
  quantity: number
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const loadCart = () => {
      const stored = localStorage.getItem("cartItems")
      if (stored) {
        setCartItems(JSON.parse(stored))
      }
      setIsLoading(false)
    }
    loadCart()

    // Listen for cart updates
    const handleCartUpdate = () => {
      loadCart()
    }
    window.addEventListener("cartUpdated", handleCartUpdate)
    return () => window.removeEventListener("cartUpdated", handleCartUpdate)
  }, [])

  const updateQuantity = (index: number, newQuantity: number) => {
    if (newQuantity < 1) return

    const updatedItems = [...cartItems]
    updatedItems[index].quantity = newQuantity
    setCartItems(updatedItems)
    localStorage.setItem("cartItems", JSON.stringify(updatedItems))
    window.dispatchEvent(new Event("cartUpdated"))
  }

  const removeItem = (index: number) => {
    const updatedItems = cartItems.filter((_, i) => i !== index)
    setCartItems(updatedItems)
    localStorage.setItem("cartItems", JSON.stringify(updatedItems))
    if (updatedItems.length === 0) {
      localStorage.removeItem("cartItem")
    }
    window.dispatchEvent(new Event("cartUpdated"))
  }

  const subtotal = cartItems.reduce(
    (sum, item) => sum + Number.parseFloat(item.price) * item.quantity,
    0
  )
  const shipping = 0 // Free shipping
  const total = subtotal + shipping

  if (isLoading) {
    return (
      <main className="min-h-screen bg-background">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-muted rounded w-32"></div>
            <div className="h-40 bg-muted rounded"></div>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
        {/* Page Title */}
        <div className="flex items-center gap-3 mb-8 md:mb-12">
          <ShoppingBag className="w-6 h-6 text-accent" />
          <h1 className="text-2xl md:text-3xl font-light tracking-wide">
            Mon Panier {cartItems.length > 0 && `(${cartItems.length})`}
          </h1>
        </div>

        {cartItems.length === 0 ? (
          /* Empty Cart State */
          <div className="text-center py-16 md:py-24">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-secondary flex items-center justify-center">
              <ShoppingBag className="w-10 h-10 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-light mb-3">Votre panier est vide</h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Découvrez notre collection et trouvez les pièces parfaites pour votre garde-robe.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 text-sm font-medium hover:bg-primary/90 transition-all duration-300"
            >
              Continuer mes achats
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          /* Cart with Items */
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item, index) => (
                <div key={`${item.id}-${item.size}-${item.color}-${index}`} className="border border-border rounded-sm overflow-hidden bg-card">
                  {/* Item */}
                  <div className="p-4 md:p-6">
                    <div className="flex gap-4 md:gap-6">
                      {/* Product Image */}
                      <div className="relative w-24 h-32 md:w-32 md:h-40 flex-shrink-0 bg-secondary rounded-sm overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start gap-2">
                          <div>
                            <h3 className="font-medium text-foreground mb-1 line-clamp-2">
                              {item.name}
                            </h3>
                            {item.color && (
                              <p className="text-sm text-muted-foreground mb-1">
                                Couleur: <span className="text-foreground">{item.color}</span>
                              </p>
                            )}
                            {item.size && (
                              <p className="text-sm text-muted-foreground mb-2">
                                Taille: <span className="text-foreground">{item.size}</span>
                              </p>
                            )}
                          </div>
                          <button
                            onClick={() => removeItem(index)}
                            className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                            aria-label="Supprimer l'article"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Price */}
                        <p className="text-lg font-medium text-accent mb-4">
                          {formatPrice(Number.parseFloat(item.price))}
                        </p>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-1">
                          <span className="text-sm text-muted-foreground mr-3">Quantité:</span>
                          <button
                            onClick={() => updateQuantity(index, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            className="w-8 h-8 flex items-center justify-center border border-border rounded-sm hover:bg-secondary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            aria-label="Diminuer la quantité"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-12 text-center font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(index, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center border border-border rounded-sm hover:bg-secondary transition-colors"
                            aria-label="Augmenter la quantité"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Continue Shopping Link */}
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mt-6 transition-colors"
              >
                <ArrowRight className="w-4 h-4 rotate-180" />
                Continuer mes achats
              </Link>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="border border-border rounded-sm bg-card p-6 sticky top-24">
                <h2 className="text-lg font-medium mb-6">Récapitulatif</h2>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Sous-total</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Livraison</span>
                    <span className="text-green-600">Gratuite</span>
                  </div>
                </div>

                <div className="border-t border-border my-4 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Total</span>
                    <span className="text-xl font-semibold text-accent">
                      {formatPrice(total)}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => router.push("/checkout")}
                  className="w-full bg-primary text-primary-foreground py-4 text-sm font-medium hover:bg-primary/90 transition-all duration-300 flex items-center justify-center gap-2 mt-4"
                >
                  Passer la commande
                  <ArrowRight className="w-4 h-4" />
                </button>

                {/* Trust Badges */}
                <div className="mt-6 pt-6 border-t border-border">
                  <div className="space-y-3 text-xs text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                        <span className="text-green-600 text-[10px]">✓</span>
                      </div>
                      <span>Livraison disponible</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                        <span className="text-green-600 text-[10px]">✓</span>
                      </div>
                      <span>Paiement à la livraison</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                        <span className="text-green-600 text-[10px]">✓</span>
                      </div>
                      <span>Service client disponible</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </main>
  )
}
