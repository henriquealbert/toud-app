import { useMemo } from 'react'
import NextLink from 'next/link'
import { MdExpandMore } from 'react-icons/md'
import { Box, Flex, Icon, Text, useMediaQuery } from '@chakra-ui/react'
import { parseISO } from 'date-fns'

import { formatPrice } from 'lib/formatPrice'
import { useAuth } from 'contexts/AuthContext'
import { Table } from 'components/shared/Table'
import { StatusBadge } from 'components/shared/StatusBadge'

export const CampaignList = () => {
  const { user } = useAuth()
  const [isDesktop] = useMediaQuery('(min-width: 768px)')

  const data = useMemo(() => {
    if (isDesktop) {
      return user?.campaigns?.map((campaign) => ({
        id: campaign.id,
        name: campaign.name,
        status: campaign.status,
        activity: campaign.activity.name,
        createdAt: parseISO(campaign.createdAt).toLocaleString('pt-BR', {
          dateStyle: 'short'
        }),
        amount: formatPrice(campaign.amount),
        placement: 'Instagram Stories' // SUPPORTING ONLY ONE PLACEMENT FOR NOW
      }))
    }

    if (!isDesktop) {
      return user?.campaigns?.map((campaign) => ({
        id: campaign.id,
        name: campaign.name,
        status: campaign.status
      }))
    }
  }, [user?.campaigns, isDesktop])

  const columns = useMemo(() => {
    if (isDesktop) {
      return [
        {
          Header: 'Título',
          accessor: 'name',
          Cell: ({
            cell: {
              row: { original }
            }
          }: any) => {
            return (
              <NextLink href={`/campaigns/${original.id}`} passHref>
                <Box as="a" _hover={{ textDecor: 'underline' }}>
                  {original.name}
                </Box>
              </NextLink>
            )
          }
        },
        {
          Header: 'Segmento',
          accessor: 'activity'
        },
        {
          Header: 'Valor investido',
          accessor: 'amount'
        },
        {
          Header: 'Data de envio',
          accessor: 'createdAt'
        },
        {
          Header: 'Rede social',
          accessor: 'placement'
        },
        {
          Header: 'Status',
          accessor: 'status',
          Cell: ({
            cell: {
              row: { original }
            }
          }: any) => {
            return (
              <Flex justify="space-between" align="center">
                <StatusBadge status={original.status} />
                <NextLink href={`/campaigns/${original.id}`} passHref>
                  <Box as="a">
                    <Icon
                      as={MdExpandMore}
                      transform="rotate(-90deg)"
                      w={6}
                      h={6}
                      color="purple.500"
                    />
                  </Box>
                </NextLink>
              </Flex>
            )
          },
          maxWidth: '140px'
        }
      ]
    }

    if (!isDesktop) {
      return [
        {
          Header: 'Título',
          accessor: 'name',
          Cell: ({
            cell: {
              row: { original }
            }
          }: any) => {
            return (
              <NextLink href={`/campaigns/${original.id}`} passHref>
                <Flex as="a" justify="space-between" alignItems="center">
                  <Text fontWeight="normal" color="text" fontSize="sm" noOfLines={1}>
                    {original.name}
                  </Text>
                  <Flex>
                    <StatusBadge status={original.status} />
                    <Icon
                      as={MdExpandMore}
                      transform="rotate(-90deg)"
                      w={6}
                      h={6}
                      ml={4}
                      color="purple.500"
                    />
                  </Flex>
                </Flex>
              </NextLink>
            )
          }
        }
      ]
    }
  }, [isDesktop])

  const initialState = {
    sortBy: [{ id: 'name', desc: false }]
  }

  return (
    <Box mb={8}>
      <Table data={data} columns={columns} initialState={initialState} />
    </Box>
  )
}
