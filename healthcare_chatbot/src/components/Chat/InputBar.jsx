import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  addUserMessage,
  setSymptom,
  sendChatMessage,
  handleYes,
  handleNo,
  resetChat,
  addBotMessage,
} from '../../features/chat/chatSlice'
import {
  startBooking,
  resetBooking,
} from '../../features/chat/appointmentSlice'

function extractDuration(text) {
  const lower = text.toLowerCase()
  const numberMatch = lower.match(/(\d+)/)
  if (!numberMatch) return null

  const value = parseInt(numberMatch[1], 10)

  if (lower.includes('year')) return value * 365
  if (lower.includes('month')) return value * 30
  if (lower.includes('week')) return value * 7

  return value
}

export default function InputBar() {
  const [text, setText] = useState('')
  const dispatch = useDispatch()
  const { stage, currentSymptom } = useSelector(state => state.chat)

  const send = () => {
    const input = text.trim()
    if (!input) return

    const lower = input.toLowerCase()

    /* ---------------- BOOKING ---------------- */
    if (lower.includes('book')) {
      dispatch(startBooking())
      setText('')
      return
    }

    /* ---------------- RESET ---------------- */
    if (['restart', 'new chat', 'start again'].includes(lower)) {
      dispatch(resetChat())
      dispatch(resetBooking())
      setText('')
      return
    }

    /* ---------------- FOLLOW-UP ---------------- */
    if (stage === 'FOLLOW_UP') {
      dispatch(addUserMessage(input))

      if (lower === 'yes') {
        dispatch(handleYes())
        setText('')
        return
      }

      if (lower === 'no') {
        dispatch(handleNo())
        setText('')
        return
      }

      dispatch(setSymptom(lower))
      setText('')
      return
    }

    /* ---------------- SYMPTOM ---------------- */
    if (stage === 'SYMPTOM') {
      dispatch(addUserMessage(input))
      dispatch(setSymptom(lower))
      setText('')
      return
    }

    /* ---------------- DURATION ---------------- */
    if (stage === 'ASK_DURATION') {
      dispatch(addUserMessage(input))

      const duration = extractDuration(lower)

      if (duration === null) {
        dispatch(
          addBotMessage(
            'Please enter the number of days (e.g. 2 days or 3 days).'
          )
        )
        setText('')
        return
      }

      dispatch(
        sendChatMessage({
          symptom: currentSymptom,
          duration,
        })
      )

      setText('')
      return
    }

    setText('')
  }

  return (
    <div className="px-6 py-4 border-t bg-white">
      <div className="flex items-center gap-3">
        <input
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && send()}
          placeholder={
            stage === 'ASK_DURATION'
              ? 'For how many days? (e.g. 2 days)'
              : stage === 'FOLLOW_UP'
              ? 'Type yes or no, or ask something else...'
              : 'Describe your symptoms...'
          }
          className="flex-1 px-4 py-2 rounded-full border focus:outline-none focus:ring-2 focus:ring-primary"

        />

        <button
          onClick={send}
          className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
        >
          Send
        </button>
      </div>
    </div>
  )
}
