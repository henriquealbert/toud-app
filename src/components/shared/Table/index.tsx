/* eslint-disable react/jsx-key */
import { useTable, useSortBy, useGlobalFilter } from 'react-table'
import { MdOutlineArrowDropDown, MdOutlineArrowDropUp } from 'react-icons/md'
import { Box, Flex, Icon, Table as ChakraTable, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'

import { Search } from './Search'

export const Table = ({
  data,
  columns,
  isSearchable = true,
  initialState
}: {
  data: any
  columns: any
  isSearchable?: boolean
  initialState: any
}) => {
  const {
    state,
    setGlobalFilter,
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable(
    {
      columns,
      data,
      initialState
    },
    useGlobalFilter,
    useSortBy
  )
  const { globalFilter } = state
  return (
    <Box>
      {isSearchable && (
        <Search filter={globalFilter} setFilter={setGlobalFilter} mb={8} ml={6} mt={4} />
      )}

      <ChakraTable {...getTableProps()}>
        <Thead>
          {headerGroups.map((headerGroup) => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <Th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  _hover={{ textDecor: 'underline' }}
                  border="none"
                  fontSize="xs"
                  textTransform="none"
                  color="text"
                  letterSpacing="normal"
                  fontWeight="normal"
                  maxW={column.maxWidth || '215px'}
                >
                  <Flex alignItems="center" h={4}>
                    {column.render('Header')}
                    <Box h={4}>
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <Icon as={MdOutlineArrowDropUp} ml={0.5} w={4} h={4} />
                        ) : (
                          <Icon as={MdOutlineArrowDropDown} ml={0.5} w={4} h={4} />
                        )
                      ) : (
                        ''
                      )}
                    </Box>
                  </Flex>
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row)
            return (
              <Tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <Td
                    borderColor="purple.200"
                    fontWeight="bold"
                    fontSize="sm"
                    color="text"
                    p={6}
                    isTruncated
                    maxW={cell.column.maxWidth || '215px'}
                    {...cell.getCellProps()}
                  >
                    {cell.render('Cell')}
                  </Td>
                ))}
              </Tr>
            )
          })}
        </Tbody>
      </ChakraTable>
    </Box>
  )
}
