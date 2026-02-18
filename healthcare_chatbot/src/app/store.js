import { configureStore } from '@reduxjs/toolkit'
import chatReducer from '../features/chat/chatSlice'
import appointmentReducer from '../features/chat/appointmentSlice'

export const store = configureStore({
  reducer: {
    chat: chatReducer,
    appointment: appointmentReducer,
  },
})
