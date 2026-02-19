import { createContext, useContext, useState } from "react";

export const ConsentContext = createContext();

export function ConsentProvider({ children }) {
  const [accepted, setAccepted] = useState(false);

  const acceptConsent = () => setAccepted(true);

  return (
    <ConsentContext.Provider value={{ accepted, acceptConsent }}>
      {children}
    </ConsentContext.Provider>
  );
}

export function useConsent() {
  return useContext(ConsentContext);
}
