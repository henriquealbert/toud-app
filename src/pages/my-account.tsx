import type { NextPage } from 'next'
import { PrivateLayout } from 'components/shared/PrivateLayout'
import { AccountWrapper } from 'components/Account/AccountWrapper'

const MyAccountPage: NextPage = () => (
  <PrivateLayout pageTitle="Minha conta">
    <AccountWrapper />
  </PrivateLayout>
)

export default MyAccountPage
