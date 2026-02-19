import { useState, useEffect } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  VStack,
  Text,
  Spinner,
  useColorModeValue,
  Flex,
  Box,
} from '@chakra-ui/react'
import { keyframes } from '@emotion/react'
import { LuShieldCheck, LuCircleCheck } from 'react-icons/lu'
import { signDocument } from '../services/mockRENIEC'

const pulse = keyframes`
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.1); opacity: 0.7; }
  100% { transform: scale(1); opacity: 1; }
`

interface SigningModalProps {
  isOpen: boolean
  onClose: () => void
  onComplete: (signatureId: string) => void
}

export default function SigningModal({ isOpen, onClose, onComplete }: SigningModalProps) {
  const [stage, setStage] = useState<'signing' | 'success'>('signing')
  const [signatureId, setSignatureId] = useState('')

  const bg = useColorModeValue('white', 'gray.800')

  useEffect(() => {
    if (!isOpen) {
      setStage('signing')
      setSignatureId('')
      return
    }

    signDocument().then(({ signatureId: sid }) => {
      setSignatureId(sid)
      setStage('success')
      setTimeout(() => {
        onComplete(sid)
      }, 1500)
    })
  }, [isOpen])

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm" isCentered closeOnOverlayClick={false}>
      <ModalOverlay bg="blackAlpha.600" backdropFilter="blur(4px)" />
      <ModalContent bg={bg} borderRadius="2xl" mx={4}>
        <ModalBody py={10}>
          <VStack spacing={5}>
            {stage === 'signing' ? (
              <>
                <Flex
                  w={16}
                  h={16}
                  borderRadius="full"
                  bg="primary.50"
                  align="center"
                  justify="center"
                  color="primary.500"
                  animation={`${pulse} 1.5s infinite`}
                >
                  <LuShieldCheck size={32} />
                </Flex>
                <Text fontSize="lg" fontWeight="bold" textAlign="center">
                  Firmando documento...
                </Text>
                <Text fontSize="sm" color="gray.500" textAlign="center">
                  Verificacion biometrica RENIEC en proceso
                </Text>
                <Spinner color="primary.500" size="md" />
              </>
            ) : (
              <>
                <Flex
                  w={16}
                  h={16}
                  borderRadius="full"
                  bg="green.50"
                  align="center"
                  justify="center"
                  color="green.500"
                >
                  <LuCircleCheck size={32} />
                </Flex>
                <Text fontSize="lg" fontWeight="bold" textAlign="center" color="green.600">
                  Documento firmado
                </Text>
                <Box
                  bg={useColorModeValue('gray.50', 'gray.700')}
                  borderRadius="xl"
                  px={4}
                  py={2}
                >
                  <Text fontSize="xs" fontFamily="mono" color="gray.500">
                    {signatureId}
                  </Text>
                </Box>
              </>
            )}
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
