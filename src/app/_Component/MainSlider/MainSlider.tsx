'use client'
import Image from "next/image"
import React from "react"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

export default function SimpleSlider() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  }

  return (
    <div className="grid grid-cols-12 gap-4 m-5">
     
      <div className="col-span-12 md:col-span-10">
        <Slider {...settings}>
          {["/slider-image-3.jpeg", "/slider-2.jpeg", "/slider-image-1.jpeg"].map((src, idx) => (
            <div key={idx}>
              <Image
                src={src}
                alt={`slider-${idx}`}
                width={1000}
                height={1000}
                className="w-full h-96 object-cover rounded-lg border"
                style={{
                  borderColor: "#605707",
                  boxShadow: "0 6px 20px rgba(96, 87, 7, 0.5)",
                }}
              />
            </div>
          ))}
        </Slider>
      </div>

     
      <div className="col-span-12 md:col-span-2 flex flex-col gap-4">
        {["/blog-img-1.jpeg", "/blog-img-2.jpeg"].map((src, idx) => (
          <Image
            key={idx}
            src={src}
            alt={`Ad ${idx + 1}`}
            width={400}
            height={200}
            className="w-full h-45 object-cover rounded-lg border"
            style={{
              borderColor: "#605707",
              boxShadow: "0 4px 15px rgba(96, 87, 7, 0.4)", 
            }}
          />
        ))}
      </div>
    </div>
  )
}
