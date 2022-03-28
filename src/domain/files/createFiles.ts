import prisma from 'lib/prisma'
import { validate } from 'lib/yup'
import { createFilesValidator } from './validation'

import { createFilesParams } from './types'
import { uploadFileToS3 } from 'lib/s3'

export async function createFiles(params: createFilesParams) {
  const { fields, errors } = await validate(createFilesValidator, params)
  if (errors) {
    return {
      error: {
        status: 400,
        errors
      }
    }
  }

  const { files, userId, campaignId } = fields as createFilesParams

  const createdFiles = await Promise.all(
    files.map(async (file) => {
      const { data, error } = await uploadFileToS3({ file })

      if (error) {
        return { error }
      }

      const createdFile = await prisma.userFile.create({
        data: {
          key: data.key,
          filename: data.originalname,
          mimetype: data.mimetype,
          userId,
          campaignId
        }
      })
      return {
        data: createdFile
      }
    })
  )

  if (createdFiles.map(({ error }) => error).some(Boolean)) {
    return {
      error: {
        status: 500,
        errors: createdFiles.map(({ error }) => error)
      }
    }
  }

  return {
    data: createdFiles.map(({ data }) => data)
  }
}
