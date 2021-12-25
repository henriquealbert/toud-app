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
        const { data } = (await api.post('/auth/login', user)) as any

        if (data) {
          return { ...data.user, jwt: data.jwt }
        } else {
          throw new Error('E-mail ou senha inválidos.')
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
