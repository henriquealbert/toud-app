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
    success: {
      bg: '#0BCD41',
      color: 'white',
      _hover: {
        bg: 'green.400'
      },
      _active: {
        bg: 'green.500'
      },
      _disabled: {
        _hover: {
          bgColor: '#0BCD41 !important'
        }
      }
    },
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
