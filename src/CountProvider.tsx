'use client'

import { createContext, useState, useEffect, ReactNode } from "react"
import { getCartData } from "@/CartActions/CartActions"
import { CartData, ProductElement } from "@/type/cartData.type"

export interface CountContextType {
  count: number
  setCount: React.Dispatch<React.SetStateAction<number>>
}

export const CountContext = createContext<CountContextType | null>(null)

export default function CountProvider({ children }: { children: ReactNode }) {
  const [count, setCount] = useState<number>(0)

  async function getCart() {
    try {
      const data: CartData = await getCartData()
      const sum = data.data.products.reduce(
        (total: number, item: ProductElement) => total + item.count,
        0
      )
      setCount(sum)
    } catch (err) {
      console.error("Error fetching cart:", err)
      setCount(0)
    }
  }

  useEffect(() => {
    getCart()
  }, [])

  return (
    <CountContext.Provider value={{ count, setCount }}>
      {children}
    </CountContext.Provider>
  )
}
