import { createSlice } from '@reduxjs/toolkit'

export const EMERGENCY_KEYWORDS = [
  'chest pain',
  'heart attack',
  'breathing',
  'unconscious',
  'severe bleeding',
]

const initialState = {
  active: false,
  matchedKeyword: null,
}

const emergencySlice = createSlice({
  name: 'emergency',
  initialState,
  reducers: {
    checkEmergency(state, action) {
      const text = action.payload.toLowerCase()

      const match = EMERGENCY_KEYWORDS.find(keyword =>
        text.includes(keyword)
      )

      if (match) {
        state.active = true
        state.matchedKeyword = match
      }
    },

    resetEmergency(state) {
      state.active = false
      state.matchedKeyword = null
    },
  },
})

export const { checkEmergency, resetEmergency } = emergencySlice.actions
export default emergencySlice.reducer
