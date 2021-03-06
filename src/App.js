import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { MainView, LoginPopup } from "./containers";

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
          <Route exact path="/popup" component={LoginPopup} />
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
