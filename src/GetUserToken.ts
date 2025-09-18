'use server'

import { decode, JWT } from "next-auth/jwt"
import { cookies } from "next/headers"

interface TokenData {
  token?: string
  [key: string]: unknown
}

export async function getUserToken(): Promise<string | null> {
  const cookiesData = await cookies()
  const encryptToken = cookiesData.get("next-auth.session-token")?.value

  if (!encryptToken) return null

  const data = await decode({
    token: encryptToken,
    secret: process.env.NEXTAUTH_SECRET!,
  }) as TokenData | null

  return data?.token || null
}

