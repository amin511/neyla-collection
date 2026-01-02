import { getWooCredentials, wooConfig, navigationConfig } from "@/lib/config"

// ISR: Revalidate every 10 minutes
export const revalidate = 600

export async function GET() {
  try {
    const { storeUrl, authHeader } = getWooCredentials()

    // Fetch all categories (including empty ones) to ensure new categories show up
    const apiUrl = `${storeUrl}/wp-json/wc/v3/products/categories?per_page=${wooConfig.categories.perPage}`

    const response = await fetch(apiUrl, {
      headers: {
        Authorization: authHeader,
        "Content-Type": "application/json",
      },
      next: { revalidate: 600 }
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("[v0] WooCommerce Categories API error:", response.status, errorText)
      throw new Error(`WooCommerce API returned ${response.status}: ${errorText}`)
    }

    const categories = await response.json()

    // Use category order and excluded categories from navigation config
    const categoryOrder = navigationConfig.categoryOrder
    const excludedCategories = navigationConfig.excludedCategories

    // Transform categories data and filter out excluded categories
    const transformedCategories = (categories || [])
      .filter((category: any) =>
        !excludedCategories.includes(category.slug) &&
        !excludedCategories.includes(category.name.toLowerCase())
      )
      .map((category: any) => ({
        id: category.id,
        name: category.name,
        slug: category.slug,
        parent: category.parent,
        count: category.count,
      }))

    // Separate parent and child categories
    const parentCategories = transformedCategories.filter((cat: any) => cat.parent === 0)
    const childCategories = transformedCategories.filter((cat: any) => cat.parent !== 0)

    // Sort parent categories by the defined order
    parentCategories.sort((a: any, b: any) => {
      const aSlug = a.slug.toLowerCase().trim()
      const bSlug = b.slug.toLowerCase().trim()
      const aIndex = categoryOrder.findIndex(slug => aSlug.includes(slug) || slug.includes(aSlug))
      const bIndex = categoryOrder.findIndex(slug => bSlug.includes(slug) || slug.includes(bSlug))

      // If both are in the order list, sort by order
      if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex
      // If only a is in the list, a comes first
      if (aIndex !== -1) return -1
      // If only b is in the list, b comes first
      if (bIndex !== -1) return 1
      // Otherwise sort alphabetically
      return a.name.localeCompare(b.name)
    })

    // Combine sorted parents with children
    const sortedCategories = [...parentCategories, ...childCategories]

    return Response.json(sortedCategories)
  } catch (error) {
    console.error("[v0] Error fetching categories:", error)
    return Response.json({ error: "Failed to fetch categories" }, { status: 500 })
  }
}

