import { MdSearch } from 'react-icons/md'
import { Box, Icon, Input, InputProps } from '@chakra-ui/react'

export const Search = ({ filter, setFilter, ...props }: SearchProps) => {
  return (
    <Box position="relative">
      <Input
        bgColor={{ base: 'white', lg: 'none' }}
        type="search"
        maxW="436px"
        h="34px"
        placeholder="Buscar título, segmento de campanha..."
        fontSize="sm"
        value={filter || ''}
        pl={8}
        onChange={(e) => setFilter(e.target.value)}
        _placeholder={{
          fontSize: 'sm',
          color: 'text'
        }}
        {...props}
      />
      <Icon
        position="absolute"
        top="23px"
        left={{ base: '8px', lg: '32px' }}
        as={MdSearch}
        h={5}
        w={5}
        zIndex={1}
        color="text"
      />
    </Box>
  )
}

interface SearchProps extends InputProps {
  filter: string
  setFilter: (filter: string) => void
}
