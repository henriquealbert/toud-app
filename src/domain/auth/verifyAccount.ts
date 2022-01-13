import prisma from 'lib/prisma'
import jwt from 'jsonwebtoken'
import { validate } from 'lib/yup'
import { verifyAccountValidator } from './validation'

export async function verifyAccount(params: paramsTypes) {
  const { fields, errors } = await validate(verifyAccountValidator, params)
  if (errors) {
    return {
      error: {
        status: 400,
        errors
      }
    }
  }

  const { token } = fields as paramsTypes
  if (!token) {
    return {
      error: {
        status: 400,
        errors: { token: { message: 'Token inválido.' } }
      }
    }
  }

  let userEmail
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as jwtPayload
    userEmail = decoded.email
  } catch (error) {
    console.error('Error verifying token. ', JSON.stringify(error))
    return {
      error: {
        status: 400,
        errors: { token: { message: 'Token inválido.' } }
      }
    }
  }

  try {
    await prisma.user.updateMany({
      where: {
        email: userEmail,
        isVerified: false,
        isActive: true
      },
      data: {
        isVerified: true
      }
    })
    return { data: { active: true } }
  } catch (error) {
    return {
      error: {
        status: 404,
        errors: {
          token: { message: 'Conta não encontrada ou token inválido.' }
        }
      }
    }
  }
}

type paramsTypes = {
  token: string | undefined
}

type jwtPayload = {
  email: string
}
