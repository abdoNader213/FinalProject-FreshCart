import { Data } from '@/type/productDet'
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import ProductSlider from '../ProductSlider/ProductSlider'
import AddCartBtn from '../productCard/AddCardBtn'
import { FaStar } from "react-icons/fa"

export default function ProductDetCard({ product }: { product: Data }) {
  const { _id, title, ratingsAverage, price, category: { name }, description, images } = product

  const formattedPrice = new Intl.NumberFormat("en-US").format(price)

  return (
    <div className="flex justify-center px-4 py-6">
      <Card className="group flex flex-col md:flex-row max-w-3xl w-full p-4 md:p-6 rounded-xl border border-gray-200 bg-white shadow-lg hover:shadow-[0_4px_12px_#605707] transition-shadow duration-300">
        
        <div className="relative w-full md:w-1/2 aspect-video md:aspect-[3/4] mb-4 md:mb-0 md:mr-6">
          <ProductSlider images={images} />
        </div>

        
        <div className="w-full md:w-1/2 flex flex-col justify-between">
          <div>
            <CardHeader className="p-0 mb-4">
              <div className="flex justify-between items-start">
               
                <CardTitle className="text-xl font-bold leading-snug text-gray-900">
                  {title}
                </CardTitle>

             
                <div className="flex items-center ml-3">
                  <FaStar 
                    className="text-gray-400 group-hover:text-yellow-500 transition-colors duration-300" 
                  />
                  <span className="ml-1 text-sm text-gray-700">{ratingsAverage}</span>
                </div>
              </div>

              <p 
                className="text-xs font-medium mt-1" 
                style={{ color: "#605707" }}
              >
                {name}
              </p>
            </CardHeader>

            <Separator className="mb-3" />

           
            <CardContent className="p-0 text-sm text-gray-700 leading-relaxed">
              <p>{description}</p>
            </CardContent>
          </div>

          
          <div className="mt-5 pt-3 border-t flex items-center justify-between gap-4">
          
            <div className="text-xl font-extrabold flex items-center gap-1 text-black">
              <span>{formattedPrice}</span>
              <span style={{ color: "#605707", textShadow: "2px 2px 4px #605707" }}>E</span>
              <span className="text-black">GP</span>
            </div>

            
            <div>
              <AddCartBtn id={_id} className="px-4 py-2 text-sm sm:text-base" />
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
