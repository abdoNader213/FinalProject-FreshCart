'use client'

import { createContext, useEffect, useState, ReactNode } from "react"
import { getUserToken } from "@/GetUserToken"
import { getOrderUser } from "@/OrderAction/OrderAction"

// 🟢 هنا نحدد نوع كل طلب
export interface OrderItem {
  _id: string
  products: {
    productId: string
    name: string
    price: number
    count: number
    image?: string
  }[]
  totalPrice: number
  status: string
  createdAt: string
}

interface OrderContextType {
  order: OrderItem[]
  setOrder: React.Dispatch<React.SetStateAction<OrderItem[]>>
  loading: boolean
}

export const OrderContext = createContext<OrderContextType | null>(null)

export default function OrderProvider({ children }: { children: ReactNode }) {
  const [order, setOrder] = useState<OrderItem[]>([])
  const [loading, setLoading] = useState(true)

  async function GetOrder() {
    try {
      const token = await getUserToken()

      if (!token) {
        console.error("❌ No token found, user not logged in")
        setOrder([])
        return
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/orders`, {
        headers: { token },
        cache: "no-store",
      })

      const data: { data: OrderItem[] } = await res.json()
      console.log("✅ Orders Data:", data)

      if (res.ok) {
        setOrder(data?.data || [])
      } else {
        console.error("❌ API error:", data)
        setOrder([])
      }
    } catch (error: unknown) {
      const errMsg = error instanceof Error ? error.message : "Something went wrong!"
      console.error("❌ Error fetching orders:", errMsg)
      setOrder([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    GetOrder()
  }, [])

  return (
    <OrderContext.Provider value={{ order, setOrder, loading }}>
      {children}
    </OrderContext.Provider>
  )
}
