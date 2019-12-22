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
import { UserContext } from "../context/UserContext";
import { Redirect } from "react-router-dom";

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
  const [user, setUser] = useContext(UserContext);

  const enterChat = () => {
    setUser(username);
  };

  if(user)
    return <Redirect to="/chat" />

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
          <Button
            variant="outlined"
            color="primary"
            disabled={username.length === 0}
            className={classes.cardContentChild}
            onClick={enterChat}
          >
            Enter
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
