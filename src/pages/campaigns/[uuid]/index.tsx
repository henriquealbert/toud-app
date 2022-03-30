import type { NextPage } from 'next'

import { CampaignDetails } from 'components/User/CampaignDetails'
import { PrivateLayout } from 'components/shared/PrivateLayout'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'
import { fetcher } from 'lib/fetcher'
import { useSession } from 'next-auth/react'
import { useAuth } from 'contexts/AuthContext'

const CampaignDetailsPage: NextPage = () => {
  const { user } = useAuth()
  const { query } = useRouter()
  const { data: session } = useSession()

  const { data } = useQuery(
    `campaign-${query?.uuid}`,
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
      <CampaignDetails data={data} />
    </PrivateLayout>
  )
}
export default CampaignDetailsPage
