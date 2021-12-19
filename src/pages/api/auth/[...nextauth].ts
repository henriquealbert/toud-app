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
        const res = (await api.post('/auth/local', user)) as any

        if (res.error) {
          if (res.error.message === 'Your account email is not confirmed') {
            throw new Error('Conta não confirmada. Verifique seu e-mail.')
          }
          if (res.error.message === 'Invalid identifier or password') {
            throw new Error('E-mail ou senha inválidos.')
          }
          throw new Error('Erro interno. Tente novamente.')
        }

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
