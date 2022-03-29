export const formatPrice = (value: string) => {
  const parsedValue = parseFloat(value || '0')
  return parsedValue.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2
  })
}
