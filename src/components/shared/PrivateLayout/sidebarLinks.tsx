import { Icon } from '@chakra-ui/react'
import {
  MdOutlineHome,
  MdOutlineAccountCircle
  // MdCreditCard,
  // MdInfo
} from 'react-icons/md'
// import { BsWhatsapp } from 'react-icons/bs'

export const sidebarLinks = [
  {
    label: 'Tela inicial',
    href: '/',
    icon: <Icon as={MdOutlineHome} w={6} h={6} />
  },
  {
    label: 'Minha conta',
    href: '/my-account',
    icon: <Icon as={MdOutlineAccountCircle} w={6} h={6} />
  }
  // {
  //   label: 'Pagamentos',
  //   href: '/payments',
  //   icon: <Icon as={MdCreditCard} w={5} h={5} />
  // },
  // {
  //   label: 'Central de ajuda',
  //   href: '/central-de-ajuda',
  //   icon: <Icon as={MdInfo} w={5} h={5} />
  // },
  // {
  //   label: 'Suporte',
  //   href: '/suporte',
  //   icon: <Icon as={BsWhatsapp} w={5} h={5} />
  // }
]
