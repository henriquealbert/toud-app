import * as yup from 'yup'
import { AnyObjectSchema } from 'yup'

yup.setLocale({
  mixed: {
    required: 'Campo obrigatório.',
    notType: 'Campo obrigatório.'
  },
  string: {
    email: 'Email inválido'
  }
})

export default yup

export const validate = async (validationSchema: AnyObjectSchema, value: any) => {
  try {
    const fields = await validationSchema.validate(value, { abortEarly: false })
    return { fields }
  } catch (error: any) {
    if (error.inner.length > 0) {
      const errors = error.inner.reduce(
        (errors: any, error: any) => ({
          ...errors,
          [error.path]: {
            message: error.message
          }
        }),
        {}
      )
      return { errors }
    }

    return {
      errors: {
        [error.path]: {
          message: error.message
        }
      }
    }
  }
}
