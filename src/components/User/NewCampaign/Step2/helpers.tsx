import yup from 'lib/yup'

export const step2Schema = yup.object().shape({
  hasDescription: yup.string().required('Campo obrigatório'),
  description: yup.string().when('hasDescription', {
    is: 'Yes',
    then: yup.string().required('Campo obrigatório')
  }),
  userId: yup.string().required('Campo obrigatório'),
  filesIds: yup
    .array()
    .of(yup.object({ id: yup.string() }))
    .optional(),
  expectedDate: yup.date().required('Campo obrigatório')
})
