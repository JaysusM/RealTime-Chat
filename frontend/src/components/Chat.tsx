import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Redirect } from "react-router-dom";

export const Chat: React.FC = () => {
  const [user] = useContext(UserContext);

  if (!user) return <Redirect to="/" />;

  return <div>Chat</div>;
};
