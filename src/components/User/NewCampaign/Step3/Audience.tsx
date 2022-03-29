import { Flex, Heading, Text, Tooltip } from '@chakra-ui/react'
import { getCurrentAudience } from './helpers'
import { AudienceProps } from './types'

export const Audience = ({ value }: AudienceProps) => {
  const currentAudience = getCurrentAudience(String(value))
  return (
    <Flex
      boxShadow="0px 3px 8px 4px rgba(193, 212, 255, 0.25)"
      bgColor="whiteAlpha.600"
      borderRadius="lg"
      maxW="485px"
      p={8}
      direction="column"
      color="text"
      pos="relative"
      overflowX="hidden"
      minH="200px"
      justifyContent="space-between"
    >
      <Flex direction="column">
        <Heading as="h3" fontWeight="semibold" fontSize="md" mb={1}>
          Tamanho do público
        </Heading>
        <Text fontSize="xs" maxW="336px">
          {currentAudience?.text() || ''}
        </Text>
      </Flex>

      <Flex w="full" direction="column">
        <Flex justify="space-between" w="full" fontWeight="bold" fontSize="xs">
          <Text>Específico</Text>
          <Text>Amplo</Text>
        </Flex>

        <Flex mt={2}>
          <Flex bgColor="yellow.400" h="4px" w="25%" borderLeftRadius="base" />
          <Flex bgColor="blue.400" h="4px" w="50%" />
          <Flex bgColor="green.400" h="4px" w="25%" borderRightRadius="base" />
        </Flex>

        <Tooltip
          label="Seu público"
          bgColor="purple.500"
          p="4px 8px"
          hasArrow
          isOpen
          placement="bottom"
        >
          <Flex pos="absolute" bottom="32px" w={currentAudience?.width} />
        </Tooltip>
      </Flex>
    </Flex>
  )
}
