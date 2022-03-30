import { validate } from 'lib/yup'
import { createStripeSessionParams } from './types'
import { createStripeSessionValidator } from './validation'
import Stripe from 'stripe'

export async function createStripeSession(params: createStripeSessionParams) {
  const { fields, errors } = await validate(createStripeSessionValidator, params)
  if (errors) {
    return {
      error: {
        status: 400,
        errors
      }
    }
  }

  const { email, amount } = fields as createStripeSessionParams

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, { apiVersion: '2020-08-27' })
  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      submit_type: 'pay',
      customer_email: email,
      payment_method_types: ['card'],
      locale: 'pt-BR',
      line_items: [
        {
          name: 'Campanha Toud',
          description: 'Finalize o pagamento para sua campanha.',
          quantity: 1,
          amount: amount,
          currency: 'BRL'
        }
      ],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/campaigns/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/`
    })

    return { data: session }
  } catch (err: any) {
    return {
      error: {
        status: 500,
        message: err.message
      }
    }
  }
}
