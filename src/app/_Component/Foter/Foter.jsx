'use client'

import React from "react"
import { FaGooglePlay, FaApple, FaCcPaypal, FaCcMastercard, FaCcVisa } from "react-icons/fa"

export default function Footer() {
  return (
    <footer className="bg-gray-100 py-8 px-6 w-full shadow-md mt-auto">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left Side */}
          <div className="flex-1 w-full">
            <h3 className="text-lg font-semibold" style={{ color: "#605707" }}>
              Get the FreshCart app
            </h3>
            <p className="text-sm mb-3 text-gray-700">
              We will send you a link, open it on your phone to download the app.
            </p>
            <div className="flex gap-3">
              <input
                type="email"
                placeholder="Email .."
                className="flex-1 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#605707]"
              />
              <button
                className="text-white px-5 py-2 rounded-md transition-all duration-300"
                style={{ backgroundColor: "#605707" }}
              >
                Share App Link
              </button>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex flex-col items-center md:items-end gap-3">
            {/* Payment Partners */}
            <div className="flex items-center gap-4">
              <span className="font-medium" style={{ color: "#605707" }}>
                Payment Partners
              </span>
              <FaCcVisa size={40} className="text-blue-600" />
              <FaCcMastercard size={40} className="text-red-600" />
              <FaCcPaypal size={40} className="text-blue-500" />
            </div>

            {/* App Buttons */}
            <div className="flex items-center gap-3">
              <span className="font-medium" style={{ color: "#605707" }}>
                Get deliveries with FreshCart
              </span>
              <button
                className="flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-all duration-300"
                style={{ backgroundColor: "#605707", color: "white" }}
              >
                <FaApple size={20} /> App Store
              </button>
              <button
                className="flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-all duration-300"
                style={{ backgroundColor: "#605707", color: "white" }}
              >
                <FaGooglePlay size={20} /> Google Play
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

