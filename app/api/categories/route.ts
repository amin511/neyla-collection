export async function GET() {
  try {
    const storeUrl = "https://naalas-brand.com"
    const consumerKey = "ck_2257526fafa995a7d5d7fe02c46dbe1a42de245e"
    const consumerSecret = "cs_af4a042c6bfb24c5c162360e1edecb3a3730d3c9"

    const credentials = Buffer.from(`${consumerKey}:${consumerSecret}`).toString("base64")

    const cleanUrl = storeUrl.replace(/\/$/, "")
    const apiUrl = `${cleanUrl}/wp-json/wc/v3/products/categories?per_page=100&hide_empty=true`

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

    // Transform categories data
    const transformedCategories = (categories || []).map((category: any) => ({
      id: category.id,
      name: category.name,
      slug: category.slug,
      parent: category.parent,
      count: category.count,
    }))

    return Response.json(transformedCategories)
  } catch (error) {
    console.error("[v0] Error fetching categories:", error)
    return Response.json({ error: "Failed to fetch categories" }, { status: 500 })
  }
}

