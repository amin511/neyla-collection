export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const per_page = searchParams.get("per_page") || "8"
    const page = searchParams.get("page") || "1"

    const storeUrl = "https://naalas-brand.com"
    const consumerKey = "ck_2257526fafa995a7d5d7fe02c46dbe1a42de245e"
    const consumerSecret = "cs_af4a042c6bfb24c5c162360e1edecb3a3730d3c9"

    console.log("[v0] Using WooCommerce store:", storeUrl)

    const credentials = Buffer.from(`${consumerKey}:${consumerSecret}`).toString("base64")

    // Ensure store URL doesn't have trailing slash, then add proper path
    const cleanUrl = storeUrl.replace(/\/$/, "")
    const apiUrl = `${cleanUrl}/wp-json/wc/v3/products?per_page=${per_page}&page=${page}`

    console.log("[v0] Fetching from:", apiUrl)

    const response = await fetch(apiUrl, {
      headers: {
        Authorization: `Basic ${credentials}`,
        "Content-Type": "application/json",
      },
    })

    console.log("[v0] WooCommerce API response status:", response.status)

    if (!response.ok) {
      const errorText = await response.text()
      console.error("[v0] WooCommerce API error:", response.status, errorText)
      throw new Error(`WooCommerce API returned ${response.status}: ${errorText}`)
    }

    const products = await response.json()

    console.log("[v0] Successfully fetched products count:", products.length)

    // Transform WooCommerce data to match our component expectations
    const transformedProducts = (products || []).map((product: any) => ({
      id: product.id,
      name: product.name,
      price: product.price,
      regular_price: product.regular_price,
      description: product.description,
      images: product.images || [],
      stock_status: product.stock_status || "instock",
      stock_quantity: product.stock_quantity,
      sku: product.sku,
      permalink: product.permalink,
    }))

    return Response.json(transformedProducts)
  } catch (error) {
    console.error("[v0] Products API error:", error instanceof Error ? error.message : error)
    return Response.json(
      {
        error: "Failed to fetch products from WooCommerce",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}
