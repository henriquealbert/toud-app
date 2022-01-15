import { NextApiRequest, NextApiResponse } from 'next'

import { newHandler, withMethods } from 'lib/middleware'
import { createCampaign } from 'domain/campaign/createCampaign'

async function handler(req: NextApiRequest, res: NextApiResponse) {
  // if (req.method === 'GET') {
  //   return await handleGetRequest(req, res)
  // }

  return await handlePostRequest(req, res)
}

async function handlePostRequest(req: NextApiRequest, res: NextApiResponse) {
  const { data, error } = await createCampaign({ ...req.body })
  if (error) {
    return res.status(error.status).json(error)
  }
  return res.status(200).json(data)
}

export default newHandler(withMethods(['POST', 'GET'], handler))
