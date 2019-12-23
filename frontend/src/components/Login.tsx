import React, { useState, useContext } from "react";
import {
  makeStyles,
  Theme,
  Card,
  CardHeader,
  TextField,
  CardContent,
  Button
} from "@material-ui/core";
import { ConnectionContext } from "../context/ConnectionContext";
import { Redirect } from "react-router-dom";
import { BASE_API_URL } from "../services/api";
import socketIOClient from "socket.io-client";

const useStyles = makeStyles((theme: Theme) => ({
  loginContainer: {
    display: "flex",
    alignItems: "center",
    height: "100%",
    background: "url('wallpaper.jpeg')",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    justifyContent: "center"
  },
  loginCardHeader: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText
  },
  cardContent: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column"
  },
  cardContentChild: {
    margin: "5px"
  }
}));

export const Login: React.FC = () => {
  const classes = useStyles();
  const [username, setUsername] = useState<String>("");
  const [room, setRoom] = useState<String>("");
  const [connection, setConnection] = useContext(ConnectionContext);

  const enterChat = () => {
    const socket: SocketIOClient.Socket = socketIOClient(BASE_API_URL as string);
    setConnection({
      room: room,
      socket: socket,
      username: username
    });
  };

  if (connection) {
    connection.socket.emit('connection', {...connection, socket: undefined});
    return <Redirect to="/chat" />;
  }

  return (
    <div className={classes.loginContainer}>
      <Card>
        <CardHeader
          title="Welcome to the chat!"
          className={classes.loginCardHeader}
        />
        <CardContent className={classes.cardContent}>
          <TextField
            id="username"
            onChange={event => setUsername(event.target.value)}
            label="Username"
            variant="outlined"
            InputLabelProps={{
              shrink: true
            }}
            className={classes.cardContentChild}
            placeholder="SpacePumpkin77"
          />
          <TextField
            id="room"
            onChange={event => setRoom(event.target.value.toLowerCase())}
            label="Room"
            variant="outlined"
            InputLabelProps={{
              shrink: true
            }}
            className={classes.cardContentChild}
            placeholder="General"
          />
          <Button
            variant="outlined"
            color="primary"
            disabled={username.length === 0 || room.length === 0}
            className={classes.cardContentChild}
            onClick={enterChat}
          >
            Enter room chat
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
