import { Box, Flex, Icon } from '@chakra-ui/react'
import { Table } from 'components/shared/Table'
import { useMemo } from 'react'
import { MdExpandMore } from 'react-icons/md'
import NextLink from 'next/link'
import { StatusBadge } from 'components/shared/StatusBadge'

export const CampaignList = () => {
  const data = useMemo(
    () => [
      {
        id: 1,
        name: 'Carne vegetal',
        activity: 'Veganismo',
        amount: 'R$ 500,00',
        createdAt: '17/11/2021',
        placement: 'Stories Instagram',
        status: 'Em andamento'
      },
      {
        id: 2,
        name: 'Desmatamento na Amazonia bem grande este ano aqui tambem ta chovendo',
        activity: 'Veganismo',
        amount: 'R$ 100,00',
        createdAt: '25/11/2021',
        placement: 'Stories Instagram',
        status: 'Em analise'
      },
      {
        id: 3,
        name: 'Músicas para todos',
        activity: 'Música',
        amount: 'R$ 200,00',
        createdAt: '02/11/2021',
        placement: 'Stories Instagram',
        status: 'Reprovado'
      },
      {
        id: 4,
        name: 'Novo CD da banda...',
        activity: 'Música',
        amount: 'R$ 300,00',
        createdAt: '10/10/2021',
        placement: 'Stories Instagram',
        status: 'Finalizado'
      }
    ],
    []
  )

  const columns = useMemo(
    () => [
      {
        Header: 'Título',
        accessor: 'name'
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
              <StatusBadge>{original.status}</StatusBadge>
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
        }
      }
    ],
    []
  )
  return (
    <Box>
      <Table data={data} columns={columns} />
    </Box>
  )
}
