import { useMemo } from 'react'
import NextLink from 'next/link'
import { DateTime } from 'luxon'
import { MdExpandMore } from 'react-icons/md'
import { Box, Flex, Icon } from '@chakra-ui/react'

import { formatPrice } from 'lib/formatPrice'
import { useAuth } from 'contexts/AuthContext'
import { Table } from 'components/shared/Table'
import { StatusBadge } from 'components/shared/StatusBadge'

export const CampaignList = () => {
  const { user } = useAuth()

  const data = useMemo(() => {
    return user?.campaigns?.map((campaign) => ({
      id: campaign.id,
      name: campaign.name,
      status: campaign.status,
      activity: campaign.activity.name,
      createdAt: DateTime.fromISO(campaign.createdAt).toLocaleString(DateTime.DATE_SHORT, {
        locale: 'pt-BR'
      }),
      amount: formatPrice(campaign.amount),
      placement: campaign.campaignOnPlacement[0].placement.name // SUPPORTING ONLY ONE PLACEMENT FOR NOW
    }))
  }, [user?.campaigns])

  const columns = useMemo(
    () => [
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
    ],
    []
  )
  const initialState = {
    sortBy: [{ id: 'name', desc: false }]
  }
  return (
    <Box mb={8}>
      <Table data={data} columns={columns} initialState={initialState} />
    </Box>
  )
}
