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
import classNames from "classnames/bind";
import styles from "./App.scss";
const cx = classNames.bind(styles);

const mapStateToProps = state => {
  return {};
};
const mapDispatchToProps = dispatch => ({});

class App extends Component {
  render() {
    return (
      <div className={cx("App")}>
        <div className={cx("top")}>
          <Switch>
            <Route exact path="/enrolment/:id" component={Enrolment} />
            <Route exact path="/enrolment" component={Enrolment} />
            <Route path="/" component={Header} />
          </Switch>
        </div>
        <div className={cx("body")}>
          <Switch>
            <Route exact path="/" component={MainView} />
            <Route exact path="/viewRecipe" component={ViewRecipe} />
            <Route exact path="/mymenu" component={MyMenu} />
          </Switch>
        </div>
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
