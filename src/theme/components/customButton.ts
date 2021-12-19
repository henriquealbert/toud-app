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
    },
    link: {
      fontWeight: 'normal',
      textTransform: 'none',
      w: 'auto',
      cursor: 'pointer'
    },
    sidebar: {
      fontWeight: 'normal',
      textTransform: 'none',
      w: 'auto',
      cursor: 'pointer',
      p: 0,
      m: 0,
      h: 'auto',
      _hover: {
        color: 'purple.500'
      },
      _focus: {
        boxShadow: 'none'
      }
    }
  }
}
