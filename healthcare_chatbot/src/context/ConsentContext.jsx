import { createContext, useState } from 'react'

export const ConsentContext = createContext()

export function ConsentProvider({ children }) {
  const [accepted, setAccepted] = useState(
    localStorage.getItem('medical_consent') === 'true'
  )

  const acceptConsent = () => {
    localStorage.setItem('medical_consent', 'true')
    setAccepted(true)
  }

  return (
    <ConsentContext.Provider value={{ accepted, acceptConsent }}>
      {children}
    </ConsentContext.Provider>
  )
}
