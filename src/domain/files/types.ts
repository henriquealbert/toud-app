export type createFilesParams = {
  userId: string
  files: file[]
}

type file = {
  key: string
  filename: string
  url: string
  originalname: string
  mimetype: string
}
