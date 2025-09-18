"use client"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import React, { useState, useContext } from "react"
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import * as zod from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Loader2 } from "lucide-react"
import Link from "next/link"
import { signIn } from "next-auth/react"
import { getUserToken } from "@/GetUserToken"
import { getCartData } from "@/CartActions/CartActions"
import { CountContext, CountContextType } from "@/CountProvider"
import { CartData } from "@/type/cartData.type"

export default function Login() {
  const navg = useRouter()
  const context = useContext<CountContextType | null>(CountContext)
  const setCount = context?.setCount // ✅ optional chaining عشان ما يطلعش error
  const [loading, setLoading] = useState(false)

  const SchemaLogin = zod.object({
    email: zod.string().nonempty("Email is required").regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Invalid email format"),
    password: zod.string().nonempty("Password is required").regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character"),
  })

  const LogForm = useForm({
    defaultValues: { email: "", password: "" },
    resolver: zodResolver(SchemaLogin),
  })

  async function handleLogin(values: zod.infer<typeof SchemaLogin>) {
    try {
      setLoading(true)
      const data = await signIn("credentials", { email: values.email, password: values.password, redirect: false })
      if (!data?.error) {
        toast.success("Logined !", { position: "top-center", duration: 4000 })
        const token = await getUserToken()
        if (token && setCount) {
          const cartData: CartData = await getCartData()
          const sum = cartData.data.products.reduce((total, item) => total + item.count, 0)
          setCount(sum)
        }
        navg.push("/")
      } else {
        toast.error("Invalid Email or Password", { position: "top-center", duration: 4000 })
      }
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : "Something went wrong!"
      toast.error(errorMsg, { position: "top-center" })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#605707] via-gray-900 to-black p-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="w-full max-w-lg backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-3xl p-10"
      >
        <h2 className="text-3xl font-bold text-center mb-8 text-white drop-shadow-lg">
          Welcome <span style={{ color: "#e1d9a3" }}>Back</span>
        </h2>

        <Form {...LogForm}>
          <form onSubmit={LogForm.handleSubmit(handleLogin)} className="space-y-6">
            {/* Email */}
            <FormField
              control={LogForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold text-gray-200">Your Email:</FormLabel>
                  <FormControl>
                    <Input
                      className="rounded-xl bg-white/20 text-white placeholder-gray-300 border-white/30 focus:border-[#e1d9a3] focus:ring-[#e1d9a3]"
                      type="email"
                      placeholder="example@mail.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />

            {/* Password */}
            <FormField
              control={LogForm.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold text-gray-200">Your Password:</FormLabel>
                  <FormControl>
                    <Input
                      className="rounded-xl bg-white/20 text-white placeholder-gray-300 border-white/30 focus:border-[#e1d9a3] focus:ring-[#e1d9a3]"
                      type="password"
                      placeholder="********"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />

            {/* Forget Password Link */}
            <div className="text-right">
              <Link href="/ForgetPass" className="text-sm text-[#e1d9a3] hover:underline">
                Forget Password?
              </Link>
            </div>

            {/* Submit Button with Loading */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl font-semibold shadow-xl flex items-center justify-center gap-2 transition-transform transform hover:scale-105 disabled:opacity-70"
              style={{ backgroundColor: "#605707", color: "white" }}
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin h-5 w-5" />
                  Logging In...
                </>
              ) : (
                "Login"
              )}
            </Button>
          </form>
        </Form>
      </motion.div>
    </div>
  )
}
