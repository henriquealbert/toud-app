import NextLink from 'next/link'
import { Flex, Heading, Icon } from '@chakra-ui/react'

import { StatusBadge } from 'components/shared/StatusBadge'
import { STATUS_ONGOING, STATUS_REJECTED, STATUS_SUBMITTED } from 'domain/campaign/constants'
import { CampaignDetailsProps } from './types'
import { MdArrowBack } from 'react-icons/md'
import { statusInfos, StatusInfo } from './StatusInfo'

export const CampaignDetails = ({ data }: CampaignDetailsProps) => {
  return (
    <Flex direction="column" mx={20} mt={10}>
      <NextLink href="/" passHref>
        <Flex as="a" fontSize="lg" color="purple.500" align="center" mb={8}>
          <Icon as={MdArrowBack} w="24px" h="24px" mr={6} /> Voltar para listagem
        </Flex>
      </NextLink>
      <Flex
        bgColor="whiteAlpha.600"
        boxShadow="0px 3px 8px 4px rgba(193, 212, 255, 0.25)"
        borderRadius="lg"
        p={16}
        direction="column"
      >
        <Flex mb={12}>
          <Heading fontSize="xl" mr={4}>
            {data?.name}
          </Heading>
          <StatusBadge status={data?.status} />
        </Flex>
        {data?.status === STATUS_SUBMITTED && <StatusInfo data={statusInfos[STATUS_SUBMITTED]} />}
        {data?.status === STATUS_ONGOING && <StatusInfo data={statusInfos[STATUS_ONGOING]} />}
        {data?.status === STATUS_REJECTED && <StatusInfo data={statusInfos[STATUS_REJECTED]} />}
      </Flex>
    </Flex>
  )
}
