import React from "react";
import { Switch, BrowserRouter, Route } from "react-router-dom";
import { Login } from "./components/Login";
import { Chat } from "./components/Chat";
import { NotFound } from "./components/NotFound";
import { makeStyles, Theme } from "@material-ui/core";
import { UserProvider } from "./context/UserContext";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    margin: "5px",
    height: "100vh"
  }
}));

const App: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <UserProvider>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/chat" component={Chat} />
            <Route component={NotFound} />
          </Switch>
        </BrowserRouter>
      </UserProvider>
    </div>
  );
};

export default App;
