import { api } from 'lib/api'

export const fetcher = async (url: string, options?: any) => {
  const { data, error } = (await api.get(url, options)) as any

  if (error) {
    throw new Error(error.message)
  }
  return data
}
