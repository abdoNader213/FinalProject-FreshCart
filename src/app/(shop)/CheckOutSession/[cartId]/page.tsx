'use client'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { CheckoutPaymenet } from '@/OrderAction/OrderAction'
import { useParams } from 'next/navigation'
import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { OrderContext, OrderItem } from '../../allorders/OrderProvider'
import Image from 'next/image'

// النوع لكل منتج في الكارت
interface CartItemType {
  _id: string
  count: number
  price: number
  product: {
    _id: string
    title: string
    imageCover: string
  }
}

// النوع النهائي للطلب بعد التحويل
interface OrderType {
  _id: string
  createdAt: string
  totalOrderPrice: number
  paymentMethodType: string
  isPaid: boolean
  isDelivered: boolean
  cartItems: CartItemType[]
}

export default function Checkoutsession() {
  const params = useParams()
  const cartId = params?.cartId as string

  const context = useContext(OrderContext)
  const order: OrderType[] = context?.order.map((item) => ({
    _id: item._id,
    createdAt: item.createdAt,
    totalOrderPrice: item.totalPrice,
    paymentMethodType: 'card',
    isPaid: item.status === 'paid',
    isDelivered: item.status === 'delivered',
    cartItems: item.products.map((p) => ({
      _id: p.productId,
      count: p.count,
      price: p.price,
      product: {
        _id: p.productId,
        title: p.name,
        imageCover: p.image || '',
      },
    })),
  })) ?? []

  const SchemaCheck = zod.object({
    details: zod.string().nonempty('Details is required').min(2),
    city: zod.string().nonempty('City is required').min(2),
    phone: zod
      .string()
      .nonempty('Phone is required')
      .regex(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/, 'Enter valid Phone'),
  })

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
      console.log('Calling CheckoutPaymenet with:', cartId, values)
      const data = await CheckoutPaymenet(cartId, values)
      console.log('CheckoutPaymenet response:', data)

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
      <div className="bg-white shadow-lg rounded-xl p-6">
        <h1 className="text-2xl font-bold mb-6">Check Out Payment</h1>
        <Form {...shippingForm}>
          <form
            className="space-y-4"
            onSubmit={shippingForm.handleSubmit(CheckoutsessionPayment)}
          >
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

      {/* Orders List */}
      <div className="bg-white shadow-lg rounded-xl p-6 h-[600px] overflow-y-auto">
        <h1 className="text-2xl font-bold mb-6">My Orders</h1>
        {order.length > 0 ? (
          order.map((ord) => (
            <div key={ord._id} className="mb-6 border rounded-lg p-4 shadow-sm">
              <div className="mb-3 flex justify-between">
                <h2 className="font-semibold text-gray-800">Order ID: {ord._id}</h2>
                <span className="text-sm text-gray-500">
                  {new Date(ord.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p>
                Total Price: <span className="font-semibold text-gray-900">{ord.totalOrderPrice} EGP</span>
              </p>
              <p>Payment: {ord.paymentMethodType}</p>
              <p>
                Status:
                <span className={`ml-2 ${ord.isPaid ? 'text-green-600' : 'text-red-600'}`}>
                  {ord.isPaid ? 'Paid' : 'Not Paid'}
                </span>
                |
                <span className={`ml-2 ${ord.isDelivered ? 'text-green-600' : 'text-orange-600'}`}>
                  {ord.isDelivered ? 'Delivered' : 'Pending'}
                </span>
              </p>

              <div className="relative overflow-x-auto mt-4 rounded-lg border">
                <table className="w-full text-sm text-left text-gray-500">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                    <tr>
                      <th className="px-4 py-3">Image</th>
                      <th className="px-4 py-3">Product</th>
                      <th className="px-4 py-3">Qty</th>
                      <th className="px-4 py-3">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ord.cartItems.map((item) => (
                      <tr key={item._id} className="bg-white border-t">
                        <td className="p-3">
                          <Image
                            src={item.product.imageCover}
                            width={60}
                            height={60}
                            className="rounded-md"
                            alt={item.product.title}
                          />
                        </td>
                        <td className="px-4 py-3 font-medium text-gray-900">{item.product.title}</td>
                        <td className="px-4 py-3">{item.count}</td>
                        <td className="px-4 py-3">{item.price} EGP</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No orders yet.</p>
        )}
      </div>
    </div>
  )
}
