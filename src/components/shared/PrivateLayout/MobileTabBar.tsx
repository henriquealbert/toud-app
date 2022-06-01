import { Button, Flex, Icon, SimpleGrid, Text } from '@chakra-ui/react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { BiPlus } from 'react-icons/bi'
import { sidebarLinks } from './sidebarLinks'

export const MobileTabBar = () => {
  const { pathname } = useRouter()

  return (
    <Flex
      display={{ lg: 'none' }}
      position="fixed"
      zIndex="sticky"
      bottom={0}
      bgColor="white"
      borderTop="1px"
      borderColor="border"
      w="full"
      p={4}
      justify="center"
      direction="column"
    >
      {pathname === '/' && (
        <NextLink href="/campaigns/create" passHref>
          <Button as="a" h="50px" mb={4} leftIcon={<Icon as={BiPlus} w={6} h={6} />}>
            Criar uma campanha
          </Button>
        </NextLink>
      )}
      <SimpleGrid columns={3} w="full">
        {sidebarLinks.map((link) => (
          <Flex direction="column" alignItems="center" key={link.label}>
            <NextLink href={link.href} passHref>
              <Flex
                direction="column"
                justify="center"
                alignItems="center"
                as="a"
                color={pathname === link.href ? 'purple.500' : 'text'}
              >
                {link.icon}
                <Text fontSize="xs">{link.label}</Text>
              </Flex>
            </NextLink>
          </Flex>
        ))}
      </SimpleGrid>
    </Flex>
  )
}
