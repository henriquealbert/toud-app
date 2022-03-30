import { Flex, Heading, Text } from '@chakra-ui/react'
import { STATUS_ONGOING, STATUS_REJECTED, STATUS_SUBMITTED } from 'domain/campaign/constants'

export const StatusInfo = ({ data }: { data: { title: string; text: string } }) => {
  return (
    <Flex color="text" direction="column">
      <Heading as="h2" fontSize="sm" mb={4}>
        {data.title}
      </Heading>
      <Text fontSize="sm" maxW="75%">
        {data.text}
      </Text>
    </Flex>
  )
}

export const statusInfos = {
  [STATUS_SUBMITTED]: {
    title: 'Seu anúncio está em análise',
    text: 'Nosso robozinho está analisando seu anuncio para garantir que ele está nos conformes da nossa plataforma. Pode levar até 24h para o anuncio ser aprovado e começar a ser distribuiído.'
  },
  [STATUS_ONGOING]: {
    title: 'Suas métricas aparecerão aqui em breve',
    text: 'Assim que seu anuncio for finalizado em nossa plataforma, compilaremos todos os dados dos influencers, como: CPM, CPC, CTR, alcance, etc. E publicaremos em forma de relatório aqui para você.'
  },
  [STATUS_REJECTED]: {
    title: 'Movitivo da reprovação',
    text: 'Você tentou vincular anuncios sobre política. Esses anuncios não são permitidos em nossa plataforma. Entraremos em contato com você para realizar o estorno do seu dinheiro.'
  }
}
