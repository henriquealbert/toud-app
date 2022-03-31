import yup from 'lib/yup'

export const createStripeSessionValidator = yup.object({
  email: yup.string().email().required(),
  amount: yup.number().required(),
  campaignId: yup.string().required()
})

export const createStripeCustomerValidator = yup.object({
  email: yup.string().email().required()
})

export const retrieveStripeSessionValidator = yup.object({
  id: yup.string().required()
})
