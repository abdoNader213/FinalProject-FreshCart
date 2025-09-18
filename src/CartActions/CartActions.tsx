"use server"

import { getUserToken } from "@/GetUserToken"
import { CartData } from "@/type/cartData.type"

export async function getCartData() {
  const token = await getUserToken()

  if (!token) {
    throw new Error("Not authenticated: No token found")
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cart`,
    {
      headers: {
        token: token, 
      },
      cache: "no-store", 
    }
  )

  if (!res.ok) {
    throw new Error("Failed to fetch cart data")
  }

  const data: CartData = await res.json()
  return data
}

export async function AddProductToCart(id:string) {
  const token = await getUserToken()

  if (!token) {
    throw new Error("Not authenticated: No token found")
  }
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cart`,
    {
      method:"post",
      body:JSON.stringify({
        productId:id
      }),
      headers: {
        token: token,
        'content-type':"application/json" 
      }, 
    }
  )

  if (!res.ok) {
    throw new Error("Failed to fetch cart data")
  }

  const data = await res.json()
  return data
}











export async function RemoveProduct(id:string) {
  const token = await getUserToken()

  if (!token) {
    throw new Error("Not authenticated: No token found")
  }
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cart/${id}`,
    {
      method:"delete",
      headers: {
        token: token,
         
      }, 
    }
  )

  if (!res.ok) {
    throw new Error("Failed to fetch cart data")
  }

  const data = await res.json()
  return data
}



export async function ClearCart() {
  const token = await getUserToken()

  if (!token) {
    throw new Error("Not authenticated: No token found")
  }
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cart`,
    {
      method:"delete",
      headers: {
        token: token,
         
      }, 
    }
  )

  if (!res.ok) {
    throw new Error("Failed to fetch cart data")
  }

  const data = await res.json()
  return data
}





export async function  UpdataProductQuntity (id:string,count:number) {
  const token = await getUserToken()

  if (!token) {
    throw new Error("Not authenticated: No token found")
  }
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cart/${id}`,
    {
      method:"put",
      body:JSON.stringify({
        count:count
      }),
      headers: {
        token: token,
         'content-type':"application/json" 
      }, 
    }
  )

  if (!res.ok) {
    throw new Error("Failed to fetch cart data")
  }

  const data = await res.json()
  return data
}


