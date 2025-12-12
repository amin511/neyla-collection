export async function POST(request: Request) {
  try {
    const orderData = await request.json()

    const storeUrl = "https://naalas-brand.com"
    const consumerKey = "ck_2257526fafa995a7d5d7fe02c46dbe1a42de245e"
    const consumerSecret = "cs_af4a042c6bfb24c5c162360e1edecb3a3730d3c9"

    console.log("[v0] Creating order in WooCommerce:", orderData)

    const credentials = Buffer.from(`${consumerKey}:${consumerSecret}`).toString("base64")
    const cleanUrl = storeUrl.replace(/\/$/, "")
    const apiUrl = `${cleanUrl}/wp-json/wc/v3/orders`

    // Create WooCommerce order format
    const wooOrder = {
      payment_method: "cod", // Cash on delivery
      payment_method_title: "Cash on Delivery",
      set_paid: false,
      billing: {
        first_name: orderData.prenom,
        phone: orderData.telephone,
        address_1: orderData.adresse,
        city: orderData.commune,
        state: orderData.wilaya,
        country: "DZ",
      },
      shipping: {
        first_name: orderData.prenom,
        address_1: orderData.adresse,
        city: orderData.commune,
        state: orderData.wilaya,
        country: "DZ",
      },
      line_items: [
        {
          product_id: orderData.product_id,
          quantity: orderData.quantity,
        },
      ],
      shipping_lines: [
        {
          method_id: "flat_rate",
          method_title: "Livraison",
          total: "0",
        },
      ],
    }

    console.log("[v0] Sending order to WooCommerce API:", apiUrl)

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        Authorization: `Basic ${credentials}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(wooOrder),
    })

    console.log("[v0] WooCommerce order API response status:", response.status)

    if (!response.ok) {
      const errorText = await response.text()
      console.error("[v0] WooCommerce order API error:", response.status, errorText)
      throw new Error(`WooCommerce API returned ${response.status}: ${errorText}`)
    }

    const createdOrder = await response.json()
    console.log("[v0] Order created successfully:", createdOrder.id)

    return Response.json({
      success: true,
      order_id: createdOrder.id,
      order_number: createdOrder.number,
    })
  } catch (error) {
    console.error("[v0] Order creation error:", error instanceof Error ? error.message : error)
    return Response.json(
      {
        error: "Failed to create order in WooCommerce",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}
