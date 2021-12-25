import { generatePasswordHash } from 'lib/password'
import prisma from 'lib/prisma'
import { validate } from 'lib/yup'
import { signupValidator } from './validation'

export async function signup(params: signupParamsTypes) {
  const { fields, errors } = await validate(signupValidator, params)

  if (errors) {
    return {
      error: {
        status: 400,
        errors
      }
    }
  }

  const { password, email, name, phoneNumber, terms } = fields as signupParamsTypes

  // Prevent user from signing up with an existing email - even with variants
  const [startsWith, endsWith] = email.replace(/\+.*@/, '@').split('@')
  const userCount = await prisma.user.count({
    where: {
      email: {
        startsWith,
        endsWith
      },
      isActive: true
    }
  })

  if (userCount > 0) {
    return {
      error: {
        status: 400,
        errors: {
          email: {
            message: 'Email já cadastrado.'
          }
        }
      }
    }
  }

  const pwdHash = await generatePasswordHash(password)

  try {
    const [user] = await prisma.$transaction([
      prisma.user.create({
        data: {
          email,
          password: pwdHash,
          name,
          phoneNumber,
          terms
        }
      })
      // send email verification
    ])

    return {
      data: {
        id: user.id,
        email: user.email,
        name: user.name,
        phoneNumber: user.phoneNumber,
        role: user.role
      }
    }
  } catch (error: any) {
    return {
      error: {
        status: 500,
        errors: {
          email: {
            message: error.message || 'Um erro inesperado aconteceu. Por favor, tente novamente.'
          }
        }
      }
    }
  }
}

type signupParamsTypes = {
  password: string
  email: string
  terms: boolean
  name: string
  phoneNumber: string
}
