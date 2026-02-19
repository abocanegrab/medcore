import { IconButton } from '@chakra-ui/react'
import { keyframes } from '@emotion/react'
import { LuMic, LuMicOff } from 'react-icons/lu'

const pulseRed = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(239,68,68,0.4); }
  70% { box-shadow: 0 0 0 8px rgba(239,68,68,0); }
  100% { box-shadow: 0 0 0 0 rgba(239,68,68,0); }
`

interface MicButtonProps {
  isListening: boolean
  onClick: () => void
  isSupported?: boolean
  size?: 'xs' | 'sm' | 'md'
  'aria-label'?: string
}

export function MicButton({ isListening, onClick, isSupported = true, size = 'sm', 'aria-label': ariaLabel = 'Toggle microphone' }: MicButtonProps) {
  if (!isSupported) return null

  return (
    <IconButton
      aria-label={ariaLabel}
      icon={isListening ? <LuMic size={size === 'xs' ? 14 : 16} /> : <LuMicOff size={size === 'xs' ? 14 : 16} />}
      size={size}
      colorScheme={isListening ? 'red' : 'gray'}
      variant={isListening ? 'solid' : 'ghost'}
      borderRadius="lg"
      animation={isListening ? `${pulseRed} 1.5s infinite` : undefined}
      onClick={onClick}
    />
  )
}
