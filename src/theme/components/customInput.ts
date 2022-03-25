export const customInput = {
  variants: {
    outline: {
      field: {
        color: 'black',
        borderColor: 'border',
        borderRadius: 'base',
        _focus: {
          borderColor: 'purple.500'
        },
        _placeholder: {
          fontWeight: 'light'
        }
      }
    },
    outlineWhite: {
      field: {
        color: 'black',
        h: 45,
        w: 'full',
        border: '1px solid',
        borderColor: 'border',
        borderRadius: 'base',
        _focus: {
          borderColor: 'purple.500'
        },
        _placeholder: {
          fontWeight: 'light'
        },
        _invalid: {
          borderColor: 'red.500'
        }
      }
    }
  }
}
