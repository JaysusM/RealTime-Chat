import React, { useContext } from "react";
import { Message as MessageModel } from "../models/Message";
import "./Message.css";
import { UserContext } from "../context/UserContext";

interface MessageProps {
  message: MessageModel;
}

const unixTimeStampToString = (timestamp: Number | undefined) => {
  console.log(timestamp);
  return new Date(((timestamp as number) * 1000)).toLocaleString();
};

export const Message = (props: MessageProps) => {
  const [user] = useContext(UserContext);

  return (
    <div className={props.message.username !== user ? "messageContainer" : "ownMessageContainer"}>
      <div className="messageHeader">
        <h3>{props.message.username}</h3>
      </div>
      <div className="messageContent">
        <p>{props.message.content}</p>
      </div>
      <div className="messageFooter">
        <p>{unixTimeStampToString(props.message.datetime)}</p>
      </div>
    </div>
  );
};
