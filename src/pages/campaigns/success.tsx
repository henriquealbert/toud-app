import NextLink from 'next/link'
import { MdOutlineCheckCircleOutline } from 'react-icons/md'
import { Heading, Flex, Text, Button, Icon } from '@chakra-ui/react'

import { PrivateLayout } from 'components/shared/PrivateLayout'
import { useSession } from 'next-auth/react'
import { useQuery } from 'react-query'
import { fetcher } from 'lib/fetcher'
import { useRouter } from 'next/router'

const SuccessCampaignPage = () => {
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

  return (
    <PrivateLayout>
      <Flex direction="column" flex={1} px={28} py={12}>
        {data && (
          <Icon as={MdOutlineCheckCircleOutline} w="64px" h="64px" mb={8} color="green.400" />
        )}
        <Heading fontSize="3xl" mb={5}>
          {data ? 'A campanha foi cadastrada com sucesso!' : 'Erro ao pagar a campanha'}
        </Heading>
        <Text maxW="544px" color="text" mb="140px">
          {data
            ? 'Seu pagamento foi aprovado e sua campanha está em análise pela nossa equipe. Você será informado assim que os influencers começarem a divulgar a sua publicidade.'
            : 'Por favor, tente novamente mais tarde.'}
        </Text>

        <NextLink href="/" passHref>
          <Button as="a" maxW="245px">
            {data ? 'ACOMPANHAR' : 'Voltar'}
          </Button>
        </NextLink>
      </Flex>
    </PrivateLayout>
  )
}

export default SuccessCampaignPage
