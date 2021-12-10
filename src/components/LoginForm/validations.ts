import yup from 'lib/yup'

export const loginValidator = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(8, 'Deve conter no mínimo 8 caracteres.').required()
})
