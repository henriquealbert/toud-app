import { sendEmail } from 'lib/email'
import jwt from 'jsonwebtoken'
import { validate } from 'lib/yup'
import { accountVerificationValidator } from './validation'
import { DateTime } from 'luxon'

export async function accountVerification(params: paramsTypes): Promise<responseTypes> {
  const { fields, errors } = await validate(accountVerificationValidator, params)

  if (errors) {
    return {
      error: {
        status: 400,
        errors
      }
    }
  }

  const { email } = fields as paramsTypes

  const token = jwt.sign({ email }, process.env.JWT_SECRET as string)

  const response = await sendEmail({
    to: email,
    subject: 'Verifique seu e-mail da plataforma Toud',
    html: `<p>Olá,</p>
          <p>Clique neste link para verificar seu endereço de e-mail.</p>
          <a href="${
            process.env.NEXT_PUBLIC_APP_URL
          }/activate?token=${token}">Clique aqui para ativar sua conta</a>
          <br />
          <p>Se você não solicitou a verificação deste endereço, ignore este e-mail.</p>
          <p>Obrigado,<br />
          Equipe Toud.</p>
          <p style="opacity: 0;">${DateTime.now().toFormat('dd LLL yyyy - HH:mm:ss')}</p>
    `,
    text: `Olá, Clique neste link para verificar seu endereço de e-mail. ${process.env.NEXT_PUBLIC_APP_URL}/activate?token=${token}`
  })

  if (!response) {
    return {
      error: {
        status: 500,
        errors: {
          email: { message: 'Um erro inesperado aconteceu. Por favor, tente novamente.' }
        }
      }
    }
  }

  return {
    data: { message: 'Email de verificação enviado com sucesso.' }
  }
}

type paramsTypes = {
  email: string
}

type responseTypes = {
  data?: {
    message: string
  }
  error?: {
    status: number
    errors: {
      email?: {
        message: string
      }
    }
  }
}
