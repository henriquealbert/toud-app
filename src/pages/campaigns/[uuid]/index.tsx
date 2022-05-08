import { Loader } from 'components/shared/Loader'
import { PrivateLayout } from 'components/shared/PrivateLayout'
import { CampaignDetails } from 'components/User/CampaignDetails'
import { useAuth } from 'contexts/AuthContext'
import { STATUS_DRAFT } from 'domain/campaign/constants'
import { fetcher } from 'lib/fetcher'
import type { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'

const CampaignDetailsPage: NextPage = () => {
  const { user } = useAuth()
  const { query, push } = useRouter()
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

  if (data?.status === STATUS_DRAFT) {
    push(`/campaigns/create/?uuid=${data?.id}`)
    return (
      <PrivateLayout>
        <Loader />
      </PrivateLayout>
    )
  }

  return (
    <PrivateLayout>
      <CampaignDetails data={data} />
    </PrivateLayout>
  )
}
export default CampaignDetailsPage
