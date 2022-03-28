import { useQuery } from 'react-query'
import { useSession } from 'next-auth/react'
import { createContext, FC, useContext } from 'react'

import { UserType } from 'domain/user/types'
import { fetcher } from 'lib/fetcher'

const AuthContext = createContext({} as ContextTypes)

const AuthProvider: FC = ({ children }) => {
  const { data, status } = useSession()
  const { data: user, isLoading } = useQuery(
    'me',
    async () => await getMe({ token: data?.accessToken as string }),
    {
      enabled: !!data,
      staleTime: 60 * 60 * 1000, // 1 hour
      keepPreviousData: true
    }
  )

  return (
    <AuthContext.Provider value={{ user, isLoading: isLoading || status === 'loading' }}>
      {children}
    </AuthContext.Provider>
  )
}

const useAuth = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}

export { useAuth, AuthProvider }

type ContextTypes = {
  user: UserType | null
  isLoading: boolean
}

const getMe = async ({ token }: { token: string }) =>
  await fetcher('/auth/me', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
