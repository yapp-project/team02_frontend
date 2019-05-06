import React, { Component } from "react";
import classNames from "classnames/bind";
import styles from "./Header.scss";
import { connect } from "react-redux";
import { Button } from "../../components";

//layout
import SearchPopup from "../SearchPopup/SearchPopup";
import LoginPopup from "../LoginPopup/LoginPopup";
import SearchResult from "../SearchResult/SearchResult";

import { loginRequest, logout } from "../../action/userAction";
import { searchRequest } from "../../action/searchAction";

const cx = classNames.bind(styles);

const mapStateToProps = state => {
  return {
    bLoginResult: state.userReducer.bLoginResult,
    set_auth: state.userReducer.set_auth,
    searchresult: state.searchReducer.searchresult
  };
};

const mapDispatchToProps = { loginRequest, logout, searchRequest };
const loginPopupID = "login";
const searchPopupID = "search";

class Header extends Component {
  state = {
    bShowSearch: false,
    bShowLogin: false
  };

  componentDidMount() {
    const auth = JSON.parse(localStorage.getItem("myData")); //localstorage에서 가져옴
    if (auth) {
      this.props.loginRequest(auth.userid, auth.password);
    }
  }

  componentDidUpdate() {
    const { bShowLogin } = this.state;
    if (this.props.bLoginResult && bShowLogin) {
      this.setState({ bShowLogin: false });
    }
  }

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
      if (this.props.bLoginResult) {
        this.props.logout();
      } else this.setState({ bShowLogin: !_bShowSearch });
    }
  };

  render() {
    const { bShowSearch, bShowLogin } = this.state;

    return (
      <div
        className={cx(
          "container",
          this.state.bShowSearch ? "_over" : "",
          this.props.searchresult.cocktails.length ? "_result" : ""
        )}
      >
        <div className={cx("toprect")}>
          <div className={cx("icon")} />
          <Button
            className={cx("login")}
            value={this.props.bLoginResult ? "LogOut" : "Login"}
            onClick={this.onShowLogin}
          />
          <Button
            className={cx("search")}
            onClick={this.onChangeSearchStatus}
          />
        </div>
        {this.state.bShowSearch && <SearchPopup className={cx("searchrect")} />}
        {this.state.bShowSearch &&
        this.props.searchresult.cocktails.length > 0 ? (
          <SearchResult
            className={cx("searchresultrect")}
            data={this.props.searchresult.cocktails}
          />
        ) : null}

        {bShowLogin ? <LoginPopup onClick={this.onShowLogin} /> : null}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
