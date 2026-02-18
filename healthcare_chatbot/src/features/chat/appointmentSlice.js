import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  step: 0, // 0 idle | 1 mode | 2 date | 3 time | 4 phone | 5 email | 6 done
  mode: null,
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
      return { ...initialState, step: 1 }
    },

    setMode(state, action) {
      state.mode = action.payload
      state.step = 2
    },

    setDate(state, action) {
      state.date = action.payload
      state.step = 3
    },

    setTime(state, action) {
      state.time = action.payload
      state.step = 4
    },

    setPhone(state, action) {
      state.phone = action.payload
      state.step = 5
    },

    setEmail(state, action) {
      state.email = action.payload
      state.step = 6
    },

    resetBooking() {
      return initialState
    },
  },
})

export const {
  startBooking,
  setMode,
  setDate,
  setTime,
  setPhone,
  setEmail,
  resetBooking,
} = appointmentSlice.actions

export default appointmentSlice.reducer
