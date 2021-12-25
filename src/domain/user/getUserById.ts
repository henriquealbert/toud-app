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

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as jwtPayload

    const user = await prisma.user.findFirst({
      where: {
        id: decoded.id,
        email: decoded.email,
        isActive: true
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
        role: user.role
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
  token: string
}
