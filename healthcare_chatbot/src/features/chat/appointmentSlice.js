import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  step: 0,          // 0 = idle
  mode: null,       // online | offline
  date: '',
  time: '',
  phone: '',
  email: '',
}

const appointmentSlice = createSlice({
  name: 'appointment',
  initialState,

  reducers: {
    startBooking(state) {
      // 🔒 FORCE RESET EVERY TIME
      state.step = 1
      state.mode = null
      state.date = ''
      state.time = ''
      state.phone = ''
      state.email = ''
    },

    setMode(state, action) {
      state.mode = action.payload
      state.step = 2
    },

    setDateTime(state, action) {
      state.date = action.payload.date
      state.time = action.payload.time
      state.step = 3
    },

    setContact(state, action) {
      state.phone = action.payload.phone
      state.email = action.payload.email
      state.step = 4 // confirmed
    },

    resetBooking() {
      return initialState
    },
  },
})

export const {
  startBooking,
  setMode,
  setDateTime,
  setContact,
  resetBooking,
} = appointmentSlice.actions

export default appointmentSlice.reducer
