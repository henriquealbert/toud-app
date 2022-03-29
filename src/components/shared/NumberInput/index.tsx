import { Input, InputProps } from '@chakra-ui/input'
import { useController } from 'react-hook-form'
import NumberFormat from 'react-number-format'

export const NumberInput = ({ name, control, placeholder, ...props }: props) => {
  const {
    field: { onChange, onBlur, value, ref }
  } = useController({
    name,
    control,
    defaultValue: ''
  })
  return (
    <NumberFormat
      onChange={onChange}
      onBlur={onBlur}
      value={value}
      thousandSeparator={'.'}
      allowNegative={false}
      fixedDecimalScale
      decimalScale={2}
      decimalSeparator={','}
      prefix={'R$'}
      customInput={Input}
      ref={ref}
      placeholder={placeholder}
      {...props}
    />
  )
}

interface props extends InputProps {
  control: any
  name: string
  defaultValue?: string | number
  type?: 'text' | 'password' | 'tel' | undefined
}
