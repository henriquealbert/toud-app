import { Button, Flex, Heading, Icon, Text } from '@chakra-ui/react'
import { PrivateLayout } from 'components/shared/PrivateLayout'
import { fetcher } from 'lib/fetcher'
import { useSession } from 'next-auth/react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { MdOutlineCheckCircleOutline } from 'react-icons/md'
import { useQuery, useQueryClient } from 'react-query'

const SuccessCampaignPage = () => {
  const { query } = useRouter()
  const { data: session } = useSession()

  useQuery(
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
  const queryClient = useQueryClient()

  const handleClearCache = async () => {
    await queryClient.invalidateQueries('me')
  }

  return (
    <PrivateLayout pageTitle="Nova campanha">
      <Flex direction="column" flex={1} px={{ base: 4, lg: 28 }} py={12}>
        <Icon as={MdOutlineCheckCircleOutline} w="64px" h="64px" mb={8} color="green.400" />
        <Heading fontSize="3xl" mb={5}>
          A campanha foi cadastrada com sucesso!
        </Heading>
        <Text maxW={{ lg: '544px' }} color="text" mb={{ base: 'auto', lg: '140px' }}>
          Seu pagamento foi aprovado e sua campanha está em análise pela nossa equipe. Você será
          informado assim que os influencers começarem a divulgar a sua publicidade.
        </Text>

        <NextLink href="/" passHref>
          <Button as="a" maxW={{ lg: '245px' }} onClick={handleClearCache}>
            ACOMPANHAR
          </Button>
        </NextLink>
      </Flex>
    </PrivateLayout>
  )
}

export default SuccessCampaignPage
