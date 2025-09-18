'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import { motion } from 'framer-motion'

type Brand = {
  _id: string
  name: string
  image: string
  description?: string
}

export default function BrandDetails() {
  const params = useParams()
  const id = params?.id as string

  const [brand, setBrand] = useState<Brand | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function getData() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/brands/${id}`)
        const json = await res.json()
        setBrand(json.data || null)
      } catch (error) {
        console.error('Error fetching brand details:', error)
      } finally {
        setLoading(false)
      }
    }
    if (id) getData()
  }, [id])

  // تغيير التايتل بناءً على اسم البراند
  useEffect(() => {
    if (brand?.name) {
      document.title = `${brand.name} | Brand Details`
    } else {
      document.title = "Brand Details"
    }
  }, [brand])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="w-16 h-16 border-4 border-[#605707] border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  if (!brand) {
    return (
      <div className="flex justify-center items-center min-h-[60vh] text-white text-xl">
        Brand not found
      </div>
    )
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-black via-gray-900 to-black py-20 px-6">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-[#605707]/40"
      >
        <div className="relative w-full h-72 md:h-96 mb-8 rounded-2xl overflow-hidden">
          <Image
            src={brand.image || '/placeholder.png'}
            alt={brand.name || 'brand'}
            fill
            className="object-cover"
          />
        </div>

        <h1 className="text-4xl font-extrabold mb-4 text-center">
          <span className="text-[#605707] drop-shadow-md">
            {brand.name?.charAt(0)}
          </span>
          {brand.name?.slice(1)}
        </h1>

        <p className="text-gray-300 text-lg leading-relaxed text-center">
          {brand.description || 'No description available for this brand.'}
        </p>

        <div className="mt-10 flex justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 rounded-xl bg-[#605707] text-white font-semibold shadow-lg hover:shadow-[#605707]/50 transition-all"
          >
            Explore Products
          </motion.button>
        </div>
      </motion.div>
    </div>
  )
}
