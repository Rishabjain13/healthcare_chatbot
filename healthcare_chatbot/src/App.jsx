import { useContext } from 'react'
import { ConsentContext } from './context/ConsentContext'
import ChatPage from './pages/ChatPage'
import ConsentPage from './pages/ConsentPage'

export default function App() {
  const { accepted } = useContext(ConsentContext)
  return accepted ? <ChatPage /> : <ConsentPage />
}
