import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MessageBubble from './MessageBubble'
import AppointmentBooking from './AppointmentBooking'
import { startBooking } from '../../features/chat/appointmentSlice'
import TypingIndicator from './TypingIndicator'

export default function ChatWindow() {
  const dispatch = useDispatch()
  const { messages, stage, isTyping} = useSelector(state => state.chat)
  const bookingStep = useSelector(state => state.appointment.step)

  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, bookingStep, stage])

  return (
    <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 bg-gray-50">
      <div className="space-y-2">
        {messages.map((msg, i) => (
          <MessageBubble key={i} {...msg} />
        ))}

        {isTyping && (
          <div className="pl-12 mt-2">
            <TypingIndicator />
          </div>
        )}

        {/* Booking CTA */}
        {stage === 'RECOMMEND_BOOKING' && bookingStep === 0 && (
          <div className="pl-12 mt-3">
            <button
              onClick={() => dispatch(startBooking())}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-sm transition"
            >
              📅 Book Appointment
            </button>
          </div>
        )}

        {bookingStep > 0 && <AppointmentBooking />}
        <div ref={bottomRef} />
      </div>
    </div>
  )
}
