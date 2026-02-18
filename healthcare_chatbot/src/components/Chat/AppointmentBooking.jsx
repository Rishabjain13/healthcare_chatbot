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

// Available options
const availableDates = ['2026-02-19', '2026-02-20', '2026-02-21']
const availableTimes = ['10:00 AM', '11:30 AM', '02:00 PM', '04:30 PM']

// Validation
const isValidPhone = phone => /^\d{10}$/.test(phone)
const isValidEmail = email =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

/* ✅ Shared alignment with bot messages */
const botAlignClass = 'ml-12 mt-1 max-w-[75%]'

export default function AppointmentBooking() {
  const dispatch = useDispatch()
  const booking = useSelector(state => state.appointment)
  const [input, setInput] = useState('')

  /* ---------- STEP 1: MODE ---------- */
  if (booking.step === 1) {
    return (
      <div className={`${botAlignClass} flex gap-3`}>
        <button
          onClick={() => {
            dispatch(addUserMessage('Online'))
            dispatch(setMode('online'))
            dispatch(askDate())
          }}
          className="px-4 py-2 bg-green-600 text-white rounded-lg"
        >
          Online
        </button>

        <button
          onClick={() => {
            dispatch(addUserMessage('Offline'))
            dispatch(setMode('offline'))
            dispatch(askDate())
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          Offline
        </button>
      </div>
    )
  }

  /* ---------- STEP 2: DATE ---------- */
  if (booking.step === 2) {
    return (
      <div className={`${botAlignClass} flex gap-2 flex-wrap`}>
        {availableDates.map(d => (
          <button
            key={d}
            onClick={() => {
              dispatch(addUserMessage(d))
              dispatch(setDate(d))
              dispatch(askTime())
            }}
            className="px-3 py-1.5 border rounded-lg bg-white hover:bg-blue-50"
          >
            {d}
          </button>
        ))}
      </div>
    )
  }

  /* ---------- STEP 3: TIME ---------- */
  if (booking.step === 3) {
    return (
      <div className={`${botAlignClass} flex gap-2 flex-wrap`}>
        {availableTimes.map(t => (
          <button
            key={t}
            onClick={() => {
              dispatch(addUserMessage(t))
              dispatch(setTime(t))
              dispatch(askPhone())
            }}
            className="px-3 py-1.5 border rounded-lg bg-white hover:bg-green-50"
          >
            {t}
          </button>
        ))}
      </div>
    )
  }

  /* ---------- STEP 4: PHONE ---------- */
  if (booking.step === 4) {
    return (
      <div className={botAlignClass}>
        <input
          value={input}
          placeholder="Enter phone number"
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              if (!isValidPhone(input)) {
                alert('Enter valid 10-digit phone number')
                return
              }
              dispatch(addUserMessage(input))
              dispatch(setPhone(input))
              setInput('')
              dispatch(askEmail())
            }
          }}
          className="w-full px-3 py-2 border rounded-lg"
        />
      </div>
    )
  }

  /* ---------- STEP 5: EMAIL ---------- */
  if (booking.step === 5) {
    return (
      <div className={botAlignClass}>
        <input
          value={input}
          placeholder="Enter email address"
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              if (!isValidEmail(input)) {
                alert('Enter valid email address')
                return
              }

              dispatch(addUserMessage(input))
              dispatch(setEmail(input))

              dispatch(
                bookingCompleted({
                  date: booking.date,
                  time: booking.time,
                  mode: booking.mode,
                })
              )
            }
          }}
          className="w-full px-3 py-2 border rounded-lg"
        />
      </div>
    )
  }

  return null
}
