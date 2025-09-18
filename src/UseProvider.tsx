'use client'
import { SessionProvider } from 'next-auth/react'
import React from 'react'

export default function UseProvider({children}:{children:React.ReactNode}) {
  return (
    <SessionProvider>
        {children}
    </SessionProvider>
  )
}
