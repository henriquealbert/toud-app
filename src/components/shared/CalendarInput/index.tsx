import { useRef } from 'react'
import ptBR from 'date-fns/locale/pt-BR'
import { Calendar } from 'react-date-range'

import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'

import { addBusinessDays } from 'date-fns'
import { FiCalendar } from 'react-icons/fi'
import { Input, Icon, Box, useTheme, useOutsideClick, useBoolean } from '@chakra-ui/react'

export const CalendarInput = ({
  name,
  placeholder,
  onChange,
  value,
  onBlur,
  isInvalid,
  inputRef
}: CalendarInputProps) => {
  const ref = useRef(null)
  const { colors } = useTheme()
  const [isOpen, setOpen] = useBoolean()

  useOutsideClick({
    ref: ref,
    handler: () => setOpen.off()
  })

  const minDate = addBusinessDays(new Date(), 1)

  return (
    <Box pos="relative" ref={ref}>
      <Box pos="relative">
        <Input
          name={name}
          variant="outlineWhite"
          placeholder={placeholder}
          pl={12}
          onFocus={() => {
            setOpen.on()
            if (!value) {
              onChange && onChange(minDate)
            }
          }}
          isReadOnly
          cursor="pointer"
          onBlur={onBlur}
          defaultValue={value?.toLocaleDateString('pt-BR')}
          isInvalid={isInvalid}
          ref={inputRef}
        />
        <Icon
          as={FiCalendar}
          w="22px"
          h="22px"
          color="gray.400"
          pos="absolute"
          left="16px"
          top="25%"
        />
      </Box>
      <Box
        hidden={!isOpen}
        pos="absolute"
        left="0"
        top="32px"
        borderRadius="base"
        zIndex="popover"
        boxShadow="xl"
        overflow="hidden"
      >
        <Calendar
          locale={ptBR}
          displayMode="date"
          date={value}
          onChange={(item) => onChange && onChange(item)}
          minDate={minDate}
          dragSelectionEnabled={false}
          weekdayDisplayFormat="EEEEEE"
          color={colors.purple[500]}
          showMonthAndYearPickers={false}
        />
      </Box>
    </Box>
  )
}

type CalendarInputProps = {
  placeholder?: string
  value: Date | undefined
  onChange: (date: Date) => void
  name?: string
  onBlur?: (e: any) => void
  isInvalid?: boolean
  inputRef?: any
}
