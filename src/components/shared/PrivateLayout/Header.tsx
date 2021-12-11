import { Flex, Icon } from '@chakra-ui/react'
import { BiBell } from 'react-icons/bi'
import { ToudLogo } from '../ToudLogo'
import { UserMenu } from './UserMenu'

export const Header = () => (
  <Flex h="60px" bgColor="purple.500" align="center">
    <Flex w="90%" mx="auto" justify="space-between">
      <ToudLogo isWhite />

      <Flex>
        <Icon as={BiBell} w={7} h={7} color="white" mr={4} _hover={{ color: 'purple.300' }} />
        <UserMenu />
      </Flex>
    </Flex>
  </Flex>
)
