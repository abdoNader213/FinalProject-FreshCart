'use client'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import Head from "next/head" 
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ResetCode() {
  const navg = useRouter()

  const SchemaResetCode = zod.object({
    ResetCode: zod.string().nonempty('ResetCode is required')
  })

  const ResetForm = useForm({
    defaultValues: {
      ResetCode: "",
    },
    resolver: zodResolver(SchemaResetCode)
  })

  async function handleResetCode(values: zod.infer<typeof SchemaResetCode>) {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/verifyResetCode`, {
        method: "POST",
        body: JSON.stringify({
          resetCode: values.ResetCode
        }),
        headers: {
          "Content-Type": "application/json"
        }
      })

      const data = await res.json()
      console.log(data)

      if (data.status == 'Success') {
        navg.push('/ResetPass')
      } else {
        toast.error(data.message || "Invalid reset code", { position: "top-center", duration: 5000 })
      }
    } catch (error) {
      toast.error("Something went wrong, try again!", { position: "top-center", duration: 5000 })
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#605707] via-gray-900 to-black">
      <Card className="w-full max-w-md backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-3xl p-10">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold text-white">
            Enter Reset Code
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...ResetForm}>
            <form className="space-y-6" onSubmit={ResetForm.handleSubmit(handleResetCode)}>
              <FormField
                control={ResetForm.control}
                name="ResetCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block text-center text-gray-200">Your Reset Code</FormLabel>
                    <FormControl>
                      <div className="flex justify-center">
                        <InputOTP {...field} maxLength={6}>
                          <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                          </InputOTPGroup>
                          <InputOTPSeparator />
                          <InputOTPGroup>
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                          </InputOTPGroup>
                        </InputOTP>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button 
                type="submit" 
                className="w-full py-2 rounded-xl font-medium transition text-white"
                style={{ backgroundColor: "#605707" }}
              >
                Reset Password
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
