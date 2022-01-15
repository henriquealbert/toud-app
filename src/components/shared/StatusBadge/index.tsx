import { Badge } from '@chakra-ui/react'
import { ReactNode } from 'react'

export const StatusBadge = ({ children }: { children: ReactNode }) => (
  <Badge borderRadius="base" py="2px" px={2} textTransform="none" fontSize="sm" fontWeight="bold">
    {children}
  </Badge>
)
