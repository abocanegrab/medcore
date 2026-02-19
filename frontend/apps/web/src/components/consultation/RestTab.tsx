import {
  Box,
  VStack,
  HStack,
  Text,
  Input,
  Textarea,
  useColorModeValue,
  Flex,
} from '@chakra-ui/react'
import { LuBedDouble } from 'react-icons/lu'
import { useSTT } from '../../hooks'
import { MicButton } from '@medcore/ui'
import type { RestCertificate } from '../../data/mockPatients'

interface RestTabProps {
  restCertificate: RestCertificate
  onRestCertificateChange: (v: RestCertificate) => void
}

export default function RestTab({ restCertificate, onRestCertificateChange }: RestTabProps) {
  const stt = useSTT({
    onResult: (text) => onRestCertificateChange({ ...restCertificate, reason: text }),
  })

  const cardBg = useColorModeValue('white', 'card.dark')
  const cardBorder = useColorModeValue('gray.100', 'gray.800')
  const titleColor = useColorModeValue('primary.500', 'white')
  const iconBg = useColorModeValue('rgba(0,39,82,0.05)', 'rgba(0,39,82,0.15)')
  const inputBg = useColorModeValue('gray.50', 'gray.800')
  const inputBorder = useColorModeValue('gray.200', 'gray.700')

  return (
    <Box bg={cardBg} borderRadius="3xl" p={5} shadow="soft" border="1px solid" borderColor={cardBorder}>
      <Flex align="center" justify="space-between" mb={5}>
        <HStack spacing={3}>
          <Flex w={10} h={10} borderRadius="xl" bg={iconBg} align="center" justify="center" color="primary.500">
            <LuBedDouble size={20} />
          </Flex>
          <Text fontSize="lg" fontWeight="bold" color={titleColor}>
            Certificado de Descanso Medico
          </Text>
        </HStack>
      </Flex>

      <VStack spacing={4} align="stretch" maxW="600px">
        <HStack spacing={4}>
          <Box>
            <Text fontSize="sm" fontWeight="medium" mb={1}>Dias de descanso</Text>
            <Input
              type="number"
              value={restCertificate.days}
              onChange={(e) =>
                onRestCertificateChange({ ...restCertificate, days: parseInt(e.target.value) || 0 })
              }
              size="sm"
              borderRadius="xl"
              w="100px"
              bg={inputBg}
              borderColor={inputBorder}
            />
          </Box>
          <Box>
            <Text fontSize="sm" fontWeight="medium" mb={1}>Fecha de inicio</Text>
            <Input
              type="date"
              value={restCertificate.startDate}
              onChange={(e) =>
                onRestCertificateChange({ ...restCertificate, startDate: e.target.value })
              }
              size="sm"
              borderRadius="xl"
              w="180px"
              bg={inputBg}
              borderColor={inputBorder}
            />
          </Box>
        </HStack>

        <Box>
          <Flex align="center" justify="space-between" mb={1}>
            <Text fontSize="sm" fontWeight="medium">Motivo del descanso</Text>
            <MicButton
              isListening={stt.isListening}
              onClick={stt.toggle}
              isSupported={stt.isSupported}
              size="xs"
            />
          </Flex>
          <Textarea
            value={restCertificate.reason}
            onChange={(e) =>
              onRestCertificateChange({ ...restCertificate, reason: e.target.value })
            }
            placeholder="Describa el motivo del descanso medico..."
            size="sm"
            borderRadius="xl"
            rows={4}
            resize="none"
            bg={inputBg}
            borderColor={inputBorder}
          />
        </Box>
      </VStack>
    </Box>
  )
}
