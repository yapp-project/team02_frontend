import React, { Component } from "react";
import classNames from "classnames/bind";
import styles from "./MainView.scss";
import { connect } from "react-redux";
import { Button } from "../../components";
import LoginPopup from "../LoginPopup/LoginPopup";
const cx = classNames.bind(styles);

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = {};
const loginPopupID = "login";

class MainView extends Component {
  state = {
    showPopup: false
  };

  onShowLogin = event => {
    const _bShowPopup = this.state.showPopup;

    if (_bShowPopup) {
      if (event.target.id === loginPopupID) {
        this.setState({ showPopup: false });
      }
    } else {
      this.setState({ showPopup: !_bShowPopup });
    }
  };

  render() {
    return (
      <div>
        <div className={cx("body")}>메인페이지입니다.</div>
        <Button value="로그인" onClick={this.onShowLogin} />

        {this.state.showPopup ? (
          <LoginPopup id={loginPopupID} onClick={this.onShowLogin} />
        ) : null}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainView);
