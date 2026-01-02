"use client"

import { useEffect } from "react"
import { preloadShippingZones } from "@/lib/hooks/useShipping"

/**
 * Component to preload shipping data in the background
 * Place this in your root layout for optimal performance
 */
export function ShippingPreloader() {
    useEffect(() => {
        // Preload shipping zones as soon as the app loads
        preloadShippingZones()
    }, [])

    return null // This component renders nothing
}
