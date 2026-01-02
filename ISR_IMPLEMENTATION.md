# Implémentation ISR (Incremental Static Regeneration)

## Vue d'ensemble

L'ISR a été implémenté dans l'application pour optimiser les performances et réduire la charge sur WooCommerce.

## Configuration par page

### Page d'accueil (`app/page.tsx`)
- **Revalidation**: 5 minutes (300 secondes)
- **Type**: Server Component avec Suspense
- **Composant**: `ProductsSectionServer`
- **Comportement**: Les produits sont mis en cache et régénérés toutes les 5 minutes

### Page des produits (`app/products/page.tsx`)
- **Revalidation**: 5 minutes (300 secondes)
- **Type**: Server Component
- **Paramètres dynamiques**: Support des filtres par catégorie via searchParams
- **Comportement**: Pages statiques avec régénération automatique

### Page de détail produit (`app/product/[id]/page.tsx`)
- **Revalidation**: 10 minutes (600 secondes)
- **Type**: Server Component avec `generateStaticParams`
- **Pre-rendering**: Les 20 produits les plus populaires sont pré-générés
- **Comportement**: 
  - Pages populaires générées au build
  - Nouvelles pages générées à la demande (on-demand ISR)
  - Toutes les pages sont mises en cache et régénérées toutes les 10 minutes

### API Routes

#### `/api/products`
- **Revalidation**: 5 minutes (300 secondes)
- **Cache**: Toutes les requêtes fetch utilisent `next: { revalidate: 300 }`

#### `/api/categories`
- **Revalidation**: 10 minutes (600 secondes)
- **Cache**: Données de catégories mises en cache plus longtemps car elles changent rarement

## Avantages de l'implémentation

1. **Performance**: 
   - Temps de chargement ultra-rapide (pages servies depuis le cache)
   - Réduction de la latence pour les utilisateurs finaux

2. **Scalabilité**:
   - Réduction drastique des appels API à WooCommerce
   - Meilleure gestion des pics de trafic

3. **Coûts**:
   - Moins de requêtes = moins de charge serveur
   - Optimisation des ressources WooCommerce

4. **Expérience utilisateur**:
   - Pages instantanées pour le contenu en cache
   - Loading states fluides avec Suspense
   - Données relativement fraîches (5-10 min max)

## Stratégies de cache

### Pages statiques (build time)
- 20 produits populaires générés au build via `generateStaticParams`
- Page d'accueil
- Page de tous les produits

### Pages dynamiques (on-demand)
- Nouvelles pages de produits générées à la première visite
- Mises en cache pour les visites suivantes

### Régénération
- **Background**: Les pages sont régénérées en arrière-plan
- **Stale-while-revalidate**: Les utilisateurs voient toujours une version rapide
- **Automatic**: Aucune intervention manuelle nécessaire

## Monitoring et optimisation

### Vérifier le statut du cache
Dans les logs de production, recherchez:
- `[ProductsSection] Using valid cache`
- `[Products] API Error:` (pour détecter les problèmes)

### Forcer la régénération
Pour forcer la régénération d'une page spécifique:
```javascript
// Dans une API route ou Server Action
revalidatePath('/products')
revalidatePath('/product/[id]', 'page')
revalidateTag('products')
```

### Ajuster les durées de revalidation
Modifier selon vos besoins:
- Produits très dynamiques: 60-300 secondes
- Contenu stable: 600-3600 secondes
- Catégories/navigation: 3600+ secondes

## Migration depuis le client-side

### Ancien comportement (Client Component)
```tsx
"use client"
const [products, setProducts] = useState([])
useEffect(() => {
  fetch('/api/products').then(...)
}, [])
```

### Nouveau comportement (Server Component + ISR)
```tsx
export const revalidate = 300
async function getProducts() {
  const res = await fetch(url, { next: { revalidate: 300 } })
  return res.json()
}
export default async function Page() {
  const products = await getProducts()
  return <div>{products.map(...)}</div>
}
```

## Best Practices

1. **Revalidation times**: Ajuster selon la fréquence de mise à jour du contenu
2. **Error handling**: Toujours avoir des fallbacks pour les erreurs fetch
3. **Loading states**: Utiliser Suspense pour de meilleures UX
4. **Cache tags**: Utiliser `revalidateTag()` pour invalider des groupes de pages

## Prochaines optimisations possibles

1. **On-Demand Revalidation**: Webhooks WooCommerce pour invalider le cache en temps réel
2. **Cache tags**: Grouper les pages par catégorie pour invalidation ciblée
3. **Parallel Data Fetching**: Optimiser les Promise.all() 
4. **Edge Runtime**: Utiliser `export const runtime = 'edge'` pour encore plus de performances
5. **Partial Prerendering**: Activer PPR dans Next.js 14+ pour mix static/dynamic
