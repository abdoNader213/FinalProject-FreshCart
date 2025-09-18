"use server"

import { getCartData } from "@/CartActions/CartActions";
import { getUserToken } from "@/GetUserToken";

interface CheckoutResponse {
  session?: { url: string };
  [key: string]: unknown;
}

interface OrderUserResponse {
  data?: unknown;
  [key: string]: unknown;
}

export async function CheckoutPaymenet(
  cartId: string,
  shippingData: { details: string; phone: string; city: string }
): Promise<CheckoutResponse | undefined> {
  const token = await getUserToken()
  if (token) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/orders/checkout-session/${cartId}?url=${process.env.NEXT_URL}`,
      {
        method: "POST",
        body: JSON.stringify({
          shippingAddress: shippingData,
        }),
        headers: {
          token,
          "Content-Type": "application/json",
        },
      }
    )

    if (!res.ok) {
      throw new Error("Failed to fetch cart data")
    }

    const data: CheckoutResponse = await res.json()
    return data
  }
}

export async function getOrderUser(cartId: string): Promise<OrderUserResponse> {
  const token = await getUserToken()

  console.log("🟢 TOKEN:", token)
  console.log("🟢 CART OWNER:", cartId)

  if (!token) {
    throw new Error("No token found")
  }

  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/orders/user/${cartId}`

  const res = await fetch(url, {
    method: "GET",
    headers: { token },
    cache: "no-store",
  })

  let data: OrderUserResponse = {}
  try {
    data = await res.json()
  } catch (err) {
    console.error("❌ Failed to parse JSON:", err)
  }

  if (!res.ok) {
    console.error("❌ API Error Response:", data)
    throw new Error(`Failed to fetch user orders: ${res.status} ${res.statusText}`)
  }

  console.log("✅ Orders Data:", data)
  return data
}
