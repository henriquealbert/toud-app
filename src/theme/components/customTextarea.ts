export const customTextarea = {
  variants: {
    outline: {
      color: 'black',
      borderColor: 'border',
      borderRadius: 'base',
      bgColor: 'white',
      _focus: {
        borderColor: 'purple.500',
        boxShadow: '0 0 0 1px var(--chakra-colors-purple-500)'
      },
      _placeholder: {
        fontWeight: 'light'
      }
    }
  }
}
