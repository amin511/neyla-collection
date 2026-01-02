/**
 * Script de débogage pour les zones de shipping
 * Exécuter dans la console du navigateur pour diagnostiquer les problèmes
 */

// 1. Vider tous les caches
console.log("🧹 Nettoyage des caches...");
localStorage.removeItem("shipping_zones_cache");
localStorage.removeItem("products_cache");
sessionStorage.clear();

// 2. Tester l'API shipping directement
console.log("🔍 Test de l'API shipping...");
fetch("/api/shipping")
    .then(res => res.json())
    .then(data => {
        console.log("✅ Réponse API shipping:", data);

        if (data.success) {
            console.log(`📦 Total zones: ${data.totalZones}`);
            console.log(`✓ Zones actives: ${data.activeZones}`);

            data.zones.forEach(zone => {
                console.log(`\n📍 Zone: ${zone.name} (ID: ${zone.id})`);
                console.log(`  Locations:`, zone.locations.map(l => l.code).join(", "));
                console.log(`  Methods:`, zone.methods.length);
                zone.methods.forEach(method => {
                    console.log(`    - ${method.title} (${method.method_id}): ${method.settings.cost?.value || "0"} DA`);
                });
            });
        } else {
            console.error("❌ Erreur API:", data);
        }
    })
    .catch(err => {
        console.error("❌ Erreur lors du fetch:", err);
    });

// 3. Mapper les codes de wilayas
const WILAYA_CODES = {
    "Alger": "DZ:DZ-16",
    "Oran": "DZ:DZ-31",
    "Constantine": "DZ:DZ-25",
    "Blida": "DZ:DZ-09",
    "Annaba": "DZ:DZ-23",
    // Ajouter plus si nécessaire
};

// 4. Fonction de test pour une wilaya spécifique
window.testWilayaShipping = function (wilaya) {
    console.log(`\n🧪 Test pour: ${wilaya}`);
    const code = WILAYA_CODES[wilaya];

    if (!code) {
        console.error(`❌ Code non trouvé pour ${wilaya}`);
        console.log("Codes disponibles:", Object.keys(WILAYA_CODES));
        return;
    }

    console.log(`Code WooCommerce: ${code}`);

    fetch("/api/shipping")
        .then(res => res.json())
        .then(data => {
            if (!data.success) {
                console.error("❌ API error");
                return;
            }

            // Trouver la zone pour ce code
            const zone = data.zones.find(z =>
                z.locations.some(l => l.code === code || l.code === "DZ")
            );

            if (zone) {
                console.log(`✅ Zone trouvée: ${zone.name}`);
                console.log("Méthodes disponibles:");
                zone.methods.forEach(m => {
                    console.log(`  - ${m.title}: ${m.settings.cost?.value || "0"} DA`);
                });
            } else {
                console.log("⚠️ Aucune zone spécifique trouvée");
                console.log("Recherche de la zone par défaut (DZ)...");

                const defaultZone = data.zones.find(z =>
                    z.locations.some(l => l.code === "DZ")
                );

                if (defaultZone) {
                    console.log(`✅ Zone par défaut: ${defaultZone.name}`);
                    console.log("Méthodes disponibles:");
                    defaultZone.methods.forEach(m => {
                        console.log(`  - ${m.title}: ${m.settings.cost?.value || "0"} DA`);
                    });
                } else {
                    console.log("❌ Aucune zone par défaut trouvée");
                }
            }
        })
        .catch(err => console.error("❌ Erreur:", err));
};

console.log("\n✅ Script de débogage chargé!");
console.log("📝 Utilisez: testWilayaShipping('Alger') pour tester une wilaya");
console.log("🔄 Rechargez la page pour voir les changements");
