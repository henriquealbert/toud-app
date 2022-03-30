import yup from 'lib/yup'
import 'yup-phone'

export const loginValidator = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().min(8, 'Deve conter no mínimo 8 caracteres.').required()
  })
  .required()

export const signupValidator = yup
  .object({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(8, 'Deve conter no mínimo 8 caracteres.').required(),
    phoneNumber: yup.string().phone('BR', true, 'Telefone inválido.').required(),
    terms: yup.boolean().oneOf([true], 'Você precisa aceitar os termos de uso').required()
  })
  .required()

export const verifyAccountValidator = yup
  .object({
    token: yup.string().required()
  })
  .required()

export const resetPasswordValidator = yup.object({
  password: yup
    .string()
    .min(8, 'A senha deve ter no mínimo 8 caracteres')
    .required('Campo obrigatório'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'As senhas não conferem')
    .min(8, 'A senha deve ter no mínimo 8 caracteres')
    .required('Campo obrigatório'),
  token: yup.string().required('Campo obrigatório')
})
