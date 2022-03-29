import aws from 'aws-sdk'
import { fileType } from 'domain/files/types'
import { createReadStream } from 'fs'

const BUCKET_REGION = process.env.BUCKET_REGION
const BUCKET_NAME = process.env.BUCKET_NAME
const BUCKET_ACCESS_KEY_ID = process.env.BUCKET_ACCESS_KEY_ID
const BUCKET_SECRET_ACCESS_KEY = process.env.BUCKET_SECRET_ACCESS_KEY

if (!BUCKET_REGION || !BUCKET_NAME || !BUCKET_ACCESS_KEY_ID || !BUCKET_SECRET_ACCESS_KEY) {
  throw new Error(
    'Please define BUCKET_REGION, BUCKET_NAME, BUCKET_ACCESS_KEY_ID AND BUCKET_SECRET_ACCESS_KEY environment variables'
  )
}

const s3 = new aws.S3({
  region: BUCKET_REGION,
  accessKeyId: BUCKET_ACCESS_KEY_ID,
  secretAccessKey: BUCKET_SECRET_ACCESS_KEY,
  signatureVersion: 'v4'
})

export const uploadFileToS3 = async ({ file }: { file: fileType }) => {
  const key = `${file.filename}-${file.originalname}`
  try {
    await s3
      .putObject({
        Bucket: BUCKET_NAME,
        Key: key,
        Body: createReadStream(file.path)
      })
      .promise()

    return {
      data: {
        ...file,
        key
      }
    }
  } catch (error: any) {
    console.error('Error uploading file to S3, error:', error)
    return {
      error: {
        status: error.statusCode,
        errors: {
          file: error.message
        }
      }
    }
  }
}

export const removeFileFromS3 = async ({ key }: { key: string }) => {
  try {
    return await s3
      .deleteObject({
        Bucket: BUCKET_NAME,
        Key: key
      })
      .promise()
  } catch (error: any) {
    console.log('removeFileFromS3', error)
    return {
      error: {
        status: error.statusCode,
        errors: {
          file: error.message
        }
      }
    }
  }
}

export const getFile = async ({ key }: { key: string }) => {
  const response = await s3.getObject({ Bucket: BUCKET_NAME, Key: key }).promise()

  const error = response.$response.error as any
  if (error) {
    return {
      error: {
        status: error.statusCode,
        message: error.message
      }
    }
  }

  return { data: response }
}
