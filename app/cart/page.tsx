export default function CartPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-light tracking-wide mb-8">Panier</h1>

        <div className="text-center py-16 text-muted-foreground">
          <p className="text-lg mb-4">Votre panier est vide</p>
          <a href="/" className="text-primary hover:underline">
            Continuer vos achats
          </a>
        </div>
      </div>
    </div>
  )
}
