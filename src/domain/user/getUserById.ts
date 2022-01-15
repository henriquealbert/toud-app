import { getUserByIdValidator } from './validation'
import { validate } from 'lib/yup'
import jwt from 'jsonwebtoken'
import prisma from 'lib/prisma'

export async function getUserById(params: meParamsTypes) {
  const { fields, errors } = await validate(getUserByIdValidator, params)
  if (errors) {
    return {
      error: {
        status: 400,
        errors
      }
    }
  }

  const { token } = fields as meParamsTypes

  if (!token) {
    return {
      error: {
        status: 400,
        errors: { token: { message: 'Token inválido.' } }
      }
    }
  }

  try {
    const JWT_SECRET = process.env.JWT_SECRET as string
    const decoded = jwt.verify(token, JWT_SECRET) as jwtPayload

    const user = await prisma.user.findFirst({
      where: {
        id: decoded.id,
        email: decoded.email,
        isActive: true
      },
      include: {
        campaigns: {
          select: {
            id: true,
            name: true,
            amount: true,
            createdAt: true,
            status: true,
            activity: {
              select: {
                name: true
              }
            },
            campaignOnPlacement: {
              select: {
                placement: {
                  select: {
                    id: true,
                    name: true
                  }
                }
              }
            }
          }
        }
      }
    })

    if (!user) {
      throw new Error('Token inválido.')
    }

    return {
      data: {
        id: user.id,
        email: user.email,
        name: user.name,
        phoneNumber: user.phoneNumber,
        role: user.role,
        campaigns: user.campaigns
      }
    }
  } catch (error) {
    console.error('Error verifying token. ', JSON.stringify(error))
    return {
      error: {
        status: 400,
        errors: { token: { message: 'Token inválido.' } }
      }
    }
  }
}

type jwtPayload = {
  id: string
  email: string
  role: string
  iat: number
}

type meParamsTypes = {
  token: string | undefined
}
