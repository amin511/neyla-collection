import Header from "@/components/header"
import HeroSection from "@/components/hero-section"
import ProductsSectionServer from "@/components/products-section-server"
import Footer from "@/components/footer"
import { Suspense } from "react"

// ISR: Revalidate every 5 minutes
export const revalidate = 300

function ProductsLoading() {
  return (
    <section id="products" className="max-w-7xl mx-auto border-t border-border text-3xl py-16 px-4 scroll-mt-20">
      <h2 className="font-light mb-8 text-foreground mt-0 text-xl">Meilleurs ventes 2026</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="aspect-[3/4] bg-muted rounded-sm mb-4" />
            <div className="h-4 bg-muted rounded mb-2" />
            <div className="h-4 bg-muted rounded w-2/3" />
          </div>
        ))}
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <Suspense fallback={<ProductsLoading />}>
        <ProductsSectionServer />
      </Suspense>
      <Footer />
    </main>
  )
}
