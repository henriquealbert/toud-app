import prisma from 'lib/prisma'
import { validate } from 'lib/yup'
import { createStripeSessionParams } from './types'
import { createStripeSessionValidator } from './validation'
import { createStripeCustomer } from './createStripeCustomer'
import { stripeInstance } from 'lib/stripe'

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

  const { email, amount, campaignId } = fields as createStripeSessionParams

  const { data: customer, error: customerError } = await createStripeCustomer({ email })

  if (customerError) {
    return {
      error: customerError
    }
  }

  const stripe = stripeInstance()
  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      submit_type: 'pay',
      customer: customer.id,
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

    await prisma.campaign.update({
      where: { id: campaignId },
      data: {
        checkoutSessionId: session.id
      }
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
