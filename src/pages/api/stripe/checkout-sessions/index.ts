import { createStripeSession } from 'domain/stripe/createSession'
import { newHandler, withMethods, withUser } from 'lib/middleware'
import { NextApiRequest, NextApiResponse } from 'next'

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { data, error } = await createStripeSession({ ...req.body })

  if (error) {
    return res.status(error.status).json(error)
  }
  return res.status(200).json(data)
}

export default newHandler(withUser(withMethods(['POST'], handler)))
