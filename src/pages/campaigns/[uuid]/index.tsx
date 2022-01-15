import type { NextPage } from 'next'
import { useRouter } from 'next/router'

const CampaignDetailsPage: NextPage = () => {
  const { query } = useRouter()
  return <div>{query?.uuid}</div>
}
export default CampaignDetailsPage
