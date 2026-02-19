import { IconButton } from '@chakra-ui/react'
import { keyframes } from '@emotion/react'
import { LuVolume2 } from 'react-icons/lu'

const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(59,130,246,0.4); }
  70% { box-shadow: 0 0 0 8px rgba(59,130,246,0); }
  100% { box-shadow: 0 0 0 0 rgba(59,130,246,0); }
`

interface SpeakerButtonProps {
  onClick: () => void
  isActive?: boolean
  size?: 'xs' | 'sm' | 'md'
  'aria-label'?: string
}

export function SpeakerButton({ onClick, isActive, size = 'sm', 'aria-label': ariaLabel = 'Call patient' }: SpeakerButtonProps) {
  return (
    <IconButton
      aria-label={ariaLabel}
      icon={<LuVolume2 size={size === 'xs' ? 14 : 16} />}
      size={size}
      colorScheme="blue"
      variant={isActive ? 'solid' : 'ghost'}
      borderRadius="lg"
      animation={isActive ? `${pulse} 1.5s infinite` : undefined}
      onClick={onClick}
    />
  )
}
