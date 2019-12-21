import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Redirect } from "react-router-dom";
import {
  Typography,
  AppBar,
  Toolbar,
  Button,
  makeStyles,
  Theme,
  TextField,
  Paper
} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    flex: 1
  },
  sendContainer: {
    height: "55px",
    display: "flex"
  },
  messageContainer: {
    margin: "5px",
    display: "flex",
    flexDirection: "column",
    height: "100%"
  },
  messages: {
    height: "82%"
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
  const classes = useStyles();

  if (!user) return <Redirect to="/" />;

  const clearUsername = () => {
    setUsername("");
  };

  return (
    <div>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            RealTime Chat
          </Typography>
          <Button onClick={clearUsername} color="inherit">
            Log out
          </Button>
        </Toolbar>
      </AppBar>
      <Paper className={classes.messageContainer}>
        <div className={classes.messages}></div>
        <div className={classes.sendContainer}>
          <TextField
            variant="filled"
            label="Message"
            className={classes.sendMessage}
          />
          <Button
            variant="contained"
            color="primary"
            className={classes.sendButton}
          >
            Send
          </Button>
        </div>
      </Paper>
    </div>
  );
};
