import NextAuth, { NextAuthOptions, DefaultSession } from "next-auth"
import Credentials from "next-auth/providers/credentials"

// تعريف واجهات المستخدم لتجنب any
interface MyUser {
  email: string
  name: string
  role: string
}

interface MyToken {
  user: MyUser
  token: string
}

// تمديد الـ Session لتضمين البيانات الجديدة
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: MyUser
    token: string
  }
}

const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/Login",
    signOut:"/Login",
  },
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/signin`,
          {
            method: "POST",
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        )

        const data = await res.json()

        if (data.message === "success") {
          return {
            id: data.user._id, 
            userData: {
              email: data.user.email,
              name: data.user.name,
              role: data.user.role,
            },
            tokenData: data.token,
          }
        } else {
          throw new Error(data.message)
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user.userData
        token.token = user.tokenData
      }
      return token
    },

    async session({ session, token }) {
      session.user = token.user as MyUser
      session.token = token.token as string
      return session
    },
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
