import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { getUserById } from 'domain/user/getUserById'

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
