import { useDispatch, useSelector } from 'react-redux'
import MessageBubble from './MessageBubble'
import AppointmentBooking from './AppointmentBooking'
import { startBooking } from '../../features/chat/appointmentSlice'

export default function ChatWindow() {
  const dispatch = useDispatch()
  const { messages, stage } = useSelector(state => state.chat)
  const bookingStep = useSelector(state => state.appointment.step)

  return (
    <div className="flex-1 px-6 py-4 overflow-y-auto bg-linear-to-b from-gray-50 to-white space-y-4">
      {messages.map((msg, i) => (
        <MessageBubble key={i} {...msg} />
      ))}

      {/* Booking CTA */}
      {stage === 'RECOMMEND_BOOKING' && bookingStep === 0 && (
        <button
          onClick={() => dispatch(startBooking())}
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-sm transition"
        >
          📅 Book Appointment
        </button>
      )}

      {/* Booking UI */}
      {bookingStep > 0 && <AppointmentBooking />}
    </div>
  )
}
