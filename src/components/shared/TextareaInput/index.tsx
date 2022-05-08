import { Box, Flex, Textarea, TextareaProps } from '@chakra-ui/react'
import { forwardRef, useState } from 'react'

const MAX_LENGTH = 230

export const TextareaInput = forwardRef(
  ({ onChange, value, ...props }: TextareaProps, ref: any) => {
    const [_value, _setValue] = useState(value as string)

    return (
      <Flex position="relative">
        <Textarea
          maxLength={MAX_LENGTH}
          ref={ref}
          value={_value}
          resize="none"
          onChange={(e) => {
            _setValue(e.target.value)
            onChange && onChange(e)
          }}
          {...props}
        />
        <Box
          as="span"
          zIndex="docked"
          position="absolute"
          bottom="8px"
          right="12px"
          fontSize="xs"
          color="text"
          pointerEvents="none"
        >
          {_value?.length}/{MAX_LENGTH} caracteres
        </Box>
      </Flex>
    )
  }
)

TextareaInput.displayName = 'TextareaInput'
