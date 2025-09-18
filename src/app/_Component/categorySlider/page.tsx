'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

interface Category {
  _id: string
  name: string
  slug: string
  category: string
  createdAt: string
  updatedAt: string
  image?: string 
}

export default function CategorySlider() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/categories`)
        const result = await res.json()
        setCategories(result.data)
      } catch (err) {
        console.error("Error fetching categories:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchCategories()
  }, [])

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ]
  }

  return (
    <div className="w-full overflow-hidden py-8 my-5">
    
      <h1 className="text-2xl font-bold mb-6 px-2 text-center">
        <span
          style={{
            color: "#605707",
            textShadow: "2px 2px 4px #605707",
          }}
        >
          C
        </span>
        ategories
      </h1>

      {loading ? (
        <div className="flex space-x-4">
          {[1, 2, 3, 4].map((_, idx) => (
            <div
              key={idx}
              className="w-40 h-40 bg-gray-200 animate-pulse rounded-lg flex-shrink-0"
            ></div>
          ))}
        </div>
      ) : (
        <Slider {...settings}>
          {categories.map((cat) => (
            <div
              key={cat._id}
              className="relative w-full h-40 group cursor-pointer px-2"
            >
              <div className="w-full h-full overflow-hidden rounded-lg shadow-md transition-transform duration-300 group-hover:shadow-xl group-hover:-translate-y-1">
                <Image
                  src={cat.image || '/placeholder.png'}
                  alt={cat.name || "Category"}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105 rounded-lg"
                  priority
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = '/placeholder.png'
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg"></div>
                <div className="absolute bottom-2 left-2 font-semibold text-lg flex">
                  <span
                    style={{
                      color: "#605707",
                      textShadow: "1px 1px 3px #605707",
                    }}
                  >
                    {cat.name.charAt(0)}
                  </span>
                  <span className="text-white ml-0.5">
                    {cat.name.slice(1)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      )}
    </div>
  )
}
