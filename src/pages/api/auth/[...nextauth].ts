/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from 'lib/api'
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export default NextAuth({
  providers: [
    CredentialsProvider({
      credentials: {},
      name: 'credentials',
      async authorize(credentials: any) {
        const user = JSON.parse(credentials.user)
        const res = await api.post('/auth/local', user)

        if (res.data.user) {
          return { ...res.data.user, jwt: res.data.jwt }
        } else {
          return null
        }
      }
    })
  ],
  secret: process.env.NEXT_AUTH_SECRET,
  jwt: {
    secret: process.env.NEXT_AUTH_SECRET
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token = { accessToken: user.jwt, user }
      }
      return token
    },
    async session({ session, token }: { session: any; token: any }) {
      // this token return above jwt()
      session.accessToken = token.accessToken
      //if you want to add user details info
      session.user = token.user
      return session
    }
  }
})
