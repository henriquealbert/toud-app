import { getUserById } from 'domain/user/getUserById'
import { newHandler, withMethods, withUser } from 'lib/middleware'
import { NextApiRequest, NextApiResponse } from 'next'

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = req.headers.authorization?.split('Bearer ')[1]

  const { data, error } = await getUserById({ token })
  if (error) {
    return res.status(error.status).json(error)
  }
  return res.status(200).json(data)
}

export default newHandler(withUser(withMethods(['GET'], handler)))
