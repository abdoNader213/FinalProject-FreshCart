'use client'

import React, { useContext } from "react"
import Link from "next/link"
import { signOut, useSession } from "next-auth/react"
import { CountContext } from "../../../CountProvider"
import { FaShoppingCart, FaUser, FaSignOutAlt } from "react-icons/fa"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

// تعريف نوع المستخدم لتجنب any
interface MyUser {
  email: string
  name: string
  role: string
}

export function Navbar() {
  const { data, status } = useSession()
  const context = useContext(CountContext)
  const count = context?.count ?? 0 // ✅ استخدام null check لتجنب الخطأ

  const MenuItems: { path: string; content: string }[] = [
    { path: "/", content: "Home" },
    //{ path: "/product", content: "Product" },
    { path: "/Brands", content: "Brands" },
  ]

  const MenuAuthItems: { path: string; content: string }[] = [
    { path: "/Login", content: "Login" },
    { path: "/register", content: "Register" },
  ]

  // فقط إذا تم تسجيل الدخول
  const user = data?.user as MyUser | undefined

  return (
    <NavigationMenu
      viewport={false}
      className="max-w-full justify-between shadow-lg p-5 bg-white sticky top-0 z-50"
    >
      <NavigationMenuItem className="list-none">
        <Link
          href="/"
          className="text-xl font-bold flex items-center gap-2 no-underline hover:text-[#605707]"
        >
          <span className="flex items-baseline">
            FRESHCAR
            <span
              style={{ color: "#605707" }}
              className="inline-block align-baseline ml-0.5"
            >
              T
            </span>
          </span>
          <FaShoppingCart style={{ color: "#605707" }} className="text-2xl" />
        </Link>
      </NavigationMenuItem>

      <NavigationMenuList>
        {MenuItems.map((item) => (
          <NavigationMenuItem key={item.path}>
            <NavigationMenuLink
              asChild
              className={`${navigationMenuTriggerStyle()} hover:text-[#605707]`}
            >
              <Link href={item.path}>{item.content}</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>

      <NavigationMenuList className="flex items-center gap-2">
        {status === "authenticated" && user ? (
          <>
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={`${navigationMenuTriggerStyle()} hover:text-[#605707]`}
              >
                <Link className="relative" href="/cart">
                  <FaShoppingCart size={20} />
                  <span
                    className="absolute -top-2 -right-2 w-5 h-5 rounded-full flex justify-center items-center text-white text-xs"
                    style={{ backgroundColor: "#605707" }}
                  >
                    {count}
                  </span>
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <div className="w-0.25"></div>

            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={`${navigationMenuTriggerStyle()} hover:text-[#605707]`}
              >
                <FaUser size={20} className="text-gray-700" />
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <button
                onClick={() => signOut({ callbackUrl: "/Login" })}
                className={`${navigationMenuTriggerStyle()} flex items-center gap-1 hover:text-[#605707]`}
              >
                <FaSignOutAlt size={18} />
                Logout
              </button>
            </NavigationMenuItem>
          </>
        ) : (
          MenuAuthItems.map((item) => (
            <NavigationMenuItem key={item.path}>
              <NavigationMenuLink
                asChild
                className={`${navigationMenuTriggerStyle()} hover:text-[#605707]`}
              >
                <Link href={item.path}>{item.content}</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))
        )}
      </NavigationMenuList>
    </NavigationMenu>
  )
}
