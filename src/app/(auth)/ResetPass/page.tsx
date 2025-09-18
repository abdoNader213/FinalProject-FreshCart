'use client'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'
import Head from "next/head" 

export default function ResetPass() {
  const navg = useRouter()
  const [loading, setLoading] = useState(false)

  const SchemaResetPass = zod.object({
    email: zod.string().nonempty('Email is required').regex(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      'Invalid email format'
    ),
    newPassword: zod.string().nonempty('New password is required').regex(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      'Password must be at least 8 characters long and include uppercase, lowercase, number, and special character'
    ),
  })

  const LogForm = useForm({
    defaultValues: {
      email: "",
      newPassword: "",
    },
    resolver: zodResolver(SchemaResetPass)
  })

  async function handleResetPass(values: zod.infer<typeof SchemaResetPass>) {
    try {
      setLoading(true)
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/resetPassword`, {
        method: "PUT",
        body: JSON.stringify(values),
        headers: { "Content-Type": "application/json" }
      })
      const data = await res.json()
      console.log(data)

      if (data.token) {
        toast.success('Password Reset Successful!', { position: "top-center", duration: 5000 })
        navg.push('/Login')
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
          Reset <span style={{ color: "#e1d9a3" }}>Password</span>
        </h2>

        <Form {...LogForm}>
          <form onSubmit={LogForm.handleSubmit(handleResetPass)} className="space-y-6">
            
            {/* Email */}
            <FormField
              control={LogForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold text-gray-200">Your Email:</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="example@mail.com"
                      className="rounded-xl bg-white/20 text-white placeholder-gray-300 border-white/30 
                                 focus:border-[#e1d9a3] focus:ring-[#e1d9a3]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />

            {/* New Password */}
            <FormField
              control={LogForm.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold text-gray-200">Your New Password:</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="********"
                      className="rounded-xl bg-white/20 text-white placeholder-gray-300 border-white/30 
                                 focus:border-[#e1d9a3] focus:ring-[#e1d9a3]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />

            {/* Submit */}
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
