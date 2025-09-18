'use client'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { CheckoutPaymenet } from '@/OrderAction/OrderAction'
import { useParams } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const SchemaCheck = zod.object({
  details: zod.string().nonempty('Details is required').min(2),
  city: zod.string().nonempty('City is required').min(2),
  phone: zod
    .string()
    .nonempty('Phone is required')
    .regex(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/, 'Enter valid Phone'),
})

export default function Checkoutsession() {
  const params = useParams()
  const cartId = params?.cartId as string | undefined

  const shippingForm = useForm<zod.infer<typeof SchemaCheck>>({
    defaultValues: {
      details: '',
      phone: '',
      city: '',
    },
    resolver: zodResolver(SchemaCheck),
  })

  async function CheckoutsessionPayment(values: zod.infer<typeof SchemaCheck>) {
    if (!cartId) {
      console.error('Cart ID is missing')
      return
    }

    try {
      const data = await CheckoutPaymenet(cartId, values)
      if (data?.session?.url) {
        window.open(data.session.url, '_blank')
      } else {
        console.error('No session URL returned from API')
      }
    } catch (err) {
      console.error('Checkout Error:', err)
    }
  }

  return (
    <div className="max-w-7xl mx-auto my-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Checkout Form */}
      <div className="bg-white shadow-lg rounded-xl p-6 lg:col-span-1 col-span-1">
        <h1 className="text-2xl font-bold mb-6">Check Out Payment</h1>
        <Form {...shippingForm}>
          <form className="space-y-4" onSubmit={shippingForm.handleSubmit(CheckoutsessionPayment)}>
            <FormField
              control={shippingForm.control}
              name="details"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Details</FormLabel>
                  <FormControl>
                    <Input {...field} className="border-gray-300" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={shippingForm.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Phone</FormLabel>
                  <FormControl>
                    <Input {...field} className="border-gray-300" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={shippingForm.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your City</FormLabel>
                  <FormControl>
                    <Input {...field} className="border-gray-300" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full bg-[#605707] hover:bg-[#4d4606]">
              Payment
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}
