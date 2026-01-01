"use client"

import { useState, useEffect, useCallback, useMemo } from "react"

export interface ShippingZone {
    id: number
    name: string
    order: number
    locations: {
        code: string
        type: "postcode" | "state" | "country" | "continent"
    }[]
    methods: {
        instance_id: number
        title: string
        order: number
        enabled: boolean
        method_id: string
        method_title: string
        method_description: string
        settings: {
            title?: { value: string }
            cost?: { value: string }
            min_amount?: { value: string }
            requires?: { value: string }
        }
    }[]
}

export interface ShippingApiResponse {
    success: boolean
    zones: ShippingZone[]
    totalZones: number
    activeZones: number
}

export interface ParsedShippingMethod {
    id: number
    methodId: string
    title: string
    cost: number
    description: string
    isFree: boolean
    minAmount?: number
}

export interface ParsedShippingZone {
    id: number
    name: string
    locations: string[]
    methods: ParsedShippingMethod[]
}

/**
 * Parse shipping method cost from WooCommerce format
 * WooCommerce can use formulas like "10.00 * [qty]", we extract the base cost
 */
function parseShippingCost(costString: string | undefined): number {
    if (!costString) return 0

    // Remove spaces and try to extract numeric value
    const cleaned = costString.trim()

    // If it's just a number, parse it
    const numericMatch = cleaned.match(/^[\d.]+/)
    if (numericMatch) {
        return parseFloat(numericMatch[0]) || 0
    }

    return 0
}

/**
 * Hook to fetch and manage shipping zones from WooCommerce
 */
export function useShippingZones() {
    const [zones, setZones] = useState<ParsedShippingZone[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetchShippingZones = useCallback(async () => {
        setLoading(true)
        setError(null)

        try {
            const response = await fetch("/api/shipping", {
                cache: "force-cache",
                next: { revalidate: 300 },
            } as RequestInit)

            if (!response.ok) {
                throw new Error("Failed to fetch shipping zones")
            }

            const data: ShippingApiResponse = await response.json()

            if (!data.success) {
                throw new Error("API returned error")
            }

            // Parse zones into a simpler format
            const parsedZones: ParsedShippingZone[] = data.zones.map((zone) => ({
                id: zone.id,
                name: zone.name,
                locations: zone.locations.map((l) => l.code),
                methods: zone.methods.map((method) => ({
                    id: method.instance_id,
                    methodId: method.method_id,
                    title: method.settings.title?.value || method.title || method.method_title,
                    cost: parseShippingCost(method.settings.cost?.value),
                    description: method.method_description.replace(/<[^>]*>/g, "").trim(),
                    isFree: method.method_id === "free_shipping",
                    minAmount: method.settings.min_amount
                        ? parseFloat(method.settings.min_amount.value)
                        : undefined,
                })),
            }))

            setZones(parsedZones)
        } catch (err) {
            console.error("[useShippingZones] Error:", err)
            setError(err instanceof Error ? err.message : "Unknown error")
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchShippingZones()
    }, [fetchShippingZones])

    /**
     * Find shipping zone for a given location code (e.g., "DZ:16" for Alger)
     */
    const findZoneForLocation = useCallback(
        (locationCode: string): ParsedShippingZone | null => {
            // First try exact match
            const exactMatch = zones.find((zone) => {
                return zone.locations.includes(locationCode)
            })
            if (exactMatch) return exactMatch

            // Try country code match (e.g., "DZ")
            const countryCode = locationCode.split(":")[0]
            const countryMatch = zones.find((zone) =>
                zone.locations.includes(countryCode)
            )
            if (countryMatch) return countryMatch

            // Return "Rest of the World" zone (id 0) if exists
            const restOfWorld = zones.find((zone) => zone.id === 0)
            return restOfWorld || null
        },
        [zones]
    )

    /**
     * Get shipping methods for a zone
     */
    const getMethodsForZone = useCallback(
        (zoneId: number): ParsedShippingMethod[] => {
            const zone = zones.find((z) => z.id === zoneId)
            return zone?.methods || []
        },
        [zones]
    )

    /**
     * Get cheapest shipping method for a zone
     */
    const getCheapestMethod = useCallback(
        (zoneId: number): ParsedShippingMethod | null => {
            const methods = getMethodsForZone(zoneId)
            if (methods.length === 0) return null

            // Check for free shipping first
            const freeMethod = methods.find((m) => m.isFree)
            if (freeMethod) return freeMethod

            // Get cheapest paid method
            return methods.reduce((cheapest, current) =>
                current.cost < cheapest.cost ? current : cheapest
            )
        },
        [getMethodsForZone]
    )

    return {
        zones,
        loading,
        error,
        refetch: fetchShippingZones,
        findZoneForLocation,
        getMethodsForZone,
        getCheapestMethod,
    }
}

/**
 * Get static shipping data for server-side rendering fallback
 */
export async function getServerShippingZones(): Promise<ParsedShippingZone[]> {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
        const response = await fetch(`${baseUrl}/api/shipping`, {
            next: { revalidate: 300 },
        })

        if (!response.ok) return []

        const data: ShippingApiResponse = await response.json()
        if (!data.success) return []

        return data.zones.map((zone) => ({
            id: zone.id,
            name: zone.name,
            locations: zone.locations.map((l) => l.code),
            methods: zone.methods.map((method) => ({
                id: method.instance_id,
                methodId: method.method_id,
                title: method.settings.title?.value || method.title || method.method_title,
                cost: parseShippingCost(method.settings.cost?.value),
                description: method.method_description.replace(/<[^>]*>/g, "").trim(),
                isFree: method.method_id === "free_shipping",
                minAmount: method.settings.min_amount
                    ? parseFloat(method.settings.min_amount.value)
                    : undefined,
            })),
        }))
    } catch {
        return []
    }
}

/**
 * Mapping des wilayas algériennes vers les codes de zone WooCommerce
 * Format WooCommerce: "DZ:DZ-XX" où XX est le numéro de la wilaya (01-58)
 */
const WILAYA_CODE_MAP: Record<string, string> = {
    "Adrar": "DZ:DZ-01",
    "Chlef": "DZ:DZ-02",
    "Laghouat": "DZ:DZ-03",
    "Oum El Bouaghi": "DZ:DZ-04",
    "Batna": "DZ:DZ-05",
    "Béjaïa": "DZ:DZ-06",
    "Biskra": "DZ:DZ-07",
    "Béchar": "DZ:DZ-08",
    "Blida": "DZ:DZ-09",
    "Bouira": "DZ:DZ-10",
    "Tamanrasset": "DZ:DZ-11",
    "Tébessa": "DZ:DZ-12",
    "Tlemcen": "DZ:DZ-13",
    "Tiaret": "DZ:DZ-14",
    "Tizi Ouzou": "DZ:DZ-15",
    "Alger": "DZ:DZ-16",
    "Djelfa": "DZ:DZ-17",
    "Jijel": "DZ:DZ-18",
    "Sétif": "DZ:DZ-19",
    "Saïda": "DZ:DZ-20",
    "Skikda": "DZ:DZ-21",
    "Sidi Bel Abbès": "DZ:DZ-22",
    "Annaba": "DZ:DZ-23",
    "Guelma": "DZ:DZ-24",
    "Constantine": "DZ:DZ-25",
    "Médéa": "DZ:DZ-26",
    "Mostaganem": "DZ:DZ-27",
    "M'Sila": "DZ:DZ-28",
    "Mascara": "DZ:DZ-29",
    "Ouargla": "DZ:DZ-30",
    "Oran": "DZ:DZ-31",
    "El Bayadh": "DZ:DZ-32",
    "Illizi": "DZ:DZ-33",
    "Bordj Bou Arreridj": "DZ:DZ-34",
    "Boumerdès": "DZ:DZ-35",
    "El Tarf": "DZ:DZ-36",
    "Tindouf": "DZ:DZ-37",
    "Tissemsilt": "DZ:DZ-38",
    "El Oued": "DZ:DZ-39",
    "Khenchela": "DZ:DZ-40",
    "Souk Ahras": "DZ:DZ-41",
    "Tipaza": "DZ:DZ-42",
    "Mila": "DZ:DZ-43",
    "Aïn Defla": "DZ:DZ-44",
    "Naâma": "DZ:DZ-45",
    "Aïn Témouchent": "DZ:DZ-46",
    "Ghardaïa": "DZ:DZ-47",
    "Relizane": "DZ:DZ-48",
    // Nouvelles wilayas (49-58)
    "Timimoun": "DZ:DZ-49",
    "Bordj Badji Mokhtar": "DZ:DZ-50",
    "Ouled Djellal": "DZ:DZ-51",
    "Béni Abbès": "DZ:DZ-52",
    "In Salah": "DZ:DZ-53",
    "In Guezzam": "DZ:DZ-54",
    "Touggourt": "DZ:DZ-55",
    "Djanet": "DZ:DZ-56",
    "El M'Ghair": "DZ:DZ-57",
    "El Meniaa": "DZ:DZ-58",
}

export interface WilayaShippingMethod {
    id: number
    methodId: string
    title: string
    cost: number
    description: string
    isFree: boolean
    minAmount?: number
    /** Mapped delivery type: domicile or stopdesk */
    deliveryType: "domicile" | "stopdesk" | "other"
}

export interface WilayaShippingData {
    zoneName: string
    zoneId: number
    methods: WilayaShippingMethod[]
    domicilePrice: number
    stopdeskPrice: number
    cheapestMethod: WilayaShippingMethod | null
}

/**
 * Hook to get shipping data for a specific Algerian wilaya using WooCommerce API
 * This replaces the static shipping rates with dynamic data from WooCommerce
 */
export function useWilayaShipping(wilaya: string | null) {
    const { zones, loading, error, findZoneForLocation } = useShippingZones()

    const shippingData = useMemo((): WilayaShippingData | null => {
        if (!wilaya || loading || zones.length === 0) return null

        // Get the WooCommerce location code for this wilaya (format: DZ:DZ-XX)
        const locationCode = WILAYA_CODE_MAP[wilaya]

        if (!locationCode) {
            console.warn("[useWilayaShipping] No location code found for wilaya:", wilaya)
            return null
        }
        console.log("[useWilayaShipping] Finding shipping zone for location code:", locationCode)
        // Find the zone for this location
        const zone = findZoneForLocation(locationCode)

        if (!zone) {
            // Try fallback to country-level zone
            const countryZone = findZoneForLocation("DZ")
            if (!countryZone) return null

            return mapZoneToShippingData(countryZone)
        }

        return mapZoneToShippingData(zone)
    }, [wilaya, zones, loading, findZoneForLocation])

    return {
        shippingData,
        loading,
        error,
        /** Check if wilaya has custom shipping rates */
        hasCustomRates: shippingData !== null,
    }
}

/**
 * Map a parsed shipping zone to WilayaShippingData
 */
function mapZoneToShippingData(zone: ParsedShippingZone): WilayaShippingData {
    // Map methods with delivery type detection
    const methods: WilayaShippingMethod[] = zone.methods.map((method) => ({
        ...method,
        deliveryType: detectDeliveryType(method.title, method.methodId),
    }))

    // Find domicile and stopdesk prices
    const domicileMethod = methods.find((m) => m.deliveryType === "domicile")
    const stopdeskMethod = methods.find((m) => m.deliveryType === "stopdesk")

    // Get cheapest method
    const cheapestMethod = methods.length > 0
        ? methods.reduce((cheapest, current) => {
            if (current.isFree) return current
            if (cheapest.isFree) return cheapest
            return current.cost < cheapest.cost ? current : cheapest
        })
        : null

    return {
        zoneName: zone.name,
        zoneId: zone.id,
        methods,
        domicilePrice: domicileMethod?.cost || 0,
        stopdeskPrice: stopdeskMethod?.cost || 0,
        cheapestMethod,
    }
}

/**
 * Detect delivery type from method title or ID
 * - flat_rate_ecotrack / التوصيل للمنزل = domicile (home delivery)
 * - local_pickup_ecotrack / التوصيل للمكتب = stopdesk (office/pickup point)
 */
function detectDeliveryType(title: string, methodId: string): "domicile" | "stopdesk" | "other" {
    const titleLower = title.toLowerCase()
    const methodIdLower = methodId.toLowerCase()

    // Check for Ecotrack specific methods first
    if (methodIdLower.includes("local_pickup_ecotrack") || titleLower.includes("للمكتب")) {
        return "stopdesk"
    }
    if (methodIdLower.includes("flat_rate_ecotrack") || titleLower.includes("للمنزل")) {
        return "domicile"
    }

    // Check for stopdesk/point relais keywords
    const stopdeskKeywords = ["stop desk", "stopdesk", "point relais", "relais", "pickup", "collect", "local_pickup", "مكتب"]
    if (stopdeskKeywords.some((kw) => titleLower.includes(kw) || methodIdLower.includes(kw))) {
        return "stopdesk"
    }

    // Check for domicile/home delivery keywords
    const domicileKeywords = ["domicile", "home", "door", "porte", "maison", "adresse", "flat_rate", "منزل"]
    if (domicileKeywords.some((kw) => titleLower.includes(kw) || methodIdLower.includes(kw))) {
        return "domicile"
    }

    // Default: if it's flat_rate, assume domicile
    if (methodIdLower.includes("flat_rate")) {
        return "domicile"
    }

    return "other"
}

/**
 * Get shipping price for a wilaya and delivery method using WooCommerce data
 * Fallback to static rates if WooCommerce data is not available
 */
export function useShippingPrice(wilaya: string | null, deliveryMethod: "domicile" | "stopdesk") {
    const { shippingData, loading, error } = useWilayaShipping(wilaya)

    const price = useMemo(() => {
        if (!shippingData) return 0

        if (deliveryMethod === "domicile") {
            return shippingData.domicilePrice
        } else if (deliveryMethod === "stopdesk") {
            return shippingData.stopdeskPrice
        }

        return shippingData.cheapestMethod?.cost || 0
    }, [shippingData, deliveryMethod])

    return {
        price,
        loading,
        error,
        methods: shippingData?.methods || [],
    }
}
