/**
 * Centralized Configuration Exports
 * Import all config from this single file
 * 
 * Usage:
 * import { siteConfig, themeConfig, wooConfig } from "@/lib/config"
 */

export { siteConfig, type SiteConfig } from "./site"
export { themeConfig, type ThemeConfig } from "./theme"
export { navigationConfig, type NavigationConfig, type NavItem } from "./navigation"
export { wooConfig, getWooCredentials, buildApiUrl, type WooConfig } from "./woocommerce"
export { heroConfig, type HeroConfig, type HeroSlide } from "./hero"

/**
 * Price formatting utility using site config
 */
import { siteConfig } from "./site"

export function formatPrice(price: number): string {
    const { symbol, code, position } = siteConfig.currency

    const formatted = price.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    })

    if (position === "before") {
        return `${symbol} ${formatted} ${code}`
    }
    return `${formatted} ${symbol} ${code}`
}

/**
 * Get full page title using SEO template
 */
export function getPageTitle(title?: string): string {
    if (!title) return siteConfig.seo.defaultTitle
    return siteConfig.seo.titleTemplate.replace("%s", title)
}
