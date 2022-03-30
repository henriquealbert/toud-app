import { sendEmail } from 'lib/email'
import jwt from 'jsonwebtoken'
import { validate } from 'lib/yup'
import { forgotPasswordPasswordValidator } from './validation'
import { format } from 'date-fns'

export async function forgotPassword(params: paramsTypes): Promise<responseTypes> {
  const { fields, errors } = await validate(forgotPasswordPasswordValidator, params)

  if (errors) {
    return {
      error: {
        status: 400,
        errors
      }
    }
  }

  const { email } = fields as paramsTypes

  const token = jwt.sign({ email }, process.env.JWT_SECRET as string, {
    expiresIn: '1h'
  })

  const response = await sendEmail({
    to: email,
    subject: 'Alteração de senha da plataforma Toud',
    html: `<p>Olá,</p>
          <p>Clique neste link para alterar sua senha.</p>
          <a href="${
            process.env.NEXT_PUBLIC_APP_URL
          }/login?passwordToken=${token}">Clique aqui para alterar sua senha</a>
          <br />
          <p>Se você não solicitou a alteração de senha deste endereço, ignore este e-mail.</p>
          <p>Obrigado,<br />
          Equipe Toud.</p>
          <p style="opacity: 0;">${format(new Date(), 'dd-MM-yyyy HH:mm:ss')}</p>
    `,
    text: `Olá, Clique neste link para alterar sua senha. ${process.env.NEXT_PUBLIC_APP_URL}/login?passwordToken=${token}`
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
    data: { message: 'Email de recuperação enviado com sucesso.' }
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
