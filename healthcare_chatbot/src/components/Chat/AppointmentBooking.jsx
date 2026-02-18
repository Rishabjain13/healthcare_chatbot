import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  setMode,
  setDateTime,
  setContact,
} from '../../features/chat/appointmentSlice'
import { bookingCompleted } from '../../features/chat/chatSlice'

// Recommended availability (frontend-driven)
const availableDates = ['2026-02-19', '2026-02-20', '2026-02-21']
const availableTimes = ['10:00 AM', '11:30 AM', '02:00 PM', '04:30 PM']

export default function AppointmentBooking() {
  const dispatch = useDispatch()
  const booking = useSelector(state => state.appointment)

  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')

  /* ---------- STEP 1: MODE SELECTION ---------- */
  if (booking.step === 1) {
    return (
      <div className="max-w-md bg-white border border-gray-200 rounded-xl p-4 shadow-md">
        <p className="font-semibold text-gray-900 mb-1">
          Book Appointment
        </p>
        <p className="text-sm text-gray-700 mb-3">
          👨‍⚕️ Dr. Anil Sharma (General Physician)<br />
          📍 Apollo Clinic, Main Road<br />
          💰 ₹500 Consultation Fee
        </p>

        <div className="flex gap-3">
          <button
            onClick={() => dispatch(setMode('offline'))}
            className="flex-1 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Offline Visit
          </button>
          <button
            onClick={() => dispatch(setMode('online'))}
            className="flex-1 px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
          >
            Online Consultation
          </button>
        </div>
      </div>
    )
  }

  /* ---------- STEP 2: DATE & TIME ---------- */
  if (booking.step === 2) {
    return (
      <div className="max-w-md bg-white border rounded-xl p-4 shadow-sm space-y-4">
        <p className="font-semibold text-gray-900">
          Select Appointment Slot
        </p>

        {/* Date Selection */}
        <div>
          <p className="text-sm text-gray-600 mb-2">
            Recommended Available Dates
          </p>
          <div className="flex gap-2 flex-wrap">
            {availableDates.map(d => (
              <button
                key={d}
                onClick={() => setDate(d)}
                className={`px-3 py-1.5 rounded-lg border text-sm transition
                  ${
                    date === d
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white text-gray-700 hover:bg-blue-50'
                  }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* Time Selection */}
        <div>
          <p className="text-sm text-gray-600 mb-2">
            Available Time Slots
          </p>
          <div className="flex gap-2 flex-wrap">
            {availableTimes.map(t => (
              <button
                key={t}
                onClick={() => setTime(t)}
                className={`px-3 py-1.5 rounded-lg border text-sm transition
                  ${
                    time === t
                      ? 'bg-green-600 text-white border-green-600'
                      : 'bg-white text-gray-700 hover:bg-green-50'
                  }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <button
          disabled={!date || !time}
          onClick={() => dispatch(setDateTime({ date, time }))}
          className={`w-full mt-2 px-4 py-2 rounded-lg font-medium transition
            ${
              date && time
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
        >
          Continue
        </button>
      </div>
    )
  }

  /* ---------- STEP 3: CONTACT & CONFIRM ---------- */
  if (booking.step === 3) {
    return (
      <div className="max-w-md bg-white border rounded-xl p-4 shadow-sm space-y-3">
        <p className="font-semibold text-gray-900">
          Confirm Appointment
        </p>

        {/* Summary */}
        <div className="bg-gray-50 p-3 rounded-lg text-sm text-gray-700">
          <p><b>Doctor:</b> Dr. Anil Sharma</p>
          <p><b>Date:</b> {date}</p>
          <p><b>Time:</b> {time}</p>
          <p><b>Mode:</b> {booking.mode === 'online' ? 'Online' : 'Offline'}</p>
        </div>

        <input
          placeholder="Phone Number"
          value={phone}
          onChange={e => setPhone(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          placeholder="Email Address"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          disabled={!phone || !email}
          onClick={() => {
            dispatch(setContact({ phone, email }))
            dispatch(
              bookingCompleted({
                date,
                time,
                mode: booking.mode,
                })
            )
          }}
          className={`w-full mt-2 px-4 py-2 rounded-lg font-medium transition
            ${
              phone && email
                ? 'bg-green-600 text-white hover:bg-green-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
        >
          Confirm Appointment
        </button>
      </div>
    )
  }

  return null
}
