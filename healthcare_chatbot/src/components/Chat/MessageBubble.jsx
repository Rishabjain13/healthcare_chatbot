export default function MessageBubble({ role, text }) {
  const isUser = role === 'user'

  return (
    <div
      className={`flex gap-3 items-end animate-slide-up ${
        isUser ? 'justify-end' : 'justify-start'
      }`}
    >
      {!isUser && (
        <div className="h-9 w-9 rounded-full bg-blue-100 text-blue-700  flex items-center justify-center shadow-sm">
          🤖
        </div>
      )}

      <div
        className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm
          ${
            isUser
              ? 'bg-blue-600 text-white rounded-br-sm'
              : 'bg-white dark:bg-slate-800  border border-gray-200  rounded-bl-sm'
          }`}
      >
        {text}
      </div>

      {isUser && (
        <div className="h-9 w-9 rounded-full bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-200 flex items-center justify-center shadow-sm">
          👤
        </div>
      )}
    </div>
  )
}
