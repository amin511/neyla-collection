export async function GET() {
  try {
    const storeUrl = "https://naalas-brand.com"
    const consumerKey = "ck_2257526fafa995a7d5d7fe02c46dbe1a42de245e"
    const consumerSecret = "cs_af4a042c6bfb24c5c162360e1edecb3a3730d3c9"

    const credentials = Buffer.from(`${consumerKey}:${consumerSecret}`).toString("base64")

    const cleanUrl = storeUrl.replace(/\/$/, "")
    // Fetch all categories (including empty ones) to ensure new categories show up
    const apiUrl = `${cleanUrl}/wp-json/wc/v3/products/categories?per_page=100`

    const response = await fetch(apiUrl, {
      headers: {
        Authorization: `Basic ${credentials}`,
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("[v0] WooCommerce Categories API error:", response.status, errorText)
      throw new Error(`WooCommerce API returned ${response.status}: ${errorText}`)
    }

    const categories = await response.json()

    // Define the desired order for parent categories
    const categoryOrder = [
      "collection",
      "caftans", 
      "ensembles-abayas",
      "accessoires"
    ]

    // Transform categories data and filter out "Uncategorized"
    const transformedCategories = (categories || [])
      .filter((category: any) => 
        category.slug !== "uncategorized" && 
        category.slug !== "non-classe" &&
        category.name.toLowerCase() !== "uncategorized"
      )
      .map((category: any) => ({
        id: category.id,
        name: category.name,
        slug: category.slug,
        parent: category.parent,
        count: category.count,
      }))
      .sort((a: any, b: any) => {
        // Sort parent categories by defined order
        if (a.parent === 0 && b.parent === 0) {
          const aIndex = categoryOrder.indexOf(a.slug.toLowerCase())
          const bIndex = categoryOrder.indexOf(b.slug.toLowerCase())
          // If both are in the order list, sort by order
          if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex
          // If only a is in the list, a comes first
          if (aIndex !== -1) return -1
          // If only b is in the list, b comes first
          if (bIndex !== -1) return 1
          // Otherwise sort alphabetically
          return a.name.localeCompare(b.name)
        }
        return 0
      })

    return Response.json(transformedCategories)
  } catch (error) {
    console.error("[v0] Error fetching categories:", error)
    return Response.json({ error: "Failed to fetch categories" }, { status: 500 })
  }
}

