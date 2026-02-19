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
      <div className="flex items-center justify-between px-4 sm:px-6 py-4 bg-white border-b">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-blue-100 text-white flex items-center justify-center">
            🤖
          </div>
        <div>
          <h1 className="text-sm font-semibold text-gray-900">
            Healthcare AI Assistant
          </h1>
          <p className="text-xs text-gray-500">
            AI-powered medical support
          </p>
        </div>
      </div>

      <button
        onClick={restart}
        className="px-4 py-2 text-sm rounded-lg bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 transition"
        
      >
        🔄 New Chat
      </button>
    </div>
  )
}

