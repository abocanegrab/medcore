import { Box, VStack, Text, HStack, useColorModeValue } from '@chakra-ui/react'
import { useOutletContext } from 'react-router-dom'
import { Header, BentoCard } from '@medcore/ui'
import type { IconType } from 'react-icons'

interface PlaceholderPageProps {
  title: string
  description: string
  icon: IconType
  breadcrumbItems: { label: string }[]
  features: string[]
}

export default function PlaceholderPage({ title, description, icon: Icon, breadcrumbItems, features }: PlaceholderPageProps) {
  const { onMenuOpen } = useOutletContext<{ onMenuOpen: () => void }>()
  const accentColor = useColorModeValue('primary.500', 'primary.300')

  return (
    <Box>
      <Header
        title={title}
        subtitle={description}
        breadcrumbItems={breadcrumbItems}
        onMenuClick={onMenuOpen}
      />

      <Box px={{ base: 4, md: 8 }} pb={8}>
        <BentoCard maxW="2xl" mx="auto" textAlign="center" py={12}>
          <VStack spacing={6}>
            <Box
              p={4}
              borderRadius="2xl"
              bg={useColorModeValue('primary.50', 'primary.900')}
            >
              <Icon size={48} color={`var(--chakra-colors-primary-500)`} />
            </Box>
            <VStack spacing={2}>
              <Text fontSize="2xl" fontWeight="bold" fontFamily="heading">
                {title}
              </Text>
              <Text
                fontSize="lg"
                fontWeight="semibold"
                color={accentColor}
              >
                En Desarrollo
              </Text>
              <Text
                fontSize="sm"
                color={useColorModeValue('gray.500', 'gray.400')}
                maxW="md"
              >
                This module is currently under development. Key features planned:
              </Text>
            </VStack>

            <VStack spacing={2} align="start">
              {features.map((feature) => (
                <HStack key={feature} spacing={2}>
                  <Box w={1.5} h={1.5} borderRadius="full" bg={accentColor} />
                  <Text fontSize="sm" color={useColorModeValue('gray.600', 'gray.300')}>
                    {feature}
                  </Text>
                </HStack>
              ))}
            </VStack>
          </VStack>
        </BentoCard>
      </Box>
    </Box>
  )
}
