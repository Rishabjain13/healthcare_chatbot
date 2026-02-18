export default function MessageBubble({ role, text }) {
  const isUser = role === 'user'

  return (
    <div
      className={`flex gap-3 ${
        isUser ? 'justify-end' : 'justify-start'
      } items-center`}
    >
      {/* Bot Icon */}
      {!isUser && (
        <div
          className="
            h-9 w-9 shrink-0 rounded-full
            bg-linear-to-br from-sky-100 to-blue-200
            border border-blue-200
            text-blue-700
            flex items-center justify-center
            text-sm shadow-sm
          "
        >
          🤖
        </div>
      )}

      {/* Message Bubble */}
      <div
        className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm
          ${
            isUser
              ? 'bg-blue-600 text-white rounded-br-sm'
              : 'bg-white text-gray-800 border border-gray-200 rounded-bl-sm'
          }`}
      >
        {text}
      </div>

      {/* User Icon */}
      {isUser && (
        <div
          className="
            h-9 w-9 shrink-0 rounded-full
            bg-linear-to-br from-gray-100 to-gray-200
            border border-gray-300
            text-gray-700
            flex items-center justify-center
            text-sm shadow-sm
          "
        >
          👤
        </div>
      )}
    </div>
  )
}
