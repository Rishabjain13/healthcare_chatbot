import { useDispatch } from 'react-redux'
import { resetChat } from '../../features/chat/chatSlice'
import { resetBooking } from '../../features/chat/appointmentSlice'

export default function Header() {
  const dispatch = useDispatch()

  const restart = () => {
    dispatch(resetChat())
    dispatch(resetBooking())
  }

  return (
    <div className="flex items-center justify-between px-6 py-4 bg-white border-b">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-linear-to-br from-sky-100 to-blue-200 text-white flex items-center justify-center font-semibold">
          🤖
        </div>
        <div>
          <h1 className="text-base font-semibold text-gray-900">
            Healthcare AI Assistant
          </h1>
          <p className="text-xs text-gray-500">
            AI-powered medical support
          </p>
        </div>
      </div>

      <button
        onClick={restart}
        className="
            px-4 py-2 text-sm font-medium rounded-lg
            bg-linear-to-r from-sky-50 to-blue-100
            text-blue-700
            border border-blue-200
            hover:from-sky-100 hover:to-blue-200
            transition
        "
        
      >
        🔄 New Chat
      </button>
    </div>
  )
}

