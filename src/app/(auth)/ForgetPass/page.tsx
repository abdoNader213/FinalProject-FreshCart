"use client"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import React, { useState } from "react"
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
import Head from "next/head" 

export default function ForgetPass() {
  const navg = useRouter()
  const [loading, setLoading] = useState(false)

  const SchemaForgetPass = zod.object({
    email: zod.string().nonempty("Email is required").regex(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid email format"
    ),
  })

  const ForgetForm = useForm({
    defaultValues: { email: "" },
    resolver: zodResolver(SchemaForgetPass),
  })

  async function handleForgetPass(values: zod.infer<typeof SchemaForgetPass>) {
    try {
      setLoading(true)
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/forgotPasswords`, {
        method: "POST",
        body: JSON.stringify(values),
        headers: { "Content-Type": "application/json" },
      })
      const data = await res.json()
      if (data.statusMsg == "success") {
        toast.success("Check your email for reset code", { position: "top-center", duration: 4000 })
        navg.push("/ResetCode")
      } else {
        toast.error(data.message, { position: "top-center", duration: 5000 })
      }
    } catch (err: unknown) {   // ✅ بدلنا any بـ unknown
      const message = err instanceof Error ? err.message : "Something went wrong!"
      toast.error(message, { position: "top-center" })
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
          Forgot <span style={{ color: "#e1d9a3" }}>Password?</span>
        </h2>

        <Form {...ForgetForm}>
          <form onSubmit={ForgetForm.handleSubmit(handleForgetPass)} className="space-y-6">
            {/* Email */}
            <FormField
              control={ForgetForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold text-gray-200">Your Email:</FormLabel>
                  <FormControl>
                    <Input
                      className="rounded-xl bg-white/20 text-white placeholder-gray-300 border-white/30 
                      focus:border-[#e1d9a3] focus:ring-[#e1d9a3]"
                      type="email"
                      placeholder="example@mail.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl font-semibold shadow-xl flex items-center justify-center gap-2 
              transition-transform transform hover:scale-105 disabled:opacity-70"
              style={{ backgroundColor: "#605707", color: "white" }}
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin h-5 w-5" />
                  Processing...
                </>
              ) : (
                "Confirm"
              )}
            </Button>
          </form>
        </Form>
      </motion.div>
    </div>
  )
}
