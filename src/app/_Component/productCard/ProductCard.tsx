import React from "react"
import { product } from "@/type/Product.type"
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import Image from "next/image"
import { Star } from "lucide-react"
import Link from "next/link"
import AddCartBtn from "./AddCardBtn"

export default function ProductCard({ product }: { product: product }) {
  const { _id, imageCover, title, ratingsAverage, price, category: { name } } = product

  const formattedPrice = new Intl.NumberFormat("en-US").format(price)

  return (
    <Card
      className="w-full flex flex-col justify-between rounded-2xl transition-all duration-300 overflow-hidden hover:scale-105 group"
      style={{
        boxShadow: "0 4px 12px #60570755",
      }}
    >
      <Link href={`/product/${_id}`} className="block">
        <div className="relative w-full h-40">
          <Image
            src={imageCover}
            alt={title}
            fill
            className="object-contain bg-gray-50"
          />
        </div>

        <CardContent className="p-4 flex-1">
        
          <p
            className="text-xs font-medium"
            style={{ color: "#605707" }}
          >
            {name}
          </p>

          <h2 className="text-sm font-semibold text-gray-800 line-clamp-2">
            {title.split(" ").slice(0, 2).join(" ")}
          </h2>
        </CardContent>
      </Link>

      <CardFooter className="px-4 pb-2 flex items-center justify-between">
        {/* السعر */}
        <span className="text-lg font-bold flex items-center gap-1">
          {formattedPrice}{" "}
          <span>
            <span
              style={{
                color: "#605707",
                textShadow: "2px 2px 4px #605707",
              }}
            >
              E
            </span>
            GP
          </span>
        </span>

        
        <div className="flex items-center gap-1">
          <Star
            size={18}
            stroke="#FFD700"
            className="text-yellow-500 transition-all duration-3000 group-hover:fill-yellow-500"
          />
          <span className="text-sm font-semibold text-yellow-600">
            {ratingsAverage ? ratingsAverage.toFixed(1) : "0.0"}
          </span>
        </div>
      </CardFooter>

      <div className="px-4 pb-4">
        <AddCartBtn id={_id} />
      </div>
    </Card>
  )
}
