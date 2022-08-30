import { Box, Flex, Heading, Icon, Text } from '@chakra-ui/react'
import { PrivateLayout } from 'components/shared/PrivateLayout'
import type { NextPage } from 'next'
import { BsWhatsapp } from 'react-icons/bs'

const HelpPage: NextPage = () => (
  <PrivateLayout pageTitle="Ajuda">
    <Flex direction="column" gap={6} mx={{ lg: 20 }} mt={{ lg: 10 }}>
      <Heading display={{ base: 'none', lg: 'block' }}>Ajuda</Heading>
      <Flex
        mt={6}
        as="a"
        href="https://toud.com.br/ajuda"
        target="_blank"
        rel="noopener noreferrer"
        bgColor="whiteAlpha.900"
        borderRadius="lg"
        boxShadow="0px 3px 8px rgba(193, 212, 255, 0.25)"
        p={8}
        maxW="500px"
        color="text"
        alignItems="center"
      >
        <Icon w={6} h={6} mr={6} />
        <Box>
          <Text fontWeight="bold" fontSize="sm">
            Central de ajuda
          </Text>
          <Text fontSize="sm">Acesse nossas FAQs de auto ajuda</Text>
        </Box>
      </Flex>

      <Flex
        as="a"
        href="https://toud.com.br/whatsapp"
        target="_blank"
        rel="noopener noreferrer"
        bgColor="whiteAlpha.900"
        borderRadius="lg"
        boxShadow="0px 3px 8px rgba(193, 212, 255, 0.25)"
        p={8}
        maxW="500px"
        color="text"
        alignItems="center"
      >
        <Icon as={BsWhatsapp} w={6} h={6} mr={6} />
        <Box>
          <Text fontWeight="bold" fontSize="sm">
            Suporte via WhatsApp
          </Text>
          <Text fontSize="sm">Chame nosso suporte via Whats</Text>
        </Box>
      </Flex>
    </Flex>
  </PrivateLayout>
)

export default HelpPage
