import React from "react";
import { Switch, BrowserRouter, Route } from "react-router-dom";
import { Login } from "./components/Login";
import { Chat } from "./components/Chat";
import { NotFound } from "./components/NotFound";
import { makeStyles, Theme } from "@material-ui/core";
import { ConnectionProvider } from "./context/ConnectionContext";
import './App.css';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: "100vh"
  }
}));

const App: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ConnectionProvider>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/chat" component={Chat} />
            <Route component={NotFound} />
          </Switch>
        </BrowserRouter>
      </ConnectionProvider>
    </div>
  );
};

export default App;
