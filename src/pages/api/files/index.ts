import { NextApiRequest, NextApiResponse } from 'next'

import { newHandler, withFile, withMethods, withUser } from 'lib/middleware'
import { createFiles } from 'domain/files/createFiles'

async function handler(req: NextApiRequest, res: NextApiResponse) {
  // if (req.method === 'GET') {
  //   return await handleGetRequest(req, res)
  // }

  return await handlePostRequest(req, res)
}

async function handlePostRequest(req: any, res: NextApiResponse) {
  const body = JSON.parse(req.body.data)
  const files = req.files

  const { data, error } = await createFiles({ ...body, files })

  if (error) {
    return res.status(error.status).json(error)
  }
  return res.status(200).json(data)
}

export default newHandler(withFile(withUser(withMethods(['POST'], handler))))

export const config = {
  api: {
    bodyParser: false
  }
}
