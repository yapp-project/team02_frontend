import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  MainView,
  Header,
  LoginPopup,
  Enrolment,
  ViewRecipe,
  MyMenu
} from "./containers";

const mapStateToProps = state => {
  return {};
};
const mapDispatchToProps = dispatch => ({});

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={MainView} />
          <Route exact path="/header" component={Header} />
          <Route exact path="/popup" component={LoginPopup} />
          <Route exact path="/viewRecipe" component={ViewRecipe} />
          <Route exact path="/mymenu" component={MyMenu} />
          <Switch>
            <Route exact path="/enrolment" component={Enrolment} />
            <Route exact path="/enrolment/:id" component={Enrolment} />
          </Switch>
        </Switch>
      </div>
    );
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
