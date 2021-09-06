import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";

import { GlobalProvider } from "./context/GlobalState";
import { AuthGlobalProvider } from "./context/AuthGlobalState";
const App = () => {
  return (
    <BrowserRouter>
      <AuthGlobalProvider>
        <GlobalProvider>
          <Navbar />
          <div className="container">
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/auth" exact component={Auth} />
            </Switch>
          </div>
        </GlobalProvider>
      </AuthGlobalProvider>
    </BrowserRouter>
  );
};

export default App;
