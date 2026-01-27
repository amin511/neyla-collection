/**
 * Color Configuration
 * Mapping of color names (French and English) to CSS color values
 */

export type ColorMap = Record<string, string>

/**
 * Color mapping for product attributes
 * Supports both French and English color names
 */
export const colorMap: ColorMap = {
    // French color names
    "noir": "#000000",
    "blanc": "#FFFFFF",
    "rouge": "#DC2626",
    "bleu": "#2563EB",
    "vert": "#16A34A",
    "jaune": "#EAB308",
    "orange": "#EA580C",
    "rose": "#EC4899",
    "violet": "#7C3AED",
    "gris": "#6B7280",
    "marron": "#92400E",
    "beige": "#D4B896",
    "crème": "#FFFDD0",
    "creme": "#FFFDD0",
    "bordeaux": "#722F37",
    "marine": "#1E3A5F",
    "bleu marine": "#1E3A5F",
    "bleu ciel": "#87CEEB",
    "vert olive": "#808000",
    "vert foncé": "#006400",
    "vert clair": "#90EE90",
    "gris clair": "#D1D5DB",
    "gris foncé": "#374151",
    "doré": "#FFD700",
    "argenté": "#C0C0C0",
    "corail": "#FF7F50",
    "turquoise": "#40E0D0",
    "lavande": "#E6E6FA",
    "saumon": "#FA8072",
    "kaki": "#C3B091",
    "camel": "#C19A6B",
    "taupe": "#483C32",
    "écru": "#F5F5DC",
    "ivoire": "#FFFFF0",
    "anthracite": "#293133",
    "nude": "#E3BC9A",
    "cognac": "#9A463D",
    "moutarde": "#FFDB58",
    "rouille": "#B7410E",
    "ocre": "#CC7722",
    "terracotta": "#E2725B",
    "prune": "#701C1C",
    "menthe": "#98FF98",
    "pêche": "#FFCBA4",
    "abricot": "#FBCEB1",
    "chocolat": "#7B3F00",
    "crémeux": "#FFFDD0",
    "sable": "#C2B280",

    // English color names
    "black": "#000000",
    "white": "#FFFFFF",
    "red": "#DC2626",
    "blue": "#2563EB",
    "green": "#16A34A",
    "yellow": "#EAB308",
    "pink": "#EC4899",
    "purple": "#7C3AED",
    "gray": "#6B7280",
    "grey": "#6B7280",
    "brown": "#92400E",
    "navy": "#1E3A5F",
    "gold": "#FFD700",
    "silver": "#C0C0C0",
    "coral": "#FF7F50",
    "teal": "#008080",
    "mint": "#98FF98",
    "peach": "#FFCBA4",
    "cream": "#FFFDD0",
    "ivory": "#FFFFF0",
    "sand": "#C2B280",
    "olive": "#808000",
    "burgundy": "#722F37",
    "charcoal": "#36454F",
    "tan": "#D2B48C",
    "khaki": "#C3B091",
    "maroon": "#800000",
    "mustard": "#FFDB58",
    "rust": "#B7410E",
    "plum": "#701C1C",
    "chocolate": "#7B3F00",
}

/**
 * Get CSS color value from a color name
 * @param colorName - The name of the color (French or English)
 * @returns The CSS color value (hex) or the original name if not found
 */
export function getColorValue(colorName: string): string {
    const normalizedColor = colorName.toLowerCase().trim()
    return colorMap[normalizedColor] || colorName
}

/**
 * Check if a color name exists in the color map
 * @param colorName - The name of the color to check
 * @returns true if the color exists in the map
 */
export function isKnownColor(colorName: string): boolean {
    const normalizedColor = colorName.toLowerCase().trim()
    return normalizedColor in colorMap
}

/**
 * Add custom colors to the color map
 * @param customColors - Object with color name to hex value mappings
 */
export function extendColorMap(customColors: ColorMap): void {
    Object.assign(colorMap, customColors)
}
