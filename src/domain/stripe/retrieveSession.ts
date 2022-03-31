import prisma from 'lib/prisma'
import { validate } from 'lib/yup'
import { stripeInstance } from 'lib/stripe'
import { retrieveStripeSessionParams } from './types'
import { retrieveStripeSessionValidator } from './validation'
import { STATUS_DRAFT, STATUS_SUBMITTED } from 'domain/campaign/constants'

export async function retrieveStripeSession(params: retrieveStripeSessionParams) {
  const { fields, errors } = await validate(retrieveStripeSessionValidator, params)
  if (errors) {
    return {
      error: {
        status: 400,
        errors
      }
    }
  }

  const { id } = fields as retrieveStripeSessionParams

  const stripe = stripeInstance()

  try {
    if (!id.startsWith('cs_')) {
      throw Error('Incorrect CheckoutSession ID.')
    }
    const checkoutSession = await stripe.checkout.sessions.retrieve(id)
    const paymentIntentId = checkoutSession.payment_intent as string
    const status = checkoutSession.payment_status === 'paid' ? STATUS_SUBMITTED : STATUS_DRAFT

    const campaign = await prisma.campaign.update({
      where: {
        checkoutSessionId: id
      },
      data: {
        paymentIntentId,
        status
      }
    })

    return {
      data: {
        checkoutSession,
        campaign
      }
    }
  } catch (err: any) {
    return {
      error: {
        status: 500,
        message: err.message
      }
    }
  }
}
