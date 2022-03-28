import { Flex, Icon, Spinner } from '@chakra-ui/react'
import { useAuth } from 'contexts/AuthContext'
import { api } from 'lib/api'
import { useSession } from 'next-auth/react'
import { ChangeEvent, useRef, useState } from 'react'
import { FiUpload } from 'react-icons/fi'
import { MdDone } from 'react-icons/md'

export const UploadFiles = ({ onChange, accept = '*', campaignId }: UploadFilesProps) => {
  const { user } = useAuth()
  const { data: session } = useSession()
  const inputRef = useRef<HTMLInputElement>(null)
  const [status, setStatus] = useState('')

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setStatus('loading')
    const files = e.target.files
    if (!files) return

    const form = new FormData()
    for (let i = 0; i < files.length; i++) {
      form.append('files', files[i])
    }
    form.append('data', JSON.stringify({ userId: user?.id, campaignId }))

    const { data, error } = (await api.post('/files', form, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${session?.accessToken}`
      }
    })) as any

    if (error) {
      setStatus('')
      return alert('Erro ao enviar arquivos')
    }

    onChange && onChange(data)
    setStatus('success')
  }

  return (
    <Flex
      h="60px"
      align="center"
      bg="white"
      px={5}
      borderRadius="base"
      border="dashed"
      borderColor="gray.300"
      cursor={!status ? 'pointer' : 'not-allowed'}
      color="purple.500"
      _hover={{
        bgColor: !status ? 'gray.50' : 'white'
      }}
      _active={{
        bgColor: !status ? 'gray.100' : 'white'
      }}
      role="button"
      onClick={() => {
        if (!status) {
          inputRef?.current?.click()
        }
      }}
    >
      {status === 'loading' && <Spinner mx="auto" />}
      {status === 'success' && (
        <>
          <Icon as={MdDone} h="20px" w="20px" mr={4} />
          <span>Uploads concluídos</span>
        </>
      )}
      {!status && (
        <>
          <Icon as={FiUpload} mr={4} h="18px" w="18px" />
          <span>Clique para escolher o arquivo e fazer upload</span>
        </>
      )}
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
  campaignId: string
}
