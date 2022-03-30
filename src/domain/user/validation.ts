import yup from 'lib/yup'
import 'yup-phone'

export const getUserByIdValidator = yup
  .object({
    token: yup.string().required()
  })
  .required()

export const updateUserValidator = yup.object().shape(
  {
    id: yup.string().required('Campo obrigatório'),
    name: yup.string().required('Campo obrigatório'),
    email: yup.string().email('Email inválido').required('Campo obrigatório'),
    newPassword: yup.string().when('newPassword', {
      is: (password = '') => password.length > 0,
      then: yup.string().min(8, 'Deve conter no mínimo 8 caracteres.')
    }),
    currentPassword: yup.string().when('currentPassword', {
      is: (password = '') => password.length > 0,
      then: yup.string().min(8, 'Deve conter no mínimo 8 caracteres.')
    }),
    phoneNumber: yup.string().phone('BR', true, 'Telefone inválido.').required()
  },
  [
    ['currentPassword', 'currentPassword'],
    ['newPassword', 'newPassword']
  ]
)
