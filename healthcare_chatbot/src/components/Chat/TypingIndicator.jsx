export default function TypingIndicator() {
  return (
    <div className="flex gap-3 items-end animate-pulse">
      <div className="h-9 w-9 rounded-full bg-blue-100 flex items-center justify-center">
        🤖
      </div>
      <div className="bg-white border border-gray-200 rounded-2xl px-4 py-2 text-sm italic text-gray-500 shadow-sm">
        Typing…
      </div>
    </div>
  )
}
