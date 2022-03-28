import { Flex, Icon } from '@chakra-ui/react'
import { useAuth } from 'contexts/AuthContext'
import { api } from 'lib/api'
import { useSession } from 'next-auth/react'
import { ChangeEvent, useRef } from 'react'
import { FiUpload } from 'react-icons/fi'

export const UploadFiles = ({ onChange, accept = '*' }: UploadFilesProps) => {
  const { user } = useAuth()
  const { data: session } = useSession()
  const inputRef = useRef<HTMLInputElement>(null)

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    const form = new FormData()
    for (let i = 0; i < files.length; i++) {
      form.append('files', files[i])
    }
    form.append('data', JSON.stringify({ userId: user?.id }))

    const resp = await api.post('/files', form, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${session?.accessToken}`
      }
    })
    onChange && onChange(e.target.files)
  }

  return (
    <Flex
      h="60px"
      justify="center"
      align="center"
      bg="white"
      borderRadius="base"
      border="dashed"
      borderColor="gray.300"
      cursor="pointer"
      color="purple.500"
      _hover={{
        bgColor: 'gray.50'
      }}
      _active={{
        bgColor: 'gray.100'
      }}
      role="button"
      onClick={() => {
        inputRef?.current?.click()
      }}
    >
      <Icon as={FiUpload} mr={4} h="18px" w="18px" /> Clique para escolher o arquivo e fazer upload{' '}
      <input
        type="file"
        hidden
        ref={inputRef}
        onChange={handleChange}
        onClick={(e: any) => (e.target.value = null)}
        multiple
        accept={accept}
      />
    </Flex>
  )
}

type UploadFilesProps = {
  onChange: (files: FileList | null) => void
  accept?: string
}
