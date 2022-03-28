import yup from 'lib/yup'

export const createFilesValidator = yup.object().shape({
  files: yup.array().of(
    yup.object().shape({
      filename: yup.string().required(),
      originalname: yup.string().required(),
      mimetype: yup.string().required()
    })
  ),
  userId: yup.string().required()
})
