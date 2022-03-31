import NextLink from 'next/link'
import { MdOutlineCheckCircleOutline } from 'react-icons/md'
import { Heading, Flex, Text, Button, Icon } from '@chakra-ui/react'

import { PrivateLayout } from 'components/shared/PrivateLayout'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { fetcher } from 'lib/fetcher'
import { useQuery } from 'react-query'

const SuccessCampaignPage = () => {
  // TODO:
  // update campaign status to EM ANALISE
  // add stripe webhook

  const { query } = useRouter()
  const { data: session } = useSession()
  const { data } = useQuery(
    'checkout-session',
    async () =>
      await fetcher(`/stripe/checkout-sessions/${query?.session_id}`, {
        headers: {
          Authorization: `Bearer ${session?.accessToken as string}`
        }
      }),
    {
      enabled: !!session && !!query?.session_id
    }
  )
  console.log(data)
  return (
    <PrivateLayout>
      <Flex direction="column" flex={1} px={28} py={12}>
        <Icon as={MdOutlineCheckCircleOutline} w="64px" h="64px" mb={8} color="green.400" />
        <Heading fontSize="3xl" mb={5}>
          A campanha foi cadastrada com sucesso!
        </Heading>
        <Text maxW="544px" color="text" mb="140px">
          Seu pagamento foi aprovado e sua campanha está em análise pela nossa equipe. Você será
          informado assim que os influencers começarem a divulgar a sua publicidade.
        </Text>

        <NextLink href="/" passHref>
          <Button as="a" maxW="245px">
            ACOMPANHAR
          </Button>
        </NextLink>
      </Flex>
    </PrivateLayout>
  )
}

export default SuccessCampaignPage
