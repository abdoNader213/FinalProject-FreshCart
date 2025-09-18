'use client'

import { ClearCart, getCartData, RemoveProduct, UpdataProductQuntity } from '@/CartActions/CartActions'
import { Button } from '@/components/ui/button'
import { CountContext } from '@/CountProvider'
import { CartData, ProductElement } from '@/type/cartData.type'
import Image from 'next/image'
import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'sonner'
import { FaTrash } from 'react-icons/fa'
import { motion } from 'framer-motion'
import Loading from './../../_Component/Loading/Loading'
import Head from 'next/head'

export default function Cart() {
  const context = useContext(CountContext)
  const setCount = context?.setCount

  const [cart, setCart] = useState<CartData['data']>()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getAllCartData()
  }, [])

  async function getAllCartData() {
    try {
      const data: CartData = await getCartData()
      setCart(data.data)
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : 'Error fetching cart'
      setError(errMsg)
    } finally {
      setLoading(false)
    }
  }

  async function updateProductCount(id: string, count: number) {
    const data = await UpdataProductQuntity(id, count)
    if (data.status === 'success') {
      setCart(data.data)
      const sum = data.data.products.reduce((total: number, item: ProductElement) => total + item.count, 0)
      if (setCount) setCount(sum)
    }
  }

  async function deleteProduct(id: string) {
    const data = await RemoveProduct(id)
    if (data.status === 'success') {
      toast.success("Product Deleted", { position: "top-center" })
      setCart(data.data)
      const sum = data.data.products.reduce((total: number, item: ProductElement) => total + item.count, 0)
      if (setCount) setCount(sum)
    }
  }

  async function clearCartData() {
    const data = await ClearCart()
    if (data.message === 'success') {
      if (setCount) setCount(0)
      getAllCartData()
    }
  }

  if (loading) return <Loading/>
  if (error) return <div className="text-red-500">{error}</div>

  return (
    <>
      <Head>
        <title>Shopping Cart</title>
      </Head>
      <div className="px-4 md:px-8 py-6 min-h-screen">
        {!cart || cart.products.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center p-8 my-10 bg-yellow-50 rounded-xl shadow-md border border-yellow-200"
          >
            <svg
              className="w-24 h-24 mb-4 text-[#605707] animate-bounce"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7a1 1 0 00.9 1.5h12.1a1 1 0 00.9-1.5L17 13M7 13V6h10v7M17 17a2 2 0 11-4 0 2 2 0 014 0zm-8 0a2 2 0 114 0 2 2 0 01-4 0z"></path>
            </svg>

            <h2 className="text-3xl font-bold text-[#605707] mb-2 text-center">Your Cart is Empty!</h2>
            <p className="text-gray-600 mb-4 text-center">Looks like you haven&apos;t added any products yet.</p>

            <motion.div whileHover={{ scale: 1.02, boxShadow: '0px 6px 12px rgba(0,0,0,0.2)' }} transition={{ duration: 0.2 }}>
              <Button className="bg-[#605707] text-white px-4 py-2 rounded-md shadow-md hover:bg-yellow-800 transition-all duration-200">
                <Link href="/">Go Shopping</Link>
              </Button>
            </motion.div>
          </motion.div>
        ) : (
          <>
            <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center mb-6 gap-4">
              <h1 className="text-3xl font-bold mb-2 sm:mb-0">
                <span className="text-[#605707] drop-shadow-md">S</span>hop Cart
              </h1>
              <div className="text-lg font-bold text-black sm:text-right transition-transform duration-200 hover:scale-102">
                Total Price: 
                <span className="text-[#605707] ml-1 drop-shadow-md transition-transform duration-200 hover:scale-102">
                  {cart.totalCartPrice} GP
                </span>
              </div>
              <Button
                onClick={clearCartData}
                className="ml-0 sm:ml-4 mt-2 sm:mt-0 bg-red-600 text-white hover:bg-red-700 hover:scale-102 transition-transform duration-200 px-4 py-2 rounded-md shadow-md"
              >
                Clear Cart
              </Button>
            </div>

            <div className="shadow-lg sm:rounded-lg my-5 overflow-hidden">
              <table className="w-full text-sm text-left text-gray-700 table-fixed">
                <thead className="text-xs uppercase bg-gray-50">
                  <tr>
                    <th scope="col" className="px-4 py-3"><span className="sr-only">Image</span></th>
                    <th scope="col" className="px-4 py-3">
                      <span className="text-[#605707]">P</span>roduct
                    </th>
                    <th scope="col" className="px-4 py-3">
                      <span className="text-[#605707]">Q</span>ty
                    </th>
                    <th scope="col" className="px-4 py-3">
                      <span className="text-[#605707]">P</span>rice
                    </th>
                    <th scope="col" className="px-4 py-3">
                      <span className="text-[#605707]">A</span>ction
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {cart.products.map((item, index) => (
                    <motion.tr
                      key={item._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                      className="bg-white border-b hover:bg-gray-50 hover:shadow-md transition-shadow transform hover:scale-[1.01]"
                    >
                      <td className="p-2">
                        <div className="overflow-hidden rounded">
                          <motion.div whileHover={{ scale: 1.05, rotate: 1 }} transition={{ duration: 0.2 }}>
                            <Image
                              src={item.product.imageCover}
                              width={80}
                              height={80}
                              className="w-16 md:w-20 max-w-full max-h-full rounded transition-transform duration-200"
                              alt={item.product.title}
                            />
                          </motion.div>
                        </div>
                      </td>
                      <td className="px-4 py-2 font-semibold text-gray-900">{item.product.title}</td>
                      <td className="px-4 py-2">
                        <div className="flex items-center">
                          <Button
                            onClick={() => updateProductCount(item.product._id, item.count - 1)}
                            className="inline-flex items-center justify-center p-1 me-2 text-sm font-medium h-5 w-5 text-gray-500 bg-white border border-gray-300 rounded-full hover:bg-gray-100 transition"
                            type="button"
                          >
                            <span className="text-[#605707] font-bold">-</span>
                          </Button>
                          <input
                            type="number"
                            value={item.count}
                            readOnly
                            className="bg-gray-50 w-12 border border-gray-300 text-black text-sm rounded px-1 py-1 text-center"
                          />
                          <Button
                            onClick={() => updateProductCount(item.product._id, item.count + 1)}
                            className="inline-flex items-center justify-center h-5 w-5 p-1 ms-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full hover:bg-gray-100 transition"
                            type="button"
                          >
                            <span className="text-[#605707] font-bold">+</span>
                          </Button>
                        </div>
                      </td>
                      <td className="px-4 py-2 font-semibold text-black transition-transform duration-200 hover:scale-102 hover:text-[#605707]">
                        {item.price} GP
                      </td>
                      <td className="px-4 py-2">
                        <Button
                          onClick={() => deleteProduct(item.product._id)}
                          className="text-red-600 hover:text-red-800 transition text-base"
                        >
                          <FaTrash />
                        </Button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Checkout Button */}
            <motion.div whileHover={{ scale: 1.02, boxShadow: '0px 6px 12px rgba(0,0,0,0.2)' }} transition={{ duration: 0.2 }}>
              <Button className="text-center w-full mt-4 bg-black text-white hover:bg-gray-800 hover:scale-102 hover:shadow-md transition-transform px-4 py-2 rounded-md text-sm sm:text-base shadow-sm">
                <Link href={'/CheckOutSession/' + cart._id}>Checkout Session</Link>
              </Button>
            </motion.div>
          </>
        )}
      </div>
    </>
  )
}
