import { NextApiRequest, NextApiResponse } from 'next'
import { retrieveStripeSession } from 'domain/stripe/retrieveSession'
import { newHandler, withMethods, withUser } from 'lib/middleware'

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const id = req.query.id as string

  const { data, error } = await retrieveStripeSession({ id })

  if (error) {
    return res.status(error.status).json(error)
  }
  return res.status(200).json(data)
}

export default newHandler(withUser(withMethods(['GET'], handler)))
