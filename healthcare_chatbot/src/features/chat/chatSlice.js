import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { analyzeSymptoms } from '../../services/chatApi'

export const sendChatMessage = createAsyncThunk(
  'chat/sendChatMessage',
  async ({ symptom, duration }) => {
    return analyzeSymptoms(symptom, duration)
  }
)

const chatSlice = createSlice({
  name: 'chat',

  initialState: {
    stage: 'SYMPTOM',
    currentSymptom: '',
    duration: null,
    severity: null,
    messages: [
      { role: 'bot', text: '👋 Welcome to Healthcare AI Assistant.' },
      { role: 'bot', text: 'Please tell me what symptoms you are experiencing.' },
    ],
  },

  reducers: {
    addUserMessage(state, action) {
        state.messages.push({ role: 'user', text: action.payload })
    },

    addBotMessage(state, action) {
        state.messages.push({ role: 'bot', text: action.payload })
    },
    bookingCompleted(state, action) {
        const { date, time, mode } = action.payload

        state.messages.push({
            role: 'bot',
            text:
            mode === 'online'
                ? `✅ Your appointment is confirmed.
        📅 Date: ${date}
        ⏰ Time: ${time}
        🔗 Online meeting details will be sent shortly.
        Is there anything else I can help you with?`
                : `✅ Your appointment is confirmed.
        📅 Date: ${date}
        ⏰ Time: ${time}
        📍 Location: Apollo Clinic, Main Road
        Please arrive 10 minutes early.
        Is there anything else I can help you with?`,
        })

        state.stage = 'FOLLOW_UP'
    },


    setSymptom(state, action) {
        state.currentSymptom = action.payload
        state.stage = 'ASK_DURATION'
        state.messages.push({
        role: 'bot',
        text: 'For how many days have you been experiencing this symptom?',
        })
    },

    askMode(state) {
      state.messages.push({
        role: 'bot',
        text: 'Would you like an online or offline consultation?',
      })
    },

    askDate(state) {
      state.messages.push({
        role: 'bot',
        text: 'Please select an appointment date.',
      })
    },

    askTime(state) {
      state.messages.push({
        role: 'bot',
        text: 'Please select a time slot.',
      })
    },

    askPhone(state) {
      state.messages.push({
        role: 'bot',
        text: 'Please enter your phone number.',
      })
    },

    askEmail(state) {
      state.messages.push({
        role: 'bot',
        text: 'Please enter your email address.',
      })
    },


    handleYes(state) {
        state.messages.push({
            role: 'bot',
            text: 'Sure 🙂 What else can I help you with?',
        })
        state.messages.push({
            role: 'bot',
            text: 'You can describe new symptoms or ask to book an appointment.',
        })

        // 🔄 Reset conversation flow safely
        state.stage = 'SYMPTOM'
        state.currentSymptom = ''
    },

    handleNo(state) {
        state.messages.push({
            role: 'bot',
            text: 'Thank you for using Healthcare AI Assistant.',
        })
        state.messages.push({
            role: 'bot',
            text: 'Take care and stay healthy 🙏',
        })

        // 🔒 Lock conversation (no more follow-up expected)
        state.stage = 'END'
    },

    resetChat(state) {
        state.stage = 'SYMPTOM'
        state.currentSymptom = ''
        state.duration = null
        state.severity = null
        state.messages = [
            { role: 'bot', text: '👋 Welcome to Healthcare AI Assistant.' },
            { role: 'bot', text: 'Please tell me what symptoms you are experiencing.' },
        ]
    },

  },


  extraReducers: (builder) => {
    builder.addCase(sendChatMessage.fulfilled, (state, action) => {
      const { severity, advice } = action.payload
      state.severity = severity

    //   state.messages.push({
    //     role: 'bot',
    //     text: `You mentioned symptoms for ${state.duration} day(s).`,
    //   })

      state.messages.push({ role: 'bot', text: advice })

      if (severity === 'mild') {
        state.messages.push({
          role: 'bot',
          text: 'Home care may be sufficient. Would you like help with anything else?',
        })
        state.stage = 'FOLLOW_UP'
      } else {
        state.messages.push({
          role: 'bot',
          text: 'A doctor consultation is recommended.',
        })
        state.messages.push({
          role: 'bot',
          text: 'Would you like to book an appointment?',
        })
        state.stage = 'RECOMMEND_BOOKING'
      }
    })
  },
})

export const {
  resetChat,  
  addUserMessage,
  addBotMessage,
  setSymptom,
  askMode,
  askDate,
  askTime,
  askPhone,
  askEmail,
  handleYes,
  handleNo,
  bookingCompleted,
} = chatSlice.actions

export default chatSlice.reducer
