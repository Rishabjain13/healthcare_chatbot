import { configureStore } from '@reduxjs/toolkit'
import chatReducer from '../features/chat/chatSlice'
import emergencyReducer from '../features/chat/emergencySlice'
import appointmentReducer from '../features/chat/appointmentSlice'

export const store = configureStore({
  reducer: {
    chat: chatReducer,
    emergency: emergencyReducer,
    appointment: appointmentReducer,
  },
})
