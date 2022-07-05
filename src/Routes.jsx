import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Home from "./components/Home";
import Dashbord from "./components/Dashbord";
import History from "./history";
import AddAndroidVersion from "./components/AddAndroidVersion";
import AddIOSVersion from "./components/AddIOSVersion";

class Routes extends Component {
  state = {};
  render() {
    return (
      <Router history={History}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/SignUp" component={SignUp} />
          <Route path="/SignIn" component={SignIn} />
          <Route path="/Dashbord" component={Dashbord} />
          <Route path="/AddAndroidVersion" component={AddAndroidVersion} />
          <Route path="/AddIOSVersion" component={AddIOSVersion} />
        </Switch>
      </Router>
    );
  }
}

export default Routes;
