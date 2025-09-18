"use client"
import Head from "next/head"
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

// تعريف نوع البيانات لتجنب any
type RegisterValues = {
  name: string
  email: string
  password: string
  rePassword: string
  phone: string
}

export default function Register() {
  const navg = useRouter()
  const [loading, setLoading] = useState(false)

  const SchemaRegs = zod
    .object({
      name: zod.string().nonempty("Name is required").min(2, "Name must be at least 2 characters long"),
      email: zod.string().nonempty("Email is required").regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Invalid email format"),
      password: zod.string().nonempty("Password is required").regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character"),
      rePassword: zod.string().nonempty("Confirm password is required"),
      phone: zod.string().nonempty("Phone is required").regex(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/, "Enter valid Phone"),
    })
    .refine((obj) => obj.password === obj.rePassword, {
      path: ["rePassword"],
      message: "Passwords must match",
    })

  const RegsForm = useForm<RegisterValues>({
    defaultValues: { name: "", email: "", password: "", rePassword: "", phone: "" },
    resolver: zodResolver(SchemaRegs),
  })

  async function handleRegst(values: RegisterValues) {
    try {
      setLoading(true)
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/signup`, {
        method: "POST",
        body: JSON.stringify(values),
        headers: { "Content-Type": "application/json" },
      })
      const data: { message: string } = await res.json()
      if (data.message === "success") {
        toast.success("Account Created !", { position: "top-center", duration: 5000 })
        navg.push("/Login")
      } else {
        toast.error(data.message, { position: "top-center", duration: 5000 })
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Something went wrong!"
      toast.error(msg, { position: "top-center" })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>Register | My App</title>
        <meta name="description" content="Create an account on My App to get started" />
      </Head>

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#605707] via-gray-900 to-black p-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="w-full max-w-lg backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-3xl p-10"
        >
          <h2 className="text-3xl font-bold text-center mb-8 text-white drop-shadow-lg">
            Create <span style={{ color: "#e1d9a3" }}>Account</span>
          </h2>

          <Form {...RegsForm}>
            <form onSubmit={RegsForm.handleSubmit(handleRegst)} className="space-y-6">
              <FormField
                control={RegsForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Your Name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={RegsForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Your Email" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={RegsForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input {...field} type="password" placeholder="Password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={RegsForm.control}
                name="rePassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input {...field} type="password" placeholder="Confirm Password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={RegsForm.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Phone" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full bg-[#605707] hover:bg-[#4d4606] text-white">
                {loading ? <Loader2 className="animate-spin mr-2 h-4 w-4" /> : "Register"}
              </Button>
            </form>
          </Form>
        </motion.div>
      </div>
    </>
  )
}

