import { api } from 'lib/api'
import { useSession } from 'next-auth/react'
import { createContext, FC, useContext } from 'react'
import { useQuery } from 'react-query'

const AuthContext = createContext({} as ContextTypes)

const AuthProvider: FC = ({ children }) => {
  const { data, status } = useSession()
  const { data: user, isLoading } = useQuery(
    'user',
    async () => await getUser({ token: data?.accessToken as string }),
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
  user: any | null
  isLoading: boolean
}

const getUser = async ({ token }: { token: string }) => {
  const { data, error } = (await api.get('/users/me', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })) as any

  if (error) {
    throw new Error(error.message)
  }
  return data
}
