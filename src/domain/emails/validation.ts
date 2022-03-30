import yup from 'lib/yup'

export const accountVerificationValidator = yup.object({
  email: yup.string().email().required()
})

export const forgotPasswordPasswordValidator = yup.object({
  email: yup.string().email().required()
})
