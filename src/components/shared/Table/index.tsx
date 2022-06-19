/* eslint-disable react/jsx-key */
import { Box, Flex, Icon, Table as ChakraTable, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import { MdOutlineArrowDropDown, MdOutlineArrowDropUp } from 'react-icons/md'
import { useGlobalFilter, useSortBy, useTable } from 'react-table'
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
        <Search filter={globalFilter} setFilter={setGlobalFilter} mb={8} ml={{ lg: 6 }} mt={4} />
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
                  display={{ base: 'none', lg: 'table-cell' }}
                >
                  <Flex alignItems="center" h={4}>
                    <>
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
                    </>
                  </Flex>
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()} display={{ base: 'block', lg: 'table-row-group' }}>
          {rows.map((row) => {
            prepareRow(row)
            return (
              <Tr
                {...row.getRowProps()}
                display={{ base: 'block', lg: 'table-row' }}
                mb={{ base: 4, lg: 0 }}
              >
                {row.cells.map((cell) => (
                  <Td
                    bgColor={{ base: 'white', lg: 'none' }}
                    borderRadius={{ base: 'lg', lg: 'none' }}
                    display={{ base: 'block', lg: 'table-cell' }}
                    borderColor="purple.200"
                    fontWeight="bold"
                    fontSize="sm"
                    color="text"
                    p={6}
                    maxW={cell.column.maxWidth || '215px'}
                    {...cell.getCellProps()}
                  >
                    <Box noOfLines={1}>
                      <>{cell.render('Cell')}</>
                    </Box>
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
