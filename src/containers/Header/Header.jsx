import React, { Component } from "react";
import classNames from "classnames/bind";
import styles from "./Header.scss";
import { connect } from "react-redux";
import { Button } from "../../components";

//layou
import SearchPopup from "../SearchPopup/SearchPopup";
import LoginPopup from "../LoginPopup/LoginPopup";

const cx = classNames.bind(styles);

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = {};
const loginPopupID = "login";
const searchPopupID = "search";

class Header extends Component {
  state = {
    bShowSearch: false,
    bShowLogin: false
  };

  onChangeSearchStatus = event => {
    this.setState({ bShowSearch: !this.state.bShowSearch });
  };

  onShowLogin = event => {
    const _bShowSearch = this.state.bShowLogin;
    if (_bShowSearch) {
      if (event.target.id === loginPopupID) {
        this.setState({ bShowLogin: false });
      }
    } else {
      this.setState({ bShowLogin: !_bShowSearch });
    }
  };

  render() {
    const { bShowSearch, bShowLogin } = this.state;

    return (
      <div className={cx("header-container")}>
        <div className={cx("header-container-top")}>
          <div className={cx("icon")} />
          <Button
            className={cx("login")}
            value="Login"
            onClick={this.onShowLogin}
          />
          <Button
            className={cx("search")}
            onClick={this.onChangeSearchStatus}
          />
        </div>

        <div
          className={cx("header-container-bottom", {
            show: bShowSearch,
            close: !bShowSearch
          })}
        >
          {/* <div className={cx("header-search-container")}> */}
          <SearchPopup />
          {/* </div> */}
        </div>
        {bShowLogin ? <LoginPopup onClick={this.onShowLogin} /> : null}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
