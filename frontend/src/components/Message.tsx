import React, { useContext } from "react";
import { Message as MessageModel } from "../models/Message";
import { ConnectionContext } from "../context/ConnectionContext";
import { makeStyles, Theme } from "@material-ui/core";

interface MessageProps {
  message: MessageModel;
}

const useStyles = makeStyles((theme: Theme) => ({
  messageContainer: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "rgb(161, 255, 138)",
    width: "200px",
    borderRadius: "5% 5% 5% 0%",
    margin: "5px 0",
    color: "black",
    wordWrap: "break-word",
    padding: "5px 10px",
    border: "1px solid black"
  },
  ownMessageContainer: {
      alignSelf: "flex-end",
      display: "flex",
      flexDirection: "column",
      backgroundColor: "rgb(0, 169, 211)",
      width: "200px",
      borderRadius: "5% 5% 0% 5%",
      margin: "5px 0",
      color: "black",
      wordWrap: "break-word",
      padding: "5px 10px",
      border: "1px solid black"
    },
  messageHeader: {
    fontWeight: "bold",
    fontVariant: "small-caps",
    "& > h3": {
      margin: "5px 0 0 0"
    }
  },
  messageFooter: {
    textAlign: "right",
    fontSize: "80%",
    color: "rgb(71, 71, 71)",
    "& > p": {
      margin: "5px 0 3px 0"
    }
  }
}))

const unixTimeStampToString = (timestamp: Number | undefined) => {
  return (timestamp) ? new Date(timestamp as number).toLocaleString() : "";
};

export const Message = (props: MessageProps) => {
  const [connection] = useContext(ConnectionContext);
  const classes = useStyles();

  return (
    <div className={props.message.username !== connection.username ? classes.messageContainer : classes.ownMessageContainer}>
      <div className={classes.messageHeader}>
        <h3>{props.message.username}</h3>
      </div>
      <div>
        <p>{props.message.content}</p>
      </div>
      <div className={classes.messageFooter}>
        <p>{unixTimeStampToString(props.message.datetime)}</p>
      </div>
    </div>
  );
};
