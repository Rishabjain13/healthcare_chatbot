import { createSlice } from '@reduxjs/toolkit'

const EMERGENCY_KEYWORDS = [
  'chest pain',
  'heart attack',
  'breathing',
  'unconscious',
  'severe bleeding',
]

const emergencySlice = createSlice({
  name: 'emergency',
  initialState: { active: false },
  reducers: {
    checkEmergency(state, action) {
      state.active = EMERGENCY_KEYWORDS.some(keyword =>
        action.payload.toLowerCase().includes(keyword)
      )
    },
    resetEmergency(state) {
      state.active = false
    },
  },
})

export const { checkEmergency, resetEmergency } = emergencySlice.actions
export default emergencySlice.reducer
