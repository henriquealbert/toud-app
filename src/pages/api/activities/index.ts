import { NextApiRequest, NextApiResponse } from 'next'

import { newHandler, withMethods } from 'lib/middleware'
import { getAllActivities } from 'domain/activity/getAllActivities'

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    return await handleGetRequest(req, res)
  }
}

async function handleGetRequest(req: NextApiRequest, res: NextApiResponse) {
  const { data } = await getAllActivities()

  return res.status(200).json(data)
}

export default newHandler(withMethods(['GET'], handler))
