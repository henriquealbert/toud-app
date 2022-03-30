import { NextApiRequest, NextApiResponse } from 'next'

import { newHandler, withMethods, withUser } from 'lib/middleware'
import { updateCampaign } from 'domain/campaign/updateCampaign'
import { getCampaignById } from 'domain/campaign/getCampaignById'

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    return await handleGetRequest(req, res)
  }

  return await handlePutRequest(req, res)
}

async function handleGetRequest(req: NextApiRequest, res: NextApiResponse) {
  const id = req.query.uuid as string
  const userId = req.query.userId as string
  const { data, error } = await getCampaignById({ id, userId })

  if (error) {
    return res.status(error.status).json(error)
  }
  return res.status(200).json(data)
}

async function handlePutRequest(req: NextApiRequest, res: NextApiResponse) {
  const { data, error } = await updateCampaign({ ...req.body, id: req.query.uuid })

  if (error) {
    return res.status(error.status).json(error)
  }
  return res.status(200).json(data)
}

export default newHandler(withUser(withMethods(['PUT', 'GET'], handler)))
