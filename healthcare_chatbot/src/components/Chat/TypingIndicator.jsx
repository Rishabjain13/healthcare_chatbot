export default function TypingIndicator() {
  return (
    <div className="flex items-center gap-2 text-xs text-gray-500 italic">
      <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"></span>
      <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce delay-100"></span>
      <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce delay-200"></span>
      AI is analyzing your symptoms…
    </div>
  )
}
