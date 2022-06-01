import { Button, Flex, Icon, Stack } from '@chakra-ui/react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { BiPlus } from 'react-icons/bi'
import { sidebarLinks } from './sidebarLinks'

export const DesktopSidebar = () => {
  const { pathname } = useRouter()
  return (
    <Flex
      display={{ base: 'none', lg: 'flex' }}
      bgColor="white"
      direction="column"
      w="full"
      maxW="325px"
      p={10}
    >
      <NextLink href="/campaigns/create" passHref>
        <Button as="a" h="50px" leftIcon={<Icon as={BiPlus} w={6} h={6} />}>
          Nova Campanha
        </Button>
      </NextLink>

      <Stack mt={10} ml={6} spacing={6}>
        {sidebarLinks.map((link) => (
          <Flex key={link.label}>
            <NextLink href={link.href} passHref>
              <Button
                leftIcon={link.icon}
                as="a"
                variant="sidebar"
                color={pathname === link.href ? 'purple.500' : 'text'}
                h="25px"
                py={2}
              >
                <p>{link.label}</p>
              </Button>
            </NextLink>
          </Flex>
        ))}
      </Stack>
    </Flex>
  )
}
