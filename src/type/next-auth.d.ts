import NextAuth from "next-auth"
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
  interface User {
    userData: {
      email: string
      name: string
      role: string
    }
    tokenData: string
  }

  interface Session {
    user: {
      email: string
      name: string
      role: string
    }
    token: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: {
      email: string
      name: string
      role: string
    }
    token: string
    idToken?: string
  }
}


