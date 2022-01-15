import { Input, InputProps } from '@chakra-ui/react'

export const Search = ({ filter, setFilter, ...props }: SearchProps) => {
  return (
    <Input
      type="search"
      maxW="436px"
      h="34px"
      placeholder="Buscar título, segmento de campanha..."
      fontSize="sm"
      value={filter || ''}
      onChange={(e) => setFilter(e.target.value)}
      _placeholder={{
        fontSize: 'sm',
        color: 'text'
      }}
      {...props}
    />
  )
}

interface SearchProps extends InputProps {
  filter: string
  setFilter: (filter: string) => void
}
