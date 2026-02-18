import Header from '../components/Layout/Header'
import ChatWindow from '../components/Chat/ChatWindow'
import InputBar from '../components/Chat/InputBar'

export default function ChatPage() {
  return (
    <div className="min-h-screen w-full bg-linear-to-br from-sky-50 via-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="w-full max-w-5xl h-[95vh] bg-white rounded-2xl shadow-xl flex flex-col overflow-hidden">
        <Header />
        <ChatWindow />
        <InputBar />
      </div>
    </div>
  )
}
