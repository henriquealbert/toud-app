import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { getUserById } from 'domain/user/getUserById'
import { tmpdir } from 'os'
import multer from 'multer'
import { v4 as uuid } from 'uuid'

export const newHandler =
  (handler: NextApiHandler) => async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      await handler(req, res)
    } catch (error) {
      console.error(error)
      return res
        .status(500)
        .json({ message: 'Um erro inesperado aconteceu. Por favor, tente novamente.' })
    }
  }

export const withMethods =
  (methods = [''], handler: NextApiHandler) =>
  (req: NextApiRequest, res: NextApiResponse) => {
    if (methods.length <= 0) {
      throw new Error('Provide endpoint methods')
    }

    const { method } = req
    if (!method || !methods.includes(method)) {
      res.status(405).json({ message: 'Method not supported' })
      return
    }

    return handler(req, res)
  }

export const withUser =
  (handler: NextApiHandler) => async (req: NextApiRequest, res: NextApiResponse) => {
    const token = req.headers.authorization?.split('Bearer ')[1]

    if (!token) {
      return res.status(401).json({ message: 'Forbidden access' })
    }

    const { error } = await getUserById({ token })

    if (error) {
      return res.status(401).json({ message: 'Forbidden access' })
    }

    return handler(req, res)
  }

const runMiddleware = (middleware: any) => async (req: NextApiRequest, res: NextApiResponse) => {
  return new Promise((resolve, reject) => {
    middleware(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result)
      }
      return resolve(result)
    })
  })
}

const fileMiddleware = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => cb(null, tmpdir()),
    filename: (req, file, cb) => {
      cb(null, uuid())
    }
  })
}).array('files')

export const withFile =
  (handler: NextApiHandler) => async (req: NextApiRequest, res: NextApiResponse) => {
    await runMiddleware(fileMiddleware)(req, res)
    return handler(req, res)
  }
