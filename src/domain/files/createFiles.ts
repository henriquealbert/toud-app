import prisma from 'lib/prisma'
import { validate } from 'lib/yup'
import { createFilesValidator } from './validation'

import { createFilesParams } from './types'

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

  const { files, userId } = fields as createFilesParams
  console.log(files, userId)
  // const createdFiles = await prisma.userFile.createMany({
  //   data: files.map((file) => ({
  //     ...file,
  //     userId
  //   }))
  // })
  // console.log(createdFiles)

  // if (!createdFiles) {
  //   return {
  //     error: {
  //       status: 500,
  //       errors: {
  //         message: 'Error creating campaign'
  //       }
  //     }
  //   }
  // }

  return {
    data: { ok: true }
  }
}
