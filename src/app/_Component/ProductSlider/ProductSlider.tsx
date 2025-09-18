'use client'
import Image from "next/image"
import React from "react"
import Slider from "react-slick"

export default function ProductSlider({images}:{images:string[]}) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  }

  return (
    <div className="grid grid-cols-12 m-5">
      <div className="col-span-10">
        <Slider {...settings}>
          {
            images.map((img)=>{   
              return (
                <div key={img}>
                  <Image 
                    src={img}    
                    alt="img3"
                    width={1000}
                    height={1000}
                    className="w-full h-96 object-cover"
                  />
                </div>
              )
            })
          }
        </Slider>
      </div>
      <div className="col-span-2"></div>
    </div>
  )
}

