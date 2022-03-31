import { loadStripe, Stripe } from '@stripe/stripe-js'
import newStripeInstance from 'stripe'
import { api } from './api'

let stripePromise = null as Promise<Stripe | null> | null

export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string)
  }

  return stripePromise
}

export const redirectToCheckout = async ({
  amount = 0,
  email = '',
  token = '',
  campaignId = ''
}): Promise<any> => {
  const { data, status } = await api.post(
    '/stripe/checkout-sessions',
    {
      email,
      campaignId,
      amount: amount * 100
    },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )
  if (status !== 200) {
    return { error: { message: 'Erro ao redirecionar para o checkout.' } }
  }

  const stripe = (await getStripe()) as Stripe
  const { error } = await stripe.redirectToCheckout({
    sessionId: data.id
  })

  if (error) {
    return { error: { message: 'Erro ao redirecionar para o checkout.' } }
  }
}

export const stripeInstance = () => {
  return new newStripeInstance(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: '2020-08-27'
  })
}
