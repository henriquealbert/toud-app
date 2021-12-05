export const customButton = {
  baseStyle: {
    borderRadius: 'base',
    fontWeight: 'bold',
    color: 'white',
    textTransform: 'uppercase',
    py: 4,
    w: 'full'
  },
  variants: {
    secondary: {
      bg: 'purple.200',
      color: 'purple.500',
      _hover: {
        bg: 'purple.300'
      },
      _active: {
        bg: 'purple.400'
      }
    }
  }
}
