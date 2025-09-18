'use server'

import { decode, JWT } from "next-auth/jwt"
import { cookies } from "next/headers"

interface TokenData {
  token?: string
  [key: string]: unknown
}

export async function getUserToken(): Promise<string | null> {
  const TokenSession = (process.env.NODE_ENV === "production"?'__Secure-next-auth.callback-url':"next-auth.session-token")
  const cookiesData = await cookies()
  const encryptToken = cookiesData.get(TokenSession)?.value

  if (!encryptToken) return null

  const data = await decode({
    token: encryptToken,
    secret: process.env.NEXTAUTH_SECRET!,
  }) as TokenData | null

  return data?.token || null
}

