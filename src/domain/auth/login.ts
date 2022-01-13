import { validate } from 'lib/yup'
import { loginValidator } from './validation'
import jwt from 'jsonwebtoken'
import prisma from 'lib/prisma'
import { comparePassword } from 'lib/password'

export async function login(params: loginParamsTypes) {
  const { fields, errors } = await validate(loginValidator, params)

  if (errors) {
    return {
      error: {
        status: 400,
        errors
      }
    }
  }

  const { password, email } = fields as loginParamsTypes

  const user = await prisma.user.findFirst({
    where: {
      email,
      isActive: true
    }
  })

  if (!user) {
    return wrongCredentials
  }

  if (!user.isVerified) {
    return {
      error: {
        status: 400,
        errors: {
          verification: {
            message: 'Usuário não verificado.'
          }
        }
      }
    }
  }

  const passwordMatch = await comparePassword({ password, hash: user.password as string })

  if (!passwordMatch) {
    return wrongCredentials
  }

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET as string
  )

  return {
    data: {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        phoneNumber: user.phoneNumber,
        role: user.role
      },
      jwt: token
    }
  }
}

const wrongCredentials = {
  error: {
    status: 400,
    errors: {
      email: {
        message: 'Email ou senha inválidos.'
      },
      password: {
        message: 'Email ou senha inválidos.'
      }
    }
  }
}

type loginParamsTypes = {
  password: string
  email: string
}
