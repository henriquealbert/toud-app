export type createFilesParams = {
  userId: string
  files: fileType[]
  campaignId: string
}

export type fileType = {
  key: string
  filename: string
  url: string
  originalname: string
  mimetype: string
  path: string
}
