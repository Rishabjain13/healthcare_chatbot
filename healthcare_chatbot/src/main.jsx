import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './app/store'
import { ConsentProvider } from './context/ConsentContext'
import { UserProvider } from './context/UserContext'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <ConsentProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </ConsentProvider>
  </Provider>
)
