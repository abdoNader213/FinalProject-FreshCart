'use server'

import { decode } from "next-auth/jwt"
import { cookies } from "next/headers"


export async function getUserToken() {
  const TokenSession = (process.env.NODE_ENV === "production"? '__Secure-next-auth.callback-url':"next-auth.session-token")
  const cookiesData = await cookies()
  const encryptToken = cookiesData.get(TokenSession)?.value



  const data = await decode({
    token: encryptToken,
    secret: process.env.NEXTAUTH_SECRET!})

  return data?.token
}

