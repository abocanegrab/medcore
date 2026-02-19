import { LuFileText } from 'react-icons/lu'
import { TextAreaCard } from '@medcore/ui'
import { useSTT } from '../../hooks'

interface NotesTabProps {
  notes: string
  onNotesChange: (v: string) => void
}

export default function NotesTab({ notes, onNotesChange }: NotesTabProps) {
  const stt = useSTT({ onResult: onNotesChange })

  return (
    <TextAreaCard
      title="Notas Medicas"
      subtitle="Notas adicionales del medico"
      icon={LuFileText}
      placeholder="Escriba notas adicionales, observaciones clinicas, recomendaciones..."
      value={notes}
      onChange={onNotesChange}
      rows={12}
      showMic
      onMicToggle={stt.toggle}
      isMicListening={stt.isListening}
      isMicSupported={stt.isSupported}
    />
  )
}
