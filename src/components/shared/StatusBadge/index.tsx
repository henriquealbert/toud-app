import { Badge } from '@chakra-ui/react'
import {
  STATUS_DRAFT,
  STATUS_SUBMITTED,
  STATUS_REJECTED,
  STATUS_FINISHED,
  STATUS_ONGOING
} from 'domain/campaign/constants'
import { StatusType } from 'domain/campaign/types'

export const StatusBadge = ({ status = 'DRAFT' }: { status?: StatusType }) => (
  <Badge
    borderRadius="base"
    py="2px"
    px={2}
    textTransform="none"
    fontSize="sm"
    fontWeight="bold"
    color={config(status)?.color}
    bgColor={config(status)?.bgColor}
  >
    {config(status)?.label}
  </Badge>
)

const config = (status: StatusType) => {
  switch (status) {
    case STATUS_DRAFT:
      return {
        color: 'gray.500',
        bgColor: 'gray.100',
        label: 'Rascunho'
      }
    case STATUS_SUBMITTED:
      return {
        color: 'teal.500',
        bgColor: 'teal.100',
        label: 'Em análise'
      }
    case STATUS_REJECTED:
      return {
        color: 'red.500',
        bgColor: 'red.100',
        label: 'Reprovado'
      }
    case STATUS_ONGOING:
      return {
        color: 'green.500',
        bgColor: 'green.100',
        label: 'Em andamento'
      }
    case STATUS_FINISHED:
      return {
        color: 'purple.500',
        bgColor: 'purple.200',
        label: 'Finalizado'
      }
  }
}
