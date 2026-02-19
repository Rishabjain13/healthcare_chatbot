import Header from '../components/Layout/Header'
import ChatWindow from '../components/Chat/ChatWindow'
import InputBar from '../components/Chat/InputBar'

export default function ChatPage() {
  return (
    <div className="min-h-screen w-full bg-blue-50 flex items-center justify-center px-2 sm:px-4">
      <div className="w-full max-w-5xl h-[95vh] bg-white rounded-2xl shadow-xl flex flex-col overflow-hidden">
        <Header />
        <ChatWindow />
        <InputBar />
      </div>
    </div>
  )
}
