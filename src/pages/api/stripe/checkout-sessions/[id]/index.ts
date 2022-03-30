import { newHandler, withMethods, withUser } from 'lib/middleware'
import { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, { apiVersion: '2020-08-27' })

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const id = req.query.id as string

  try {
    if (!id.startsWith('cs_')) {
      throw Error('Incorrect CheckoutSession ID.')
    }
    const checkout_session = await stripe.checkout.sessions.retrieve(id)

    return res.status(200).json(checkout_session)
  } catch (err: any) {
    return res.status(500).json({ statusCode: 500, message: err.message })
  }
}

export default newHandler(withUser(withMethods(['GET'], handler)))
