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
import { withRouter } from "react-router-dom";
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
    bShowLogin: false,
    bShowUser: false
  };

  componentDidMount() {
    const auth = JSON.parse(localStorage.getItem("myData")); //localstorage에서 가져옴
    if (auth) {
      this.props.loginRequest(auth.userid, auth.password);
    }
  }

  componentDidUpdate() {
    const { bShowLogin, bShowSearch } = this.state;
    if (this.props.bLoginResult && bShowLogin) {
      this.setState({ bShowLogin: false });
    }

    if (!bShowSearch && this.props.searchresult.cocktails.length) {
      this.props.searchresult.cocktails = [];
    }
  }

  onChangeSearchStatus = event => {
    this.setState({ bShowSearch: !this.state.bShowSearch });
  };

  showUserPopup = () => {
    return (
      <div id="userPopup" className={cx("user_popup")}>
        <div className={cx("container")}>
          <div className={cx("text")} onClick={this.onMyMenuClick}>
            마이메뉴
          </div>
        </div>
        <div className={cx("container")}>
          <div className={cx("text")}>개인정보 설정</div>
        </div>
        <div className={cx("container")}>
          <div className={cx("text")} onClick={this.onLogoutClick}>
            로그아웃
          </div>
        </div>
      </div>
    );
  };

  onMyMenuClick = event => {
    this.props.history.push("/mymenu");
  };

  onLogoutClick = event => {
    if (this.props.bLoginResult && this.state.bShowUser) {
      this.setState({ bShowUser: false });
      this.props.logout();
    }
  };

  onShowLogin = event => {
    const _bShowLogin = this.state.bShowLogin;
    if (_bShowLogin) {
      if (event.target.id === loginPopupID) {
        this.setState({ bShowLogin: false });
      }
    } else {
      if (this.props.bLoginResult) {
        this.setState({ bShowUser: !this.state.bShowUser });
      } else this.setState({ bShowLogin: !_bShowLogin });
    }
  };

  onLogoClick = event => {
    const { history } = this.props;
    history.push("/");
  };

  render() {
    const { bShowSearch, bShowLogin, bShowUser } = this.state;

    return (
      <div
        className={cx(
          "container",
          bShowSearch ? "_over" : "",
          this.props.searchresult.cocktails.length ? "_result" : ""
        )}
      >
        <div className={cx("toprect")}>
          <div className={cx("icon")} onClick={this.onLogoClick} />
          <div className={cx("right_container")}>
            <Button
              className={cx("search")}
              onClick={this.onChangeSearchStatus}
            />
            <Button
              className={cx("login", this.props.bLoginResult ? "_out" : "")}
              value={this.props.bLoginResult ? "" : "로그인"}
              onClick={this.onShowLogin}
            />
            {this.props.bLoginResult && (
              <Button className={cx("create_recipes")} />
            )}
            {bShowUser && this.showUserPopup()}
          </div>
        </div>
        {bShowSearch && <SearchPopup className={cx("searchrect")} />}
        {bShowSearch && this.props.searchresult.cocktails.length > 0 ? (
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

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Header)
);
