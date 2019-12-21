import React, { useState, createContext } from "react";

const initialUsername: any = "";
export const UserContext = createContext(initialUsername);

export const UserProvider = (props: { children: React.ReactNode; }) => {
  const [username, setUsername] = useState<string>(initialUsername);
  
  return (<UserContext.Provider value={[username, setUsername]}>{props.children}</UserContext.Provider>);
};