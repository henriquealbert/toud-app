import NextLink from 'next/link'
import { Box, Flex, Heading, Icon, SimpleGrid, Text } from '@chakra-ui/react'

import { StatusBadge } from 'components/shared/StatusBadge'
import {
  STATUS_FINISHED,
  STATUS_ONGOING,
  STATUS_REJECTED,
  STATUS_SUBMITTED
} from 'domain/campaign/constants'
import { CampaignDetailsProps } from './types'
import { MdArrowBack } from 'react-icons/md'
import { statusInfos, StatusInfo } from './StatusInfo'
import { formatPrice } from 'lib/formatPrice'

export const CampaignDetails = ({ data }: CampaignDetailsProps) => {
  return (
    <Flex direction="column" mx={{ lg: 20 }} mt={10}>
      <NextLink href="/" passHref>
        <Flex as="a" fontSize="lg" color="purple.500" align="center" mb={8}>
          <Icon as={MdArrowBack} w="24px" h="24px" mr={6} /> Voltar para listagem
        </Flex>
      </NextLink>
      <Flex
        bgColor="whiteAlpha.600"
        boxShadow="0px 3px 8px 4px rgba(193, 212, 255, 0.25)"
        borderRadius="lg"
        p={{ base: 6, lg: 16 }}
        direction="column"
      >
        <Flex mb={{ base: 6, lg: 12 }} justifyContent={{ base: 'space-between', lg: 'flex-start' }}>
          <Heading fontSize="xl" mr={{ lg: 4 }} noOfLines={{ base: 1, lg: 4 }}>
            {data?.name}
          </Heading>
          <StatusBadge status={data?.status} />
        </Flex>
        {data?.status === STATUS_SUBMITTED && <StatusInfo data={statusInfos[STATUS_SUBMITTED]} />}
        {data?.status === STATUS_ONGOING && <StatusInfo data={statusInfos[STATUS_ONGOING]} />}
        {data?.status === STATUS_REJECTED && <StatusInfo data={statusInfos[STATUS_REJECTED]} />}
        {data?.status === STATUS_FINISHED && (
          <SimpleGrid columns={{ base: 2, lg: 4 }} gap={{ base: 6, lg: 12 }}>
            <Box color="text">
              <Text fontSize="xs" fontWeight="bold">
                Veiculação
              </Text>
              <Text fontSize="sm">Instagram stories</Text>
            </Box>

            <Box color="text">
              <Text fontSize="xs" fontWeight="bold">
                Valor investido
              </Text>
              <Text fontSize="sm">{formatPrice(data?.amount)}</Text>
            </Box>

            <Box color="text">
              <Text fontSize="xs" fontWeight="bold">
                Alcance
              </Text>
              <Text fontSize="sm">{Number(data?.totalReach || 0).toLocaleString('pt-BR')}</Text>
            </Box>

            <Box color="text">
              <Text fontSize="xs" fontWeight="bold">
                Toques no @ ou link
              </Text>
              <Text fontSize="sm">{Number(data?.clicks || 0).toLocaleString('pt-BR')}</Text>
            </Box>

            <Box color="text">
              <Text fontSize="xs" fontWeight="bold">
                Tempo de veiculação
              </Text>
              <Text fontSize="sm">{data?.displayTime}</Text>
            </Box>

            <Box color="text">
              <Text fontSize="xs" fontWeight="bold">
                CPM (custo por mil)
              </Text>
              <Text fontSize="sm">{formatPrice(String(data?.cpm))}</Text>
            </Box>

            <Box color="text">
              <Text fontSize="xs" fontWeight="bold">
                CPC (custo por clique)
              </Text>
              <Text fontSize="sm">{formatPrice(String(data?.cpc))}</Text>
            </Box>

            <Box color="text">
              <Text fontSize="xs" fontWeight="bold">
                CTR (taxa de clique)
              </Text>
              <Text fontSize="sm">{data?.ctr}%</Text>
            </Box>
          </SimpleGrid>
        )}
      </Flex>
    </Flex>
  )
}
