/**
 * Configuration des frais de livraison par wilaya et méthode
 * 
 * Méthodes de livraison:
 * - "domicile": Livraison à domicile
 * - "stopdesk": Livraison au point relais / Stop Desk
 * 
 * Les prix sont en DZD (Dinar Algérien)
 * 
 * Configuration:
 * - enabled: Activer/désactiver l'affichage des frais de livraison
 * - useDynamicFromWooCommerce: Utiliser l'API WooCommerce pour récupérer les zones/méthodes
 */

export type DeliveryMethod = "domicile" | "stopdesk";

export interface ShippingRate {
    domicile: number;
    stopdesk: number;
}

export interface DeliveryMethodInfo {
    id: DeliveryMethod;
    label: string;
    description: string;
    icon: string;
    estimatedDays: string;
}

// Configuration des méthodes de livraison
export const deliveryMethods: DeliveryMethodInfo[] = [
    {
        id: "stopdesk",
        label: "Stop Desk",
        description: "Récupérez votre colis au point relais le plus proche",
        icon: "📦",
        estimatedDays: "2-4 jours",
    },
    {
        id: "domicile",
        label: "Livraison à domicile",
        description: "Livraison directement chez vous",
        icon: "🏠",
        estimatedDays: "3-5 jours",
    },
];

// Prix de livraison par wilaya (en DZD)
// Vous pouvez ajuster ces prix selon votre grille tarifaire
export const shippingRates: Record<string, ShippingRate> = {
    // Zone 1 - Alger et environs (prix les plus bas)
    "Alger": { domicile: 500, stopdesk: 350 },
    "Blida": { domicile: 550, stopdesk: 400 },
    "Boumerdès": { domicile: 550, stopdesk: 400 },
    "Tipaza": { domicile: 550, stopdesk: 400 },

    // Zone 2 - Centre Nord
    "Tizi Ouzou": { domicile: 600, stopdesk: 450 },
    "Béjaïa": { domicile: 650, stopdesk: 500 },
    "Bouira": { domicile: 600, stopdesk: 450 },
    "Médéa": { domicile: 600, stopdesk: 450 },
    "Chlef": { domicile: 650, stopdesk: 500 },
    "Ain Defla": { domicile: 600, stopdesk: 450 },

    // Zone 3 - Est
    "Constantine": { domicile: 700, stopdesk: 550 },
    "Annaba": { domicile: 750, stopdesk: 600 },
    "Sétif": { domicile: 700, stopdesk: 550 },
    "Batna": { domicile: 750, stopdesk: 600 },
    "Skikda": { domicile: 750, stopdesk: 600 },
    "Jijel": { domicile: 700, stopdesk: 550 },
    "Bordj Bou Arreridj": { domicile: 700, stopdesk: 550 },
    "Mila": { domicile: 700, stopdesk: 550 },
    "M'sila": { domicile: 750, stopdesk: 600 },
    "Guelma": { domicile: 750, stopdesk: 600 },
    "Oum El Bouaghi": { domicile: 750, stopdesk: 600 },
    "El Tarf": { domicile: 800, stopdesk: 650 },
    "Souk Ahras": { domicile: 800, stopdesk: 650 },
    "Tébessa": { domicile: 850, stopdesk: 700 },
    "Khenchela": { domicile: 800, stopdesk: 650 },

    // Zone 4 - Ouest
    "Oran": { domicile: 700, stopdesk: 550 },
    "Tlemcen": { domicile: 750, stopdesk: 600 },
    "Sidi Bel Abbès": { domicile: 700, stopdesk: 550 },
    "Mostaganem": { domicile: 700, stopdesk: 550 },
    "Mascara": { domicile: 700, stopdesk: 550 },
    "Relizane": { domicile: 700, stopdesk: 550 },
    "Tiaret": { domicile: 750, stopdesk: 600 },
    "Saïda": { domicile: 750, stopdesk: 600 },
    "Ain Témouchent": { domicile: 700, stopdesk: 550 },
    "Tissemsilt": { domicile: 750, stopdesk: 600 },
    "Naâma": { domicile: 900, stopdesk: 750 },

    // Zone 5 - Hauts Plateaux
    "Djelfa": { domicile: 800, stopdesk: 650 },
    "Laghouat": { domicile: 850, stopdesk: 700 },
    "El Bayadh": { domicile: 900, stopdesk: 750 },
    "Biskra": { domicile: 850, stopdesk: 700 },
    "El Oued": { domicile: 900, stopdesk: 750 },

    // Zone 6 - Sud (prix plus élevés)
    "Ghardaïa": { domicile: 1000, stopdesk: 850 },
    "Ouargla": { domicile: 1000, stopdesk: 850 },
    "Béchar": { domicile: 1100, stopdesk: 950 },
    "Adrar": { domicile: 1200, stopdesk: 1050 },
    "Tindouf": { domicile: 1300, stopdesk: 1150 },
    "Illizi": { domicile: 1300, stopdesk: 1150 },
    "Tamanrasset": { domicile: 1400, stopdesk: 1250 },

    // Nouvelles wilayas (2019)
    "Timimoun": { domicile: 1200, stopdesk: 1050 },
    "Bordj Badji Mokhtar": { domicile: 1400, stopdesk: 1250 },
    "Ouled Djellal": { domicile: 900, stopdesk: 750 },
    "Béni Abbès": { domicile: 1100, stopdesk: 950 },
    "In Salah": { domicile: 1300, stopdesk: 1150 },
    "In Guezzam": { domicile: 1400, stopdesk: 1250 },
    "Touggourt": { domicile: 950, stopdesk: 800 },
    "Djanet": { domicile: 1400, stopdesk: 1250 },
    "El M'Ghair": { domicile: 900, stopdesk: 750 },
    "El Meniaa": { domicile: 1000, stopdesk: 850 },
};

// Prix par défaut si la wilaya n'est pas dans la liste
export const defaultShippingRate: ShippingRate = {
    domicile: 800,
    stopdesk: 650,
};

/**
 * Obtenir le prix de livraison pour une wilaya et une méthode
 */
export function getShippingPrice(wilaya: string, method: DeliveryMethod): number {
    const rates = shippingRates[wilaya] || defaultShippingRate;
    return rates[method];
}

/**
 * Obtenir les tarifs de livraison pour une wilaya
 */
export function getShippingRates(wilaya: string): ShippingRate {
    return shippingRates[wilaya] || defaultShippingRate;
}

/**
 * Vérifier si une wilaya a des tarifs personnalisés
 */
export function hasCustomRates(wilaya: string): boolean {
    return wilaya in shippingRates;
}

/**
 * Configuration générale de la livraison
 */
export const shippingConfig = {
    /**
     * Activer/désactiver l'affichage et le calcul des frais de livraison
     * Si false: les frais de livraison ne seront pas affichés ni calculés
     */
    enabled: true,

    /**
     * Utiliser les données dynamiques de WooCommerce
     * Si true: récupère les zones et méthodes depuis l'API WooCommerce
     * Si false: utilise les tarifs statiques définis dans shippingRates
     */
    useDynamicFromWooCommerce: false,

    // Livraison gratuite à partir de ce montant (0 = désactivé)
    freeShippingThreshold: 0,

    // Message pour la livraison gratuite
    freeShippingMessage: "Livraison gratuite",

    // Afficher les estimations de délai
    showEstimatedDelivery: true,

    // Méthode par défaut
    defaultMethod: "stopdesk" as DeliveryMethod,

    // Permettre le choix de la méthode
    allowMethodSelection: true,

    /**
     * Message affiché quand la livraison est désactivée
     */
    disabledMessage: "Livraison calculée à la confirmation",
};

/**
 * Vérifier si la livraison est gratuite pour un montant donné
 */
export function isFreeShipping(subtotal: number): boolean {
    return shippingConfig.freeShippingThreshold > 0 && subtotal >= shippingConfig.freeShippingThreshold;
}
