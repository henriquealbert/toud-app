import sendgrid from '@sendgrid/mail'

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY
if (!SENDGRID_API_KEY) {
  throw new Error('SENDGRID_API_KEY is not set')
}
sendgrid.setApiKey(SENDGRID_API_KEY)

export const sendEmail = async ({ to, html, subject, text }: params) => {
  try {
    return await sendgrid.send({ from: 'Suporte Toud <no-reply@toud.io>', to, html, subject, text })
  } catch (error) {
    console.error(error)
    throw new Error('Error sending email')
  }
}

type params = {
  to: string
  html: string
  subject: string
  text: string
}
