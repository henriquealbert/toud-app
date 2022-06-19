import { Icon } from '@chakra-ui/react'
import { BsQuestionCircle } from 'react-icons/bs'
import {
  // MdCreditCard,
  MdOutlineAccountCircle,
  MdOutlineHome
} from 'react-icons/md'
// import { BsWhatsapp } from 'react-icons/bs'

export const sidebarLinks = [
  {
    label: 'Início',
    href: '/',
    icon: <Icon as={MdOutlineHome} w={6} h={6} />
  },
  {
    label: 'Ajuda',
    href: '/help',
    icon: <Icon as={BsQuestionCircle} w={5} h={5} mb={{ base: 1, lg: 0 }} />
  },
  {
    label: 'Perfil',
    href: '/my-account',
    icon: <Icon as={MdOutlineAccountCircle} w={6} h={6} />
  }
  // {
  //   label: 'Pagamentos',
  //   href: '/payments',
  //   icon: <Icon as={MdCreditCard} w={5} h={5} />
  // },

  // {
  //   label: 'Suporte',
  //   href: '/suporte',
  //   icon: <Icon as={BsWhatsapp} w={5} h={5} />
  // }
]
