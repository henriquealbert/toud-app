import { comparePassword, generatePasswordHash } from 'lib/password'
import prisma from 'lib/prisma'
import { validate } from 'lib/yup'
import { updateUserParamsTypes } from './types'
import { updateUserValidator } from './validation'

export async function updateUser(params: updateUserParamsTypes) {
  const { fields, errors } = await validate(updateUserValidator, params)
  if (errors) {
    return {
      error: {
        status: 400,
        errors
      }
    }
  }

  const { currentPassword, email, id, name, newPassword, phoneNumber } =
    fields as updateUserParamsTypes

  const user = await prisma.user.findUnique({
    where: {
      id
    }
  })

  if (!user) {
    return {
      error: {
        status: 404,
        message: 'User not found'
      }
    }
  }

  if (currentPassword && newPassword) {
    const passwordMatch = await comparePassword({
      password: currentPassword,
      hash: user.password as string
    })

    if (!passwordMatch) {
      return {
        error: {
          status: 400,
          errors: {
            newPassword: {
              message: 'Senha não confere.'
            },
            currentPassword: {
              message: 'Senha não confere.'
            }
          }
        }
      }
    }
    const pwdHash = await generatePasswordHash(newPassword)

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        name,
        email,
        phoneNumber,
        password: pwdHash
      }
    })

    return {
      data: updatedUser
    }
  }

  const updatedUser = await prisma.user.update({
    where: { id },
    data: {
      name,
      email,
      phoneNumber
    }
  })

  return {
    data: updatedUser
  }
}
