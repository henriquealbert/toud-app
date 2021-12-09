import yup from 'lib/yup'
import 'yup-phone'

export const signUpValidator = yup.object({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(8, 'Deve conter no mínimo 8 caracteres.').required(),
  phoneNumber: yup.string().phone('BR', true, 'Telefone inválido.').required(),
  terms: yup.boolean().oneOf([true], 'Você precisa aceitar os termos de uso')
})
