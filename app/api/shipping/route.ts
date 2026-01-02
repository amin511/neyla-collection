import { NextResponse } from "next/server"
import { getWooCredentials, buildApiUrl } from "@/lib/config"

export interface ShippingZone {
    id: number
    name: string
    order: number
}

export interface ShippingLocation {
    code: string
    type: "postcode" | "state" | "country" | "continent"
}

export interface ShippingMethod {
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
}

export interface ShippingZoneWithMethods extends ShippingZone {
    locations: ShippingLocation[]
    methods: ShippingMethod[]
}

/**
 * GET /api/shipping
 * Fetches all shipping zones with their locations and methods from WooCommerce
 */
export async function GET() {
    try {
        const { authHeader } = getWooCredentials()

        const headers = {
            Authorization: authHeader,
            "Content-Type": "application/json",
        }

        // 1. Fetch all shipping zones
        const zonesUrl = buildApiUrl("shipping/zones")
        const zonesResponse = await fetch(zonesUrl, {
            headers,
            cache: "force-cache",
        })

        if (!zonesResponse.ok) {
            console.error("[Shipping API] Failed to fetch zones:", zonesResponse.status)
            return NextResponse.json(
                { error: "Failed to fetch shipping zones" },
                { status: zonesResponse.status }
            )
        }

        const zones: ShippingZone[] = await zonesResponse.json()

        // 2. Fetch locations and methods for each zone
        const zonesWithDetails: ShippingZoneWithMethods[] = await Promise.all(
            zones.map(async (zone) => {
                // Fetch zone locations
                const locationsUrl = buildApiUrl(`shipping/zones/${zone.id}/locations`)
                const locationsResponse = await fetch(locationsUrl, {
                    headers,
                    cache: "force-cache",
                })
                const locations: ShippingLocation[] = locationsResponse.ok
                    ? await locationsResponse.json()
                    : []

                // Fetch zone methods
                const methodsUrl = buildApiUrl(`shipping/zones/${zone.id}/methods`)
                const methodsResponse = await fetch(methodsUrl, {
                    headers,
                    cache: "force-cache",
                })
                const methods: ShippingMethod[] = methodsResponse.ok
                    ? await methodsResponse.json()
                    : []

                return {
                    ...zone,
                    locations,
                    methods: methods.filter((m) => m.enabled), // Only enabled methods
                }
            })
        )

        // Filter zones that have methods
        const activeZones = zonesWithDetails.filter((z) => z.methods.length > 0)

        return NextResponse.json({
            success: true,
            zones: activeZones,
            totalZones: zones.length,
            activeZones: activeZones.length,
        })
    } catch (error) {
        console.error("[Shipping API] Error:", error)
        return NextResponse.json(
            { error: "Internal server error", message: String(error) },
            { status: 500 }
        )
    }
}
