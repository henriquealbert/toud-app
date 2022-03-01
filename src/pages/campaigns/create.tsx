import type { NextPage } from 'next'
import { PrivateLayout } from 'components/shared/PrivateLayout'
import { NewCampaign } from 'components/User/NewCampaign'

const NewCampaignPage: NextPage = () => {
  return (
    <PrivateLayout>
      <NewCampaign />
    </PrivateLayout>
  )
}

export default NewCampaignPage
