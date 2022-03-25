import { Box, Icon, useTheme } from '@chakra-ui/react'
import { MdSearch } from 'react-icons/md'
import Select, { Props } from 'react-select'

export const SelectInput = ({
  isSearchable = false,
  value,
  options,
  ...props
}: SelectInputProps) => {
  const chakraTheme = useTheme()

  const selectValue = options?.find((opt: any) => opt.value === value) || ''
  const showSearchIcon = isSearchable && !selectValue

  return (
    <Box position="relative">
      <Select
        {...props}
        options={options}
        value={selectValue}
        isClearable={isSearchable}
        styles={{
          control: (provided) => ({ ...provided, height: 45 }),
          menuList: (provided) => ({ ...provided, padding: 0, borderRadius: '4px' }),
          valueContainer: (provided) => ({ ...provided, paddingLeft: showSearchIcon ? 40 : 16 }),
          placeholder: (provided) => ({
            ...provided,
            color: chakraTheme.colors.gray[400],
            fontWeight: 300,
            fontFamily: 'Inter'
          }),
          dropdownIndicator: (provided, state) => ({
            ...provided,
            color: state.isFocused ? chakraTheme.colors.purple[500] : chakraTheme.colors.gray[400],
            '&:hover': {
              color: state.isFocused ? chakraTheme.colors.purple[500] : chakraTheme.colors.gray[400]
            }
          })
        }}
        theme={(theme) => ({
          ...theme,
          colors: {
            ...theme.colors,
            primary: chakraTheme.colors.purple[500],
            primary75: chakraTheme.colors.purple[400],
            primary50: chakraTheme.colors.purple[300],
            primary25: chakraTheme.colors.purple[200]
          }
        })}
      />
      {showSearchIcon && (
        <Box position="absolute" top="30%" left="16px">
          <Icon as={MdSearch} width="20px" height="20px" color="gray.400" />
        </Box>
      )}
    </Box>
  )
}

type SelectInputProps = Props
