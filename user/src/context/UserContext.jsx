// src/context/UserContext.js
import { createContext, useState, useContext } from "react";

const UserContext = createContext();

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider({ children }) {
  const [signedIn, setSignedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [userAddress, setUserAddress] = useState("");

  return (
    <UserContext.Provider
      value={{
        signedIn,
        setSignedIn,
        username,
        setUsername,
        userAddress,
        setUserAddress,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
