/**
 * Site Configuration
 * Central configuration for all site-wide settings
 * Easy to customize when switching brands/clients
 */

export const siteConfig = {
    // Brand Information
    name: "NAALA",
    tagline: "Fashion & Lifestyle",
    description: "Discover elegant fashion and lifestyle collections from NAALA. New collection 2025 featuring traditional and contemporary designs.",

    // URLs
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://naalasbrand.com",

    // Logo & Branding
    logo: {
        src: "/images/nalalogo.png",
        alt: "NAALA",
        width: 120,
        height: 50,
    },
    favicon: "/favicon.svg",

    // Contact Information
    contact: {
        email: "Naalasbrand@gmail.com",
        phone: "+213770499357",
        phoneDisplay: "07 70 49 93 57",
        address: "Algiers, Bordj el kiffan centre",
        mapUrl: "https://maps.app.goo.gl/fqYdbdd2hrBqNUxX6",
    },

    // Social Media
    social: {
        instagram: {
            url: "https://www.instagram.com/naalasbrand/",
            handle: "@naalasbrand",
        },
        facebook: {
            url: "",
            handle: "",
        },
        twitter: {
            url: "",
            handle: "",
        },
        tiktok: {
            url: "",
            handle: "",
        },
    },

    // Locale & Currency
    locale: "fr-DZ",
    currency: {
        code: "DZD",
        symbol: "DA",
        position: "before" as const, // "before" or "after"
    },
    country: "DZ",

    // SEO
    seo: {
        titleTemplate: "%s | NAALA",
        defaultTitle: "NAALA - Fashion & Lifestyle",
        openGraph: {
            type: "website",
            locale: "fr_DZ",
            siteName: "NAALA",
        },
    },

    // Features toggles
    features: {
        darkMode: false,
        wishlist: false,
        reviews: false,
        search: true,
        cart: true,
        newsletter: false,
        multiLanguage: false,
    },

    /**
     * Checkout Mode Configuration
     * Defines how users can purchase products
     * 
     * Options:
     * - "form"  : Only inline form on product page (direct order)
     * - "cart"  : Only add to cart button (redirect to cart/checkout)
     * - "both"  : Both options available (form + add to cart button)
     */
    checkoutMode: "cart" as "form" | "cart" | "both",

    /**
     * Add to Cart Redirect Configuration
     * Defines where the user is redirected after adding to cart
     * 
     * Options:
     * - "cart"     : Redirect to the cart page (/cart)
     * - "checkout" : Redirect directly to checkout page (/checkout)
     * - "stay"     : Stay on the current page (no redirect)
     */
    addToCartRedirect: "checkout" as "cart" | "checkout" | "stay",

    // Copyright
    copyright: {
        year: new Date().getFullYear(),
        text: "Tous droits réservés.",
    },
} as const

export type SiteConfig = typeof siteConfig
export type CheckoutMode = "form" | "cart" | "both"
export type AddToCartRedirect = "cart" | "checkout" | "stay"
