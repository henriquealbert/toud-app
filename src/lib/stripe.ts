import { loadStripe, Stripe } from '@stripe/stripe-js'
import { api } from './api'

let stripePromise = null as Promise<Stripe | null> | null

export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string)
  }

  return stripePromise
}

export const redirectToCheckout = async ({ amount = 0, email = '', token = '' }) => {
  const { data, status } = await api.post(
    '/stripe/checkout-sessions',
    {
      email,
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
