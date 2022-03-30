import { api } from 'lib/api'

export const fetcher = async (url: string, options?: any) => {
  const resp = (await api.get(url, options)) as any

  if (resp.status !== 200) {
    throw new Error(resp.message)
  }
  return resp.data
}
