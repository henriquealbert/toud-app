import yup from 'lib/yup'

export const getUserByIdValidator = yup
  .object({
    token: yup.string().required()
  })
  .required()
