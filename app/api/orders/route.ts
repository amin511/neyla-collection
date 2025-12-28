import { getWooCredentials, wooConfig } from "@/lib/config"

export async function POST(request: Request) {
  try {
    const orderData = await request.json()

    const { storeUrl, authHeader } = getWooCredentials()

    console.log("[v0] Creating order in WooCommerce:", orderData)

    const apiUrl = `${storeUrl}/wp-json/wc/v3/orders`

    // Create WooCommerce order format using config
    const { orders } = wooConfig
    const wooOrder = {
      payment_method: orders.paymentMethod,
      payment_method_title: orders.paymentMethodTitle,
      set_paid: false,
      billing: {
        first_name: orderData.prenom,
        phone: orderData.telephone,
        address_1: orderData.adresse,
        city: orderData.commune,
        state: orderData.wilaya,
        country: orders.defaultCountry,
      },
      shipping: {
        first_name: orderData.prenom,
        address_1: orderData.adresse,
        city: orderData.commune,
        state: orderData.wilaya,
        country: orders.defaultCountry,
      },
      line_items: [
        {
          product_id: orderData.product_id,
          quantity: orderData.quantity,
        },
      ],
      shipping_lines: [
        {
          method_id: orders.shippingMethod,
          method_title: orders.shippingTitle,
          total: "0",
        },
      ],
    }

    console.log("[v0] Sending order to WooCommerce API:", apiUrl)

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        Authorization: authHeader,
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
