import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
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
import { getMessages, BASE_API_URL } from "../services/api";
import socketIOClient from "socket.io-client";
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
  },
  messageContainer: {
    marginTop: "64px",
    display: "flex",
    flexDirection: "column",
    flexGrow: 1
  },
  messages: {
    padding: "5px",
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    overflowY: "scroll",
    background: "url('wallpaper.jpeg')",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover"
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
  const [user, setUsername] = useContext(UserContext);
  const [messages, setMessages] = useState<MessageModel[]>([]);
  const [currentMessage, setCurrentMessage] = useState<String>("");
  const [socket, setSocket] = useState<SocketIOClient.Socket>();
  const classes = useStyles();

  const scrollToBottom = () => {
    const messages: any = document.getElementById("messages");
    if (messages) {
      messages.scrollTop = messages.scrollHeight;
    }
  };

  useEffect(() => {
    setSocket(socketIOClient(BASE_API_URL as string));
    getMessages().subscribe((messages: MessageModel[]) =>
      setMessages(messages)
    );
    scrollToBottom();
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("message", (message: any) =>
        setMessages([...messages, JSON.parse(message)])
      );
    }
    scrollToBottom();
    // eslint-disable-next-line
  }, [messages]);

  if (!user) return <Redirect to="/" />;

  const sendMessage = () => {
    if (socket) {
      const message: MessageModel = {
        username: user,
        content: currentMessage
      };
      socket.send(message);
      setCurrentMessage("");
    }
  };

  const setMessageContent = (event: any) => {
    setCurrentMessage(event.target.value);
  };

  const clearUsername = () => {
    setUsername("");
  };

  return (
    <div className={classes.root}>
      <AppBar>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            RealTime Chat
          </Typography>
          <Button onClick={clearUsername} color="inherit">
            Log out
          </Button>
        </Toolbar>
      </AppBar>
      <div className={classes.messageContainer}>
        <div id="messages" className={classes.messages}>
          {messages.map((message: MessageModel) =>
            Message({ message: message })
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
