import { useState, useCallback, useRef } from 'react'

interface SpeechRecognitionEvent {
  results: SpeechRecognitionResultList
  resultIndex: number
}

interface UseSTTOptions {
  onResult?: (text: string) => void
  lang?: string
}

export function useSTT(options: UseSTTOptions = {}) {
  const { onResult, lang = 'es-ES' } = options
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const recognitionRef = useRef<any>(null)

  const SpeechRecognition =
    typeof window !== 'undefined'
      ? (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
      : null

  const isSupported = !!SpeechRecognition

  const start = useCallback(() => {
    if (!SpeechRecognition || isListening) return

    const recognition = new SpeechRecognition()
    recognition.continuous = true
    recognition.interimResults = true
    recognition.lang = lang

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let finalText = ''
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i]
        if (result.isFinal) {
          finalText += result[0].transcript
        }
      }
      if (finalText) {
        setTranscript((prev) => {
          const newText = prev ? `${prev} ${finalText}` : finalText
          onResult?.(newText)
          return newText
        })
      }
    }

    recognition.onerror = () => {
      setIsListening(false)
    }

    recognition.onend = () => {
      setIsListening(false)
    }

    recognitionRef.current = recognition
    recognition.start()
    setIsListening(true)
  }, [SpeechRecognition, isListening, lang, onResult])

  const stop = useCallback(() => {
    recognitionRef.current?.stop()
    setIsListening(false)
  }, [])

  const toggle = useCallback(() => {
    if (isListening) {
      stop()
    } else {
      setTranscript('')
      start()
    }
  }, [isListening, start, stop])

  return { isListening, transcript, start, stop, toggle, isSupported }
}
