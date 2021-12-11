import { Box, BoxProps, Img } from '@chakra-ui/react'
import NextLink from 'next/link'

export const ToudLogo = ({ isWhite, ...props }: props) => (
  <NextLink href="/" passHref>
    <Box as="a" w="fit-content" {...props}>
      <Img
        src={isWhite ? '/img/logo-white.svg' : '/img/logo.svg'}
        alt="Toud logo"
        w="86px"
        h="28px"
      />
    </Box>
  </NextLink>
)

interface props extends BoxProps {
  isWhite?: boolean
}
