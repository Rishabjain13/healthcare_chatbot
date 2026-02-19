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
        <div className="flex items-start gap-3">
          <div className="h-10 w-10 rounded-full bg-blue-100 text-white flex items-center justify-center">
            🤖
          </div>
        <div>
          <h1 className="text-lg font-semibold text-primary">
            Healthcare AI Assistant
          </h1>
          <p className="text-xs text-gray-500">
            AI-powered medical support
          </p>
        </div>
      </div>

      <button
        onClick={restart}
        className="px-5 py-2 text-sm rounded-lg bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white border transition"
        
      >
        🔄 New Chat
      </button>
    </div>
  )
}

