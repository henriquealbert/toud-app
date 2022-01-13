import { api } from 'lib/api'

export const getUser = async ({ token }: { token: string }) => {
  const { data, error } = (await api.get('/auth/me', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })) as any

  if (error) {
    throw new Error(error.message)
  }
  return data
}
