import { Input } from '@chakra-ui/input'
import { useController } from 'react-hook-form'
import InputMask from 'react-input-mask'

export const PhoneInput = ({ name, control, placeholder, variant }: props) => {
  const {
    field: { onChange, onBlur, value, ref }
  } = useController({
    name,
    control,
    defaultValue: ''
  })
  return (
    <InputMask onChange={onChange} onBlur={onBlur} value={value} mask="(99) 9 9999-9999">
      {(inputProps: any) => (
        <Input type="tel" {...inputProps} ref={ref} placeholder={placeholder} variant={variant} />
      )}
    </InputMask>
  )
}

type props = {
  name: string
  placeholder?: string
  control: any
  variant?: string
}
