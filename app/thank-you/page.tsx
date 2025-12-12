"use client"

import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { CheckCircle } from "lucide-react"
import Link from "next/link"

function ThankYouContent() {
  const searchParams = useSearchParams()
  const orderNumber = searchParams.get("order")

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="mb-6 flex justify-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-3">Merci pour votre commande!</h1>

        <p className="text-gray-600 mb-6">
          Votre commande a été reçue avec succès et sera traitée dans les plus brefs délais.
        </p>

        {orderNumber && (
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-500 mb-1">Numéro de commande</p>
            <p className="text-xl font-semibold text-gray-900">#{orderNumber}</p>
          </div>
        )}

        <div className="space-y-3 mb-8 text-sm text-gray-600 text-right">
          <p>✓ Vous recevrez bientôt un appel de confirmation</p>
          <p>✓ La livraison sera effectuée à l'adresse indiquée</p>
          <p>✓ Paiement à la livraison</p>
        </div>

        <Link
          href="/"
          className="inline-block w-full bg-[#0B5A8A] hover:bg-[#094A73] text-white py-3 rounded-lg font-medium transition-colors"
        >
          Retour à la boutique
        </Link>

        <p className="text-xs text-gray-500 mt-6">
          Pour toute question concernant votre commande, veuillez nous contacter.
        </p>
      </div>
    </div>
  )
}

export default function ThankYouPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <p>Chargement...</p>
        </div>
      }
    >
      <ThankYouContent />
    </Suspense>
  )
}
