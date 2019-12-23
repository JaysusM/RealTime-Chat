import React, { useContext, useEffect, useState } from "react";
import { ConnectionContext } from "../context/ConnectionContext";
import { Redirect } from "react-router-dom";
import {
  Typography,
  AppBar,
  Toolbar,
  Button,
  makeStyles,
  Theme,
  TextField
} from "@material-ui/core";
import { Message as MessageModel } from "../models/Message";
import { getMessages } from "../services/api";
import { take } from "rxjs/operators";
import { Subscription } from "rxjs/internal/Subscription";
import { Message } from "./Message";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: "100vh",
    display: "flex"
  },
  title: {
    flex: 1
  },
  sendContainer: {
    marginTop: "5px",
    height: "55px",
    display: "flex",
    padding: "10px",
    backgroundColor: "#FFF"
  },
  messageContainer: {
    marginTop: "64px",
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    background: "url('wallpaper.jpeg')",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover"
  },
  messages: {
    padding: "5px",
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    overflowY: "scroll"
  },
  sendMessage: {
    flexGrow: 8
  },
  sendButton: {
    flexGrow: 2,
    marginLeft: "15px",
    height: "100%"
  }
}));

export const Chat: React.FC = () => {
  const [connection, setConnection] = useContext(ConnectionContext);
  const [messages, setMessages] = useState<MessageModel[]>([]);
  const [currentMessage, setCurrentMessage] = useState<String>("");
  const classes = useStyles();

  const scrollToBottom = () => {
    const messages: any = document.getElementById("messages");
    if (messages) {
      messages.scrollTop = messages.scrollHeight;
    }
  };

  useEffect(() => {
    const subscriptionMessages: Subscription = getMessages(connection.room)
      .pipe(take(1))
      .subscribe((messages: MessageModel[]) => setMessages(messages));
    scrollToBottom();

    return () => {
      subscriptionMessages.unsubscribe();
      if (connection.socket) {
        connection.socket.emit("disconnection", {...connection, socket: undefined})
      }
      connection.socket?.close();
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (connection.socket) {
      connection.socket.on("message", (message: any) =>
        setMessages([...messages, JSON.parse(message)])
      );
      scrollToBottom();
    }
    // eslint-disable-next-line
  }, [messages]);

  const sendMessage = () => {
    if (connection.socket) {
      const message: MessageModel = {
        username: connection.username,
        content: currentMessage,
        room: connection.room,
        datetime: Date.now()
      };
      connection.socket.send(message);
      setCurrentMessage("");
    }
  };

  const setMessageContent = (event: any) => {
    setCurrentMessage(event.target.value);
  };

  const clearUsername = () => {
    setConnection("");
  };

  if (!connection || !(connection.socket)) return <Redirect to="/" />;

  return (
    <div className={classes.root}>
      <AppBar>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            RealTime Chat - {connection.room}
          </Typography>
          <Button onClick={clearUsername} color="inherit">
            Log out
          </Button>
        </Toolbar>
      </AppBar>
      <div className={classes.messageContainer}>
        <div id="messages" className={classes.messages}>
          {messages.map((message: MessageModel) =>
            React.createElement(Message, {
              message: message,
              key: message._id?.$oid.toString()
            })
          )}
        </div>
        <div className={classes.sendContainer}>
          <TextField
            value={currentMessage}
            variant="filled"
            label="Message"
            onChange={setMessageContent}
            className={classes.sendMessage}
          />
          <Button
            variant="contained"
            color="primary"
            className={classes.sendButton}
            onClick={sendMessage}
            disabled={currentMessage === ""}
          >
            Send
          </Button>
        </div>
      </div>
    </div>
  );
};
