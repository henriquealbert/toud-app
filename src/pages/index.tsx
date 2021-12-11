import type { NextPage } from 'next'
import { PrivateLayout } from 'components/shared/PrivateLayout'

const Home: NextPage = () => {
  return <PrivateLayout>Dashboard</PrivateLayout>
}

export default Home
