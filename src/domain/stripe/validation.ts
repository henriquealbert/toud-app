import yup from 'lib/yup'

export const createStripeSessionValidator = yup.object({
  email: yup.string().email().required(),
  amount: yup.number().required()
})
