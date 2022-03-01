import type { GetServerSideProps } from 'next'
import { PrivateLayout } from 'components/shared/PrivateLayout'
import { NewCampaign } from 'components/User/NewCampaign'
import { getAllActivities } from 'domain/activity/getAllActivities'
import { Activity } from 'domain/activity/types'

const NewCampaignPage = ({ activities }: NewCampaignPageProps) => {
  return (
    <PrivateLayout>
      <NewCampaign activities={activities} />
    </PrivateLayout>
  )
}

export default NewCampaignPage

export const getServerSideProps: GetServerSideProps = async () => {
  const { data: activities } = await getAllActivities()

  return {
    props: { activities: JSON.parse(JSON.stringify(activities)) }
  }
}

type NewCampaignPageProps = {
  activities: Activity[]
}
