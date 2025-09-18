'use client'

import { AddProductToCart } from "@/CartActions/CartActions"
import { Button } from "@/components/ui/button"
import { CountContext } from "@/CountProvider"
import { ShoppingCart } from "lucide-react"
import { useContext } from "react"
import { toast } from "sonner"
import { CartData, ProductElement } from "@/type/cartData.type"

export default function AddCartBtn({ id, className }: { id: string; className?: string }) {
  const context = useContext(CountContext)
  const setCount = context?.setCount

  async function addProduct(id: string) {
    try {
      const data: CartData = await AddProductToCart(id)
      if (data.data.products) {
        const sum = data.data.products.reduce(
          (total: number, item: ProductElement) => total + item.count,
          0
        )
        if (setCount) setCount(sum)
        toast.success("Product added!", { position: "top-center" })
      } else {
        toast.error("Error adding product", { position: "top-center" })
      }
    } catch (err) {
      toast.error("Network or server error", { position: "top-center" })
    }
  }

  return (
    <Button
      onClick={() => addProduct(id)}
      className={`bg-[#7c6a0f] hover:bg-[#605707] w-full rounded-3xl cursor-pointer 
                 text-white font-semibold flex items-center gap-2 
                 transition-all duration-300 shadow-md hover:shadow-lg ${className || ""}`}
    >
      <ShoppingCart size={18} />
      Add To Cart
    </Button>
  )
}
