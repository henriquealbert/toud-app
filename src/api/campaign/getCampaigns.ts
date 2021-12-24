import { api } from 'lib/api'

export const getCampaigns = async ({ userId }: { userId: string }) => {
  const { data, error } = (await api.get('/campaigns')) as any

  if (error) {
    throw new Error(error.message)
  }
  return data
}
