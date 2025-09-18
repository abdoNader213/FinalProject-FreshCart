'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Slider from 'react-slick'
import Link from 'next/link'

type Brand = {
  _id: string
  name: string
  image: string
}

export default function Brands() {
  const [data, setData] = useState<Brand[]>([])

  // تغيير التايتل
  useEffect(() => {
    document.title = "Brands"
  }, [])

  useEffect(() => {
    async function getData() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/brands`)
        const json = await res.json()
        setData(json.data || [])
      } catch (error: unknown) {
        console.error("Error fetching brands:", error)
      }
    }
    getData()
  }, [])

  const settings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024, // تابلت
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 640, // موبايل
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  }

  return (
    <div className="w-full py-10 overflow-hidden">
      {/* العنوان */}
      <h2 className="text-2xl font-bold mb-6 text-center">
        <span
          className="drop-shadow-md"
          style={{ color: '#605707' }}
        >
          B
        </span>
        rands
      </h2>

      {/* السلايدر */}
      <div className="overflow-hidden">
        <Slider {...settings}>
          {data.map((slide, index) => (
            <div key={index} className="px-2">
              <Link href={`/Brands/${slide._id}`} passHref>
                <div className="relative group h-[220px] rounded-2xl overflow-hidden shadow-lg cursor-pointer">
                  <Image
                    src={slide.image}
                    alt={slide.name}
                    fill
                    priority
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white font-semibold text-lg drop-shadow-md">
                    {slide.name}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  )
}
