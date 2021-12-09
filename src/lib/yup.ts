import * as yup from 'yup'

yup.setLocale({
  mixed: {
    required: 'Campo obrigatório.',
    notType: 'Campo obrigatório.'
  },
  string: {
    email: 'Email inválido'
  }
})

export default yup
