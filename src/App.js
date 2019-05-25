import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { MainView, Header, Enrolment, ViewRecipe, MyMenu } from "./containers";
import classNames from "classnames/bind";
import styles from "./App.scss";
const cx = classNames.bind(styles);

const mapStateToProps = state => {
  return {};
};
const mapDispatchToProps = dispatch => ({});

class App extends Component {
  render() {
    const bEnrolment =
      this.props.location.pathname.indexOf("enrolment") > 0 ? true : false;
    return (
      <div className={cx("App", bEnrolment ? "one" : "")}>
        <div className={cx("top")}>
          <Switch>
            <Route exact path="/enrolment/:id" component={Enrolment} />
            <Route exact path="/enrolment" component={Enrolment} />
            <Route path="/" component={Header} />
          </Switch>
        </div>
        {!bEnrolment && (
          <div className={cx("body")}>
            <Switch>
              <Route exact path="/" component={MainView} />
              <Route exact path="/viewRecipe/:id" component={ViewRecipe} />
              <Route exact path="/viewRecipe" component={ViewRecipe} />
              <Route exact path="/mymenu" component={MyMenu} />
            </Switch>
          </div>
        )}
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
