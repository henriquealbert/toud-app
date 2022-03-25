import {
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text
} from '@chakra-ui/react'
import { signOut } from 'next-auth/react'
import { MdLogout } from 'react-icons/md'
import { BiUserCircle } from 'react-icons/bi'

import { useAuth } from 'contexts/AuthContext'

export const UserMenu = () => {
  const { user } = useAuth()
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        _hover={{ bg: 'none' }}
        _active={{ bg: 'none' }}
        _focus={{ boxShadow: 'none' }}
        p={0}
        m={0}
        h="fit-content"
        w="fit-content"
        icon={
          <Icon
            as={BiUserCircle}
            w={7}
            h={7}
            color="white"
            cursor="pointer"
            _hover={{ color: 'purple.300' }}
          />
        }
      />
      <MenuList p={0}>
        <Text py={2} px={4} fontWeight="bold" color="text">
          {user?.email}
        </Text>
        <MenuDivider m={0} />
        <MenuItem
          py={3}
          px={4}
          color="text"
          fontSize="lg"
          onClick={() => signOut({ callbackUrl: '/login' })}
        >
          <Icon as={MdLogout} w={5} h={5} mr={2} />
          Sair
        </MenuItem>
      </MenuList>
    </Menu>
  )
}
