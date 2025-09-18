import { Data } from '@/type/productDet'
import React from 'react'
import { product } from '@/type/Product.type';
import ProductDetCard from '@/app/_Component/ProductDetCard/ProductDetCard';

export default async function productDet({params}:{params:{id:string}}) {
    const {id} = params
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/products/${id}`)
    const data:Data = await res.json()
    const product:Data = data.data

  return (
    <div>
       <ProductDetCard product={product}/>
    </div>
  )
}
