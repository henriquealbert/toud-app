import prisma from 'lib/prisma'
import { validate } from 'lib/yup'
import { createStripeCustomerParams } from './types'
import { createStripeCustomerValidator } from './validation'
import { stripeInstance } from 'lib/stripe'

export async function createStripeCustomer(params: createStripeCustomerParams) {
  const { fields, errors } = await validate(createStripeCustomerValidator, params)
  if (errors) {
    return {
      error: {
        status: 400,
        errors
      }
    }
  }

  const { email } = fields as createStripeCustomerParams

  const user = await prisma.user.findUnique({
    where: {
      email: email
    },
    select: {
      id: true,
      email: true,
      stripeId: true,
      name: true
    }
  })

  if (!user) {
    return {
      error: {
        status: 400,
        message: 'User not found'
      }
    }
  }

  const stripe = stripeInstance()

  if (user.stripeId) {
    try {
      await stripe.customers.update(user.stripeId, {
        email: user.email,
        name: user.name
      })

      return {
        data: {
          id: user.stripeId
        }
      }
    } catch (err: any) {
      return {
        error: {
          status: 500,
          message: err.message
        }
      }
    }
  }

  try {
    const customer = await stripe.customers.create({
      email: user.email,
      name: user.name
    })

    await prisma.user.update({
      where: {
        id: user.id
      },
      data: {
        stripeId: customer.id
      }
    })

    return {
      data: {
        id: customer.id
      }
    }
  } catch (err: any) {
    return {
      error: {
        status: 500,
        message: err.message
      }
    }
  }
}
