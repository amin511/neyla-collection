/**
 * Hero Section Configuration
 * Customize hero banners, slides, and CTAs
 */

export interface HeroSlide {
    image: string
    title?: string
    subtitle?: string
    cta?: {
        text: string
        href: string
    }
    overlay?: number // 0-100 opacity percentage
}

export const heroConfig = {
    // Auto-rotate settings
    autoRotate: true,
    rotateInterval: 4000, // milliseconds

    // Slides
    slides: [
        {
            image: "/images/WhatsApp1.jpeg",
            title: "NEW Collection 2026",
            subtitle: "",
            overlay: 30,
        },
        {
            image: "/images/WhatsApp2.jpeg",
            title: "NEW Collection 2026",
            subtitle: "",
            overlay: 30,
        },
    ] as HeroSlide[],

    // Hero height
    height: {
        mobile: "400px",
        desktop: "600px",
    },

    // Typography styles
    typography: {
        title: "text-4xl md:text-6xl font-light tracking-tight text-white",
        subtitle: "text-lg md:text-xl text-white/90 mt-4",
    },
} as const

export type HeroConfig = typeof heroConfig
