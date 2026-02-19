import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  setMode,
  setDate,
  setTime,
  setPhone,
  setEmail,
} from '../../features/chat/appointmentSlice'
import {
  askDate,
  askTime,
  askPhone,
  askEmail,
  bookingCompleted,
  addUserMessage,
} from '../../features/chat/chatSlice'

const availableDates = ['2026-02-19', '2026-02-20', '2026-02-21']
const availableTimes = ['10:00 AM', '11:30 AM', '02:00 PM', '04:30 PM']

const isValidPhone = phone => /^\d{10}$/.test(phone)
const isValidEmail = email =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

const botAlignClass = 'ml-12 mt-2 max-w-[75%]'

export default function AppointmentBooking() {
  const dispatch = useDispatch()
  const booking = useSelector(state => state.appointment)
  const [input, setInput] = useState('')
  const [error, setError] = useState('')

  const submitInput = (validator, nextAction) => {
    if (!validator(input)) {
      setError('Invalid input. Please check and try again.')
      return
    }
    dispatch(addUserMessage(input))
    nextAction(input)
    setInput('')
    setError('')
  }

  /* STEP 1: MODE */
  if (booking.step === 1) {
    return (
      <div className={`${botAlignClass} flex gap-3`}>
        {['online', 'offline'].map(mode => (
          <button
            key={mode}
            onClick={() => {
              dispatch(addUserMessage(mode))
              dispatch(setMode(mode))
              dispatch(askDate())
            }}
            className="px-4 py-2 rounded-lg text-white font-medium
                       bg-blue-600 hover:bg-blue-700 transition"
          >
            {mode.charAt(0).toUpperCase() + mode.slice(1)}
          </button>
        ))}
      </div>
    )
  }

  /* STEP 2: DATE */
  if (booking.step === 2) {
    return (
      <div className={`${botAlignClass} flex flex-wrap gap-2`}>
        {availableDates.map(d => (
          <button
            key={d}
            onClick={() => {
              dispatch(addUserMessage(d))
              dispatch(setDate(d))
              dispatch(askTime())
            }}
            className="px-3 py-2 border rounded-lg bg-white hover:bg-blue-50 transition"
          >
            {d}
          </button>
        ))}
      </div>
    )
  }

  /* STEP 3: TIME */
  if (booking.step === 3) {
    return (
      <div className={`${botAlignClass} flex flex-wrap gap-2`}>
        {availableTimes.map(t => (
          <button
            key={t}
            onClick={() => {
              dispatch(addUserMessage(t))
              dispatch(setTime(t))
              dispatch(askPhone())
            }}
            className="px-3 py-2 border rounded-lg bg-white hover:bg-green-50 transition"
          >
            {t}
          </button>
        ))}
      </div>
    )
  }

  /* STEP 4 & 5: INPUT */
  if (booking.step === 4 || booking.step === 5) {
    const isPhoneStep = booking.step === 4

    return (
      <div className={botAlignClass}>
        <input
          value={input}
          placeholder={isPhoneStep ? '10-digit phone number' : 'Email address'}
          onChange={e => setInput(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />

        {error && (
          <p className="mt-1 text-sm text-red-600">{error}</p>
        )}

        <button
          onClick={() =>
            isPhoneStep
              ? submitInput(isValidPhone, v => {
                  dispatch(setPhone(v))
                  dispatch(askEmail())
                })
              : submitInput(isValidEmail, v => {
                  dispatch(setEmail(v))
                  dispatch(
                    bookingCompleted({
                      date: booking.date,
                      time: booking.time,
                      mode: booking.mode,
                    })
                  )
                })
          }
          className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Continue
        </button>
      </div>
    )
  }

  return null
}
