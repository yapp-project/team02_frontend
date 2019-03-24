import React, { Component } from "react";
import classNames from "classnames/bind";
import styles from "./MainView.scss";
import { connect } from "react-redux";
import { Button } from "../../components";
import LoginPopup from "../LoginPopup/LoginPopup";
import SearchPopup from "../SearchPopup/SearchPopup";

const cx = classNames.bind(styles);

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = {};
const loginPopupID = "login";
const searchPopupID = "search";

class MainView extends Component {
  state = {
    showPopup: false,
    showSearch: false
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

  onShowSearch = event => {
    const _bShowSearch = this.state.showSearch;

    if (_bShowSearch) {
      if (event.target.id === searchPopupID) {
        this.setState({ showSearch: false });
      }
    } else {
      this.setState({ showSearch: !_bShowSearch });
    }
  };

  render() {
    return (
      <div>
        <div className={cx("body")}>메인페이지입니다.</div>
        <Button value="로그인" onClick={this.onShowLogin} />
        <Button value="검색" onClick={this.onShowSearch} />

        {this.state.showPopup ? (
          <LoginPopup id={loginPopupID} onClick={this.onShowLogin} />
        ) : null}
        {this.state.showSearch ? (
          <SearchPopup id={searchPopupID} onClick={this.onShowSearch} />
        ) : null}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainView);
