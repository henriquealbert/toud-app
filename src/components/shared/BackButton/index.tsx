import { MdArrowBack } from 'react-icons/md'
import NextLink from 'next/link'
import { Flex, Icon } from '@chakra-ui/react'

export const BackButton = ({ url = '/', onClick }: backbuttonprops) => {
  if (onClick) {
    return (
      <Flex
        as="button"
        type="button"
        color="gray.600"
        align="center"
        mb={8}
        _hover={{ color: 'gray.900' }}
        onClick={onClick}
      >
        <Icon as={MdArrowBack} w="22px" h="22px" mr={2} /> Voltar
      </Flex>
    )
  } else {
    return (
      <NextLink href={url} passHref>
        <Flex as="a" color="gray.600" align="center" mb={8} _hover={{ color: 'gray.900' }}>
          <Icon as={MdArrowBack} w="22px" h="22px" mr={2} /> Voltar
        </Flex>
      </NextLink>
    )
  }
}

type backbuttonprops = {
  url?: string
  onClick?: () => void
}
