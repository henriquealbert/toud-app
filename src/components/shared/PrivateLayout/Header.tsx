import { Flex, Heading, Icon, useMediaQuery } from '@chakra-ui/react'
import { BiBell, BiChevronLeft } from 'react-icons/bi'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import { ToudLogo } from '../ToudLogo'
import { UserMenu } from './UserMenu'
import NextLink from 'next/link'
import { useRouter } from 'next/router'

export const Header = ({ pageTitle = '' }) => {
  const { pathname } = useRouter()
  const [isDesktop] = useMediaQuery('(min-width: 768px)')
  const showOnlyPageTittleMobile =
    (pathname === '/' || pathname === '/my-account' || pathname === '/help') && !isDesktop

  return (
    <Flex
      mt={showOnlyPageTittleMobile ? 8 : 0}
      h={showOnlyPageTittleMobile ? 'auto' : '60px'}
      bgColor={{ base: showOnlyPageTittleMobile ? '' : 'white', lg: 'purple.500' }}
      align="center"
    >
      <Flex
        w={{ base: 'full', lg: '90%' }}
        px={{ base: 4, lg: 0 }}
        mx="auto"
        justify="space-between"
        alignItems="center"
      >
        {isDesktop && <ToudLogo isWhite />}

        {showOnlyPageTittleMobile && !isDesktop && (
          <Heading color="purple.800" as="h2" fontSize="lg">
            {pageTitle}
          </Heading>
        )}

        {!showOnlyPageTittleMobile && !isDesktop && (
          <Flex alignItems="center" w="full">
            <NextLink href="/">
              <Icon as={BiChevronLeft} w={7} h={7} color="purple.500" />
            </NextLink>
            <Flex justify="center" w="full">
              <Heading color="purple.800" as="h2" fontSize="sm">
                {pageTitle}
              </Heading>
            </Flex>
          </Flex>
        )}

        <Flex>
          {showOnlyPageTittleMobile && !isDesktop && (
            <NextLink href="/campaigns/create" passHref>
              <Flex>
                <Icon as={AiOutlinePlusCircle} w={7} h={7} mr={4} color="purple.500" />
              </Flex>
            </NextLink>
          )}

          <Icon
            as={BiBell}
            w={7}
            h={7}
            color={{ base: 'purple.500', lg: 'white' }}
            mr={{ lg: 4 }}
            _hover={{ color: 'purple.300' }}
          />

          <Flex display={{ base: 'none', lg: 'flex' }}>
            <UserMenu />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}
