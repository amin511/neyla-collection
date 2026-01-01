"use client"

import type React from "react"

import { useState, useEffect, useMemo } from "react"
import { User, Phone, MapPin, Minus, Plus, ArrowLeft, Truck, Loader2 } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import {
  formatPrice,
  shippingConfig,
  isFreeShipping,
  type DeliveryMethod,
} from "@/lib/config"
import { useWilayaShipping, type WilayaShippingMethod } from "@/lib/hooks/useShipping"

const WILAYAS = [
  "Adrar",
  "Chlef",
  "Laghouat",
  "Oum El Bouaghi",
  "Batna",
  "Béjaïa",
  "Biskra",
  "Béchar",
  "Blida",
  "Bouira",
  "Tamanrasset",
  "Tébessa",
  "Tlemcen",
  "Tiaret",
  "Tizi Ouzou",
  "Alger",
  "Djelfa",
  "Jijel",
  "Sétif",
  "Saïda",
  "Skikda",
  "Sidi Bel Abbès",
  "Annaba",
  "Guelma",
  "Constantine",
  "Médéa",
  "Mostaganem",
  "M'Sila",
  "Mascara",
  "Ouargla",
  "Oran",
  "El Bayadh",
  "Illizi",
  "Bordj Bou Arreridj",
  "Boumerdès",
  "El Tarf",
  "Tindouf",
  "Tissemsilt",
  "El Oued",
  "Khenchela",
  "Souk Ahras",
  "Tipaza",
  "Mila",
  "Aïn Defla",
  "Naâma",
  "Aïn Témouchent",
  "Ghardaïa",
  "Relizane",
]

const COMMUNES: Record<string, string[]> = {
  Adrar: ["Adrar", "Reggane", "Timimoun", "Aoulef", "Bordj Badji Mokhtar"],
  Chlef: ["Chlef", "Ténès", "El Karimia", "Oued Fodda", "Boukadir"],
  Laghouat: ["Laghouat", "Aflou", "Ksar El Hirane", "Hassi R'Mel"],
  "Oum El Bouaghi": ["Oum El Bouaghi", "Aïn Beïda", "Aïn M'lila", "Meskiana"],
  Batna: ["Batna", "Barika", "Arris", "Merouana", "N'Gaous"],
  Béjaïa: ["Béjaïa", "Akbou", "Amizour", "El Kseur", "Sidi Aïch"],
  Biskra: ["Biskra", "Tolga", "Sidi Okba", "Ouled Djellal", "El Kantara"],
  Béchar: ["Béchar", "Abadla", "Beni Ounif", "Kenadsa", "Taghit"],
  Blida: ["Blida", "Boufarik", "Bougara", "Bouinan", "Larbaa"],
  Bouira: ["Bouira", "Lakhdaria", "Sour El Ghozlane", "Aïn Bessem"],
  Tamanrasset: ["Tamanrasset", "In Salah", "In Guezzam", "Tazrouk"],
  Tébessa: ["Tébessa", "Bir El Ater", "Cheria", "El Ouenza", "Hammamet"],
  Tlemcen: ["Tlemcen", "Maghnia", "Ghazaouet", "Remchi", "Sebdou"],
  Tiaret: ["Tiaret", "Sougueur", "Frenda", "Ksar Chellala", "Mahdia"],
  "Tizi Ouzou": ["Tizi Ouzou", "Azazga", "Draa Ben Khedda", "Tigzirt", "Boghni"],
  Alger: [
    "Alger Centre",
    "Bab El Oued",
    "Kouba",
    "Hussein Dey",
    "Dar El Beida",
    "Baraki",
    "Rouiba",
    "Birkhadem",
    "El Harrach",
    "Birtouta",
    "Zeralda",
    "Draria",
    "Cheraga",
    "Bouzareah",
    "El Biar",
    "Hydra",
  ],
  Djelfa: ["Djelfa", "Aïn Oussera", "Messaad", "Hassi Bahbah", "Birine"],
  Jijel: ["Jijel", "El Milia", "Taher", "Chekfa", "El Aouana"],
  Sétif: ["Sétif", "El Eulma", "Aïn Arnat", "Aïn Oulmene", "Bougaa"],
  Saïda: ["Saïda", "Aïn El Hadjar", "Ouled Khaled", "Youb"],
  Skikda: ["Skikda", "Tamalous", "El Harrouch", "Azzaba", "Collo"],
  "Sidi Bel Abbès": ["Sidi Bel Abbès", "Telagh", "Ben Badis", "Tessala"],
  Annaba: ["Annaba", "El Hadjar", "Berrahal", "El Bouni", "Seraïdi"],
  Guelma: ["Guelma", "Héliopolis", "Hammam Debagh", "Oued Zenati"],
  Constantine: ["Constantine", "El Khroub", "Aïn Smara", "Zighoud Youcef", "Hamma Bouziane"],
  Médéa: ["Médéa", "Berrouaghia", "Ksar Boukhari", "El Omaria", "Tablat"],
  Mostaganem: ["Mostaganem", "Aïn Tedeles", "Sidi Ali", "Hassi Mameche"],
  "M'Sila": ["M'Sila", "Bou Saada", "Sidi Aïssa", "Aïn El Melh", "Magra"],
  Mascara: ["Mascara", "Sig", "Ghriss", "Tighennif", "Mohammadia"],
  Ouargla: ["Ouargla", "Touggourt", "Hassi Messaoud", "Rouissat", "Tebesbest"],
  Oran: ["Oran", "Bir El Djir", "Es Senia", "Arzew", "Aïn El Turck", "Bethioua", "Sidi Chami"],
  "El Bayadh": ["El Bayadh", "Brezina", "Bogtob", "El Abiodh Sidi Cheikh"],
  Illizi: ["Illizi", "Djanet", "Bordj Omar Driss", "Debdeb"],
  "Bordj Bou Arreridj": ["Bordj Bou Arreridj", "Ras El Oued", "Bordj Ghdir", "Medjana"],
  Boumerdès: ["Boumerdès", "Dellys", "Boudouaou", "Khemis El Khechna", "Thenia"],
  "El Tarf": ["El Tarf", "Ben M'Hidi", "Besbes", "El Kala", "Bouhadjar"],
  Tindouf: ["Tindouf", "Oum El Assel"],
  Tissemsilt: ["Tissemsilt", "Theniet El Had", "Khemisti", "Bordj Bounaama"],
  "El Oued": ["El Oued", "Robbah", "Djamaa", "Debila", "Kouinine"],
  Khenchela: ["Khenchela", "Babar", "Aïn Touila", "Chechar", "El Hamma"],
  "Souk Ahras": ["Souk Ahras", "Sedrata", "Taoura", "Mdaourouch", "Heddada"],
  Tipaza: ["Tipaza", "Cherchell", "Hadjout", "Kolea", "Fouka"],
  Mila: ["Mila", "Chelghoum Laïd", "Ferdjioua", "Tadjenanet", "Sidi Merouane"],
  "Aïn Defla": ["Aïn Defla", "Khemis Miliana", "El Attaf", "Djendel", "Boumedfaa"],
  Naâma: ["Naâma", "Mecheria", "Aïn Sefra", "Moghrar"],
  "Aïn Témouchent": ["Aïn Témouchent", "Hammam Bou Hadjar", "Beni Saf", "El Malah"],
  Ghardaïa: ["Ghardaïa", "Berriane", "El Menia", "Metlili", "Guerrara"],
  Relizane: ["Relizane", "Oued Rhiou", "Djidiouia", "Yellel", "Mazouna"],
}

export default function CheckoutForm() {
  const [quantity, setQuantity] = useState(1)
  const [wilaya, setWilaya] = useState("")
  const [commune, setCommune] = useState("")
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>(shippingConfig.defaultMethod)
  const [formData, setFormData] = useState({
    prenom: "",
    telephone: "",
    adresse: "",
  })
  const [product, setProduct] = useState<any>(null)
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Récupérer les données de livraison depuis WooCommerce API
  const { shippingData, loading: shippingLoading } = useWilayaShipping(wilaya || null)

  useEffect(() => {
    const cartItem = localStorage.getItem("cartItem")
    if (cartItem) {
      const parsedItem = JSON.parse(cartItem)
      setProduct(parsedItem)
    }
  }, [])

  // Vérifier si le shipping est activé dans la configuration
  const isShippingEnabled = shippingConfig.enabled

  // Méthodes de livraison dynamiques depuis WooCommerce
  const dynamicDeliveryMethods = useMemo((): WilayaShippingMethod[] => {
    if (!shippingData) return []
    return shippingData.methods.filter(m => m.deliveryType !== "other")
  }, [shippingData])

  // Calcul du sous-total et livraison
  const sousTotal = product ? Number.parseFloat(product.price) * quantity : 0

  // Calcul dynamique des frais de livraison depuis WooCommerce
  const livraison = useMemo(() => {
    // Si shipping désactivé, retourner 0
    if (!isShippingEnabled) return 0
    if (!wilaya || !shippingData) return 0
    // Vérifier si la livraison est gratuite
    if (isFreeShipping(sousTotal)) return 0

    // Utiliser les prix dynamiques de WooCommerce
    if (deliveryMethod === "domicile") {
      return shippingData.domicilePrice
    } else if (deliveryMethod === "stopdesk") {
      return shippingData.stopdeskPrice
    }
    return shippingData.cheapestMethod?.cost || 0
  }, [wilaya, deliveryMethod, sousTotal, isShippingEnabled, shippingData])

  const total = sousTotal + livraison

  if (!product) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center">
        <p className="text-muted-foreground mb-4">Votre panier est vide</p>
        <a href="/" className="text-primary hover:underline">
          Continuer vos achats
        </a>
      </div>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.prenom || !formData.telephone || !wilaya || !commune || !formData.adresse) {
      alert("Veuillez remplir tous les champs obligatoires")
      return
    }

    setIsSubmitting(true)

    try {
      const orderPayload = {
        product_id: product.id,
        quantity,
        prenom: formData.prenom,
        telephone: formData.telephone,
        wilaya,
        commune,
        adresse: formData.adresse,
        delivery_method: deliveryMethod,
        shipping_cost: livraison,
        subtotal: sousTotal,
        total,
      }

      console.log("[v0] Submitting order:", orderPayload)

      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderPayload),
      })

      if (!response.ok) {
        throw new Error("Failed to create order")
      }

      const result = await response.json()
      console.log("[v0] Order created:", result)

      // Clear cart
      localStorage.removeItem("cartItem")

      // Redirect to thank you page with order details
      router.push(`/thank-you?order=${result.order_number || result.order_id}`)
    } catch (error) {
      console.error("[v0] Order submission error:", error)
      alert("Erreur lors de la création de la commande. Veuillez réessayer.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-lg mx-auto px-4">
        {/* Back Button */}
        <button
          type="button"
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Retour</span>
        </button>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Quantity Card */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <label className="block text-sm font-medium mb-3">Quantité</label>
            <div className="flex items-center border border-gray-300 rounded-md w-36">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-2 hover:bg-gray-100 transition-colors border-r border-gray-300"
              >
                <Minus className="w-4 h-4" />
              </button>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, Number.parseInt(e.target.value) || 1))}
                className="w-12 py-2 bg-transparent focus:outline-none text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
              <button
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-2 hover:bg-gray-100 transition-colors border-l border-gray-300"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Delivery Form Card */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-6">Insérez votre adresse de livraison</h2>

            <div className="space-y-4">
              {/* Prénom */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Prénom <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute left-0 top-0 bottom-0 w-12 bg-gray-100 rounded-l-md flex items-center justify-center border-r border-gray-300">
                    <User className="w-5 h-5 text-gray-600" />
                  </div>
                  <input
                    type="text"
                    placeholder="Prénom"
                    required
                    value={formData.prenom}
                    onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
                    className="w-full pl-14 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Téléphone */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Téléphone <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute left-0 top-0 bottom-0 w-12 bg-gray-100 rounded-l-md flex items-center justify-center border-r border-gray-300">
                    <Phone className="w-5 h-5 text-gray-600" />
                  </div>
                  <input
                    type="tel"
                    placeholder="Téléphone"
                    required
                    value={formData.telephone}
                    onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
                    className="w-full pl-14 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Wilaya */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Wilaya الولاية <span className="text-red-500">*</span>
                </label>
                <select
                  value={wilaya}
                  required
                  onChange={(e) => {
                    setWilaya(e.target.value)
                    setCommune("")
                  }}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[center_right_0.75rem] pr-10"
                >
                  <option value="">الولاية Wilaya</option>
                  {WILAYAS.map((w) => (
                    <option key={w} value={w}>
                      {w}
                    </option>
                  ))}
                </select>
              </div>

              {/* Commune */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Commune البلدية <span className="text-red-500">*</span>
                </label>
                <select
                  value={commune}
                  required
                  onChange={(e) => setCommune(e.target.value)}
                  disabled={!wilaya}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[center_right_0.75rem] pr-10 disabled:opacity-50 disabled:bg-gray-50"
                >
                  <option value="">البلدية Commune</option>
                  {wilaya &&
                    COMMUNES[wilaya as keyof typeof COMMUNES]?.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                </select>
              </div>

              {/* Adresse */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Adresse <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute left-0 top-0 bottom-0 w-12 bg-gray-100 rounded-l-md flex items-center justify-center border-r border-gray-300">
                    <MapPin className="w-5 h-5 text-gray-600" />
                  </div>
                  <input
                    type="text"
                    placeholder="Adresse"
                    required
                    value={formData.adresse}
                    onChange={(e) => setFormData({ ...formData, adresse: e.target.value })}
                    className="w-full pl-14 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Delivery Method Selection - Only show if shipping is enabled */}
              {isShippingEnabled && shippingConfig.allowMethodSelection && (
                <div className="space-y-3 pt-4 border-t border-gray-200">
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-gray-500" />
                    <label className="text-sm font-medium text-gray-700">
                      Mode de livraison
                    </label>
                    {shippingLoading && <Loader2 className="w-4 h-4 animate-spin text-gray-400" />}
                  </div>

                  {/* Afficher les méthodes de WooCommerce si disponibles */}
                  {shippingData && dynamicDeliveryMethods.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {dynamicDeliveryMethods.map((method) => {
                        const isSelected = deliveryMethod === method.deliveryType
                        const isFree = method.isFree || (wilaya && isFreeShipping(sousTotal))

                        return (
                          <button
                            key={method.id}
                            type="button"
                            onClick={() => setDeliveryMethod(method.deliveryType as DeliveryMethod)}
                            className={`relative p-4 rounded-lg border-2 text-left transition-all duration-200 ${isSelected
                              ? 'border-[#0B5A8A] bg-blue-50'
                              : 'border-gray-200 hover:border-gray-400'
                              }`}
                          >
                            {/* Selected indicator */}
                            {isSelected && (
                              <div className="absolute top-3 right-3 w-5 h-5 bg-[#0B5A8A] rounded-full flex items-center justify-center">
                                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                              </div>
                            )}

                            <div className="flex items-start gap-3">
                              <span className="text-xl">{method.deliveryType === 'stopdesk' ? '📦' : '🏠'}</span>
                              <div className="flex-1 min-w-0">
                                <div className="font-semibold text-sm">{method.title}</div>
                                <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">
                                  {/* {method.description || (method.deliveryType === 'stopdesk' ? 'Récupérez votre colis au point relais' : 'Livraison à votre adresse')} */}
                                </p>

                                {/* Price from WooCommerce */}
                                <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100">
                                  <span className="text-xs text-gray-400">
                                    {/* {method.deliveryType === 'stopdesk' ? '2-4 jours' : '3-5 jours'} */}
                                  </span>
                                  <span className={`font-bold text-sm ${isFree ? 'text-green-600' : 'text-[#0B5A8A]'}`}>
                                    {isFree ? 'Gratuit' : formatPrice(method.cost)}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </button>
                        )
                      })}
                    </div>
                  ) : wilaya && shippingLoading ? (
                    <div className="text-center py-4">
                      <Loader2 className="w-6 h-6 animate-spin text-gray-400 mx-auto" />
                      <p className="text-xs text-gray-400 mt-2">Chargement des tarifs...</p>
                    </div>
                  ) : wilaya && !shippingData ? (
                    <div className="text-center py-4 text-xs text-gray-500">
                      <p>Tarifs non disponibles pour cette wilaya</p>
                    </div>
                  ) : (
                    <div className="text-center py-4 text-xs text-gray-400">
                      <p>Sélectionnez une wilaya pour voir les options de livraison</p>
                    </div>
                  )}

                  {/* Show shipping info if wilaya is selected */}
                  {wilaya && shippingData && (
                    <p className="text-xs text-gray-400 text-center">
                      Livraison vers {wilaya} ({shippingData.zoneName}) • {deliveryMethod === 'stopdesk' ? 'Point relais' : 'Domicile'}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Product Summary Card */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-start gap-3 mb-4 pb-4 border-b border-gray-200">
              <div className="relative w-16 h-20 flex-shrink-0 bg-gray-100 rounded overflow-hidden">
                <div className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium z-10">
                  {quantity}
                </div>
                <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-sm mb-1">{product.name}</h3>
                <p className="text-xs text-gray-500">{product.size}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold">DA {total.toLocaleString()}.00</p>
              </div>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Sous-total</span>
                <span className="font-medium">DA {sousTotal.toLocaleString()}.00</span>
              </div>
              {shippingConfig.enabled && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Livraison</span>
                  <span className="font-medium">{livraison === 0 ? "?" : `DA ${livraison.toLocaleString()}.00`}</span>
                </div>
              )}
              <div className="flex justify-between font-bold text-base pt-3 border-t border-gray-200">
                <span>Total</span>
                <span>DA {total.toLocaleString()}.00</span>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#0B5A8A] hover:bg-[#094A73] text-white py-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
              <line x1="7" y1="7" x2="7.01" y2="7" />
            </svg>
            {isSubmitting ? "En cours..." : `Acheter DA ${total.toLocaleString()}.00`}
          </button>
        </form>
      </div>
    </div>
  )
}
