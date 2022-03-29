import { NextApiRequest, NextApiResponse } from 'next'

import { newHandler, withMethods, withUser } from 'lib/middleware'
import { updateCampaign } from 'domain/campaign/updateCampaign'

async function handler(req: NextApiRequest, res: NextApiResponse) {
  // if (req.method === 'GET') {
  //   return await handleGetRequest(req, res)
  // }

  return await handlePutRequest(req, res)
}

async function handlePutRequest(req: NextApiRequest, res: NextApiResponse) {
  const { data, error } = await updateCampaign({ ...req.body, id: req.query.uuid })

  if (error) {
    return res.status(error.status).json(error)
  }
  return res.status(200).json(data)
}

export default newHandler(withUser(withMethods(['PUT'], handler)))
