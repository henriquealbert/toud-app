import { Button, Flex, Heading, Icon, IconButton, Text } from '@chakra-ui/react'
import { BackButton } from 'components/shared/BackButton'
import { useAuth } from 'contexts/AuthContext'
import { useState } from 'react'
import { MdOutlineFace, MdOutlineMode } from 'react-icons/md'
import { MyAccountForm } from './MyAccountForm'
import { signOut } from 'next-auth/react'

export const AccountWrapper = () => {
  const { user } = useAuth()
  const [isEditable, setEditable] = useState(false)

  return (
    <Flex direction="column" mx={{ lg: 20 }} mt={{ lg: 10 }} height="full">
      {isEditable && <BackButton onClick={() => setEditable(false)} />}

      <Heading fontSize="3xl" mb={4} display={{ base: 'none', lg: 'block' }}>
        Minha conta
      </Heading>
      <Text color="text" mb={12}>
        Verifique e edite os dados da sua conta
      </Text>
      {!isEditable && (
        <Flex
          boxShadow="0px 3px 8px 4px rgba(193, 212, 255, 0.25)"
          p={{ base: 5, lg: 10 }}
          maxW="50%"
          w="fit-content"
          minW={{ base: 'full', lg: '465px' }}
          borderRadius="lg"
          bgColor="whiteAlpha.900"
          align="center"
        >
          <Icon as={MdOutlineFace} w="40px" h="40px" mr={{ base: 4, lg: 12 }} />
          <Flex color="text" direction="column">
            <Text fontSize="lg" fontWeight="bold">
              {user?.name}
            </Text>
            <Text>{user?.email}</Text>
          </Flex>
          <IconButton
            aria-label="Editar conta"
            colorScheme="white"
            _hover={{ color: 'purple.600' }}
            _active={{ color: 'purple.700' }}
            color="purple.500"
            w="fit-content"
            ml="auto"
            onClick={() => setEditable(true)}
            icon={<Icon as={MdOutlineMode} w="24px" h="24px" />}
          />
        </Flex>
      )}
      {isEditable && <MyAccountForm />}
      <Flex mt="auto" justify="center" mb={4} display={{ base: 'flex', lg: 'none' }}>
        <Button onClick={() => signOut({ callbackUrl: '/login' })} variant="link">
          Logout
        </Button>
      </Flex>
    </Flex>
  )
}
