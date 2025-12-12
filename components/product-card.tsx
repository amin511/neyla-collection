import Link from "next/link"

interface ProductCardProps {
  id: number
  name: string
  price: number
  image: string
  isOutOfStock?: boolean
  stockStatus?: string
}

export default function ProductCard({ id, name, price, image, isOutOfStock, stockStatus }: ProductCardProps) {
  return (
    <Link href={`/product/${id}`}>
      <div className="group cursor-pointer">
        {/* Image container */}
        <div className="relative w-full aspect-[3/4] bg-muted overflow-hidden rounded-sm mb-4">
          <img
            src={image || "/placeholder.svg?height=400&width=300&query=fashion%20product"}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />

          {/* Out of stock badge */}
          {isOutOfStock || stockStatus === "outofstock" ? (
            <div className="absolute top-3 left-3 bg-primary text-primary-foreground px-3 py-1 text-xs font-medium">
              Épuisé
            </div>
          ) : null}
        </div>

        {/* Product info */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-foreground line-clamp-2 group-hover:text-accent transition">
            {name}
          </h3>
          <p className="text-base font-light text-primary">DA {price?.toLocaleString("fr-DZ")}</p>
        </div>
      </div>
    </Link>
  )
}
