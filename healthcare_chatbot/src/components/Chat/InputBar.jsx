import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  addUserMessage,
  setSymptom,
  sendChatMessage,
  handleYes,
  handleNo,
  resetChat,
} from '../../features/chat/chatSlice'
import { startBooking , resetBooking} from '../../features/chat/appointmentSlice'

function extractDuration(text) {
  const lower = text.toLowerCase()
  const numberMatch = lower.match(/(\d+)/)
  if (!numberMatch) return null

  const value = parseInt(numberMatch[1], 10)

  if (lower.includes('year')) return value * 365
  if (lower.includes('month')) return value * 30
  if (lower.includes('week')) return value * 7

  return value // days by default
}


export default function InputBar() {
  const [text, setText] = useState('')
  const dispatch = useDispatch()
  const { stage, currentSymptom } = useSelector(state => state.chat)

  const send = () => {
    const input = text.trim()
    if (!input) return

    const lower = input.toLowerCase()

    /* --------------------------------------------------
       BOOKING (ALWAYS WORKS)
    -------------------------------------------------- */
    if (lower.includes('book')) {
      dispatch(addUserMessage(input))
      dispatch(startBooking())
      setText('')
      return
    }

    if (['restart', 'new chat', 'start again'].includes(lower)) {
        dispatch(resetChat())
        dispatch(resetBooking())
        setText('')
        return
    }


    /* --------------------------------------------------
       FOLLOW-UP YES / NO
    -------------------------------------------------- */
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

      // Anything else = new symptom
      dispatch(setSymptom(lower))
      setText('')
      return
    }

    /* --------------------------------------------------
       SYMPTOM STAGE
    -------------------------------------------------- */
    if (stage === 'SYMPTOM') {
      dispatch(addUserMessage(input))
      dispatch(setSymptom(lower))
      setText('')
      return
    }

    /* --------------------------------------------------
       DURATION STAGE (THIS WAS BROKEN BEFORE)
    -------------------------------------------------- */
    if (stage === 'ASK_DURATION') {
      dispatch(addUserMessage(input))

      const duration = extractDuration(lower)

      if (duration === null) {
        dispatch({
          type: 'chat/addBotMessage',
          payload: 'Please enter the number of days (e.g. 2 days or 3 days).',
        })
        setText('')
        return
      }

      // ✅ Correct order
      dispatch(
        sendChatMessage({
          symptom: currentSymptom,
          duration,
        })
      )

      setText('') // ✅ always clears
      return
    }

    /* --------------------------------------------------
       SAFETY NET
    -------------------------------------------------- */
    dispatch(addUserMessage(input))
    setText('')
  }

  return (
    <div className="px-6 py-4 border-t bg-white">
      <div className="flex items-center gap-3">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && send()}
          placeholder={
            stage === 'ASK_DURATION'
              ? 'For how many days? (e.g. 2 days)'
              : stage === 'FOLLOW_UP'
              ? 'Type yes or no, or ask something else...'
              : 'Describe your symptoms...'
          }
          className="flex-1 px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
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
