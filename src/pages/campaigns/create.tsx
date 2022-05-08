import { PrivateLayout } from 'components/shared/PrivateLayout'
import { NewCampaign } from 'components/User/NewCampaign'
import { useAuth } from 'contexts/AuthContext'
import { fetcher } from 'lib/fetcher'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'

const NewCampaignPage = () => {
  const { user } = useAuth()
  const { query } = useRouter()
  const { data: session } = useSession()

  const { data } = useQuery(
    `new-campaign-${query?.uuid}`,
    async () =>
      await fetcher(`/campaigns/${query?.uuid}?userId=${user?.id}`, {
        headers: {
          Authorization: `Bearer ${session?.accessToken as string}`
        }
      }),
    {
      enabled: !!session && !!query?.uuid && !!user?.id
    }
  )

  return (
    <PrivateLayout>
      <NewCampaign campaignData={data} />
    </PrivateLayout>
  )
}

export default NewCampaignPage
