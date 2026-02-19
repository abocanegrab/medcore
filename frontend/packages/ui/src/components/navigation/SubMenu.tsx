import { VStack, Text, HStack, useColorModeValue } from '@chakra-ui/react'
import { motion, AnimatePresence } from 'framer-motion'

const MotionVStack = motion.create(VStack)

interface SubMenuItem {
  label: string
  path: string
}

interface SubMenuProps {
  items: SubMenuItem[]
  isOpen: boolean
  isExpanded: boolean
  activePath?: string
  onItemClick: (path: string) => void
}

export function SubMenu({ items, isOpen, isExpanded, activePath, onItemClick }: SubMenuProps) {
  const activeColor = useColorModeValue('primary.500', 'primary.300')
  const color = useColorModeValue('gray.500', 'gray.400')

  if (!isExpanded) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <MotionVStack
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          overflow="hidden"
          align="stretch"
          spacing={0}
          pl={10}
          mt={1}
        >
          {items.map((item) => (
            <HStack
              key={item.path}
              as="button"
              py={1.5}
              px={3}
              borderRadius="lg"
              cursor="pointer"
              onClick={() => onItemClick(item.path)}
              _hover={{ color: activeColor }}
            >
              <Text
                fontSize="xs"
                fontWeight={activePath === item.path ? 'semibold' : 'normal'}
                color={activePath === item.path ? activeColor : color}
              >
                {item.label}
              </Text>
            </HStack>
          ))}
        </MotionVStack>
      )}
    </AnimatePresence>
  )
}
