import jwt from 'jsonwebtoken'
import { validate } from 'lib/yup'
import { resetPasswordValidator } from './validation'
import { generatePasswordHash } from 'lib/password'
import prisma from 'lib/prisma'

export async function resetPassword(params: resetPasswordParams) {
  const { fields, errors } = await validate(resetPasswordValidator, params)
  if (errors) {
    return {
      error: {
        status: 400,
        errors
      }
    }
  }

  const { token, password } = fields as resetPasswordParams

  let userEmail
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as jwtPayload
    userEmail = decoded.email
  } catch (error) {
    console.log('Error verifying token. ', JSON.stringify(error))
    return {
      error: {
        status: 400,
        errors: { token: { message: 'Token inválido' } }
      }
    }
  }

  try {
    const pwdHash = await generatePasswordHash(password)

    const user = await prisma.user.update({
      where: {
        email: userEmail
      },
      data: {
        password: pwdHash
      }
    })
    return { data: user }
  } catch (error) {
    return {
      error: {
        status: 500,
        errors: {
          token: { message: 'Erro ao resetar senha' }
        }
      }
    }
  }
}
type jwtPayload = {
  email: string
}
type resetPasswordParams = {
  token: string
  password: string
  confirmPassword: string
}
