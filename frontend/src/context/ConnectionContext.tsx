import React, { useState, createContext } from "react";

const initialConnection: any = "";
export const ConnectionContext = createContext(initialConnection);

export const ConnectionProvider = (props: { children: React.ReactNode; }) => {
  const [connection, setConnection] = useState<string>(initialConnection);
  
  return (<ConnectionContext.Provider value={[connection, setConnection]}>{props.children}</ConnectionContext.Provider>);
};