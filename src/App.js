import React from "react";
import { Switch, Route } from "react-router-dom";
import { UserProvider } from "./components/Usercontext";
import app from "./components/App";
import myaccount from "./components/Account";
import Header from "./components/Header";

function App() {
  return (
    <>
      <UserProvider>
        <Header />
        <Switch>
          <Route exact path="/" component={app}></Route>
          <Route exact path="/myaccount" component={myaccount}></Route>
        </Switch>
      </UserProvider>
    </>
  );
}

export default App;
