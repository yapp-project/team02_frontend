import React, { Component } from "react";
import classNames from "classnames/bind";
import styles from "./Header.scss";
import { connect } from "react-redux";
import { Button, Combo } from "../../components";

//layout
import SearchPopup from "../SearchPopup/SearchPopup";
import LoginPopup from "../LoginPopup/LoginPopup";
import SearchResult from "../SearchResult/SearchResult";

import { loginRequest, logout } from "../../action/userAction";
import { searchRequest } from "../../action/searchAction";
import { withRouter } from "react-router-dom";

import { GridSpinner } from "react-spinners-kit";

const cx = classNames.bind(styles);

const mapStateToProps = state => {
  return {
    bLoginResult: state.userReducer.bLoginResult,
    set_auth: state.userReducer.set_auth,
    searchReducer: state.searchReducer
  };
};

const mapDispatchToProps = { loginRequest, logout, searchRequest };

const customStyles = {
  control: base => ({
    ...base,
    height: 47,
    minHeight: 47,
    margin: 0,
    border: 0,
    backgroundColor: "#0f1835",
    color: "#ffffff",
    paddingTop: 5
  }),
  menu: base => ({
    ...base,
    margin: 0,
    color: "#ffffff",
    backgroundColor: "#0f1835",
    position: "absolute",
    height: "auto",
    "font-size": 20
  }),
  indicatorSeparator: base => ({
    ...base,
    backgroundColor: "transparent"
  }),
  dropdownIndicator: base => ({
    ...base,
    color: "#ffffff",
    "&:hover": {
      color: "#ffffff"
    }
  }),
  singleValue: base => ({
    ...base,
    color: "#fff"
  }),
  valueContainer: base => ({
    ...base,
    color: "#ffffff",
    "font-size": 20
  }),
  input: base => ({
    ...base,
    color: "#ffffff",
    "font-size": 20
  })
};

const SEARCH_FITER_TIME = 0;
const SEARCH_FITER_SCRAP = 1;
const filter = [
  { value: SEARCH_FITER_TIME, label: "최신순" },
  { value: SEARCH_FITER_SCRAP, label: "스크랩순" }
];

class Header extends Component {
  state = {
    bShowSearch: false,
    bShowLogin: false,
    bShowUser: false,
    selectedOption: filter[0],
    bsearchRequest: false,
    bHideSearch: false,
    popupID: "login",
    userID: "",
    password: "",
    bSearchAction: false,
    isScroll: false
  };

  componentDidMount() {
    const auth = JSON.parse(localStorage.getItem("myData")); //localstorage에서 가져옴
    //자동 로그인 기능
    if (auth) {
      this.setState({ userID: auth.userid, password: auth.password });
      this.props.loginRequest(auth.userid, auth.password);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      bShowLogin,
      bShowSearch,
      selectedOption,
      bsearchRequest,
      bSearchAction
    } = this.state;
    const { searchReducer } = this.props;
    if (this.props.bLoginResult && bShowLogin) {
      if (this.state.popupID !== "usermodify") {
        this.setState({ bShowLogin: false });
      }
    }

    if (bShowLogin) {
      if (this.props.bModifyUser) {
        this.setState({ bShowLogin: false });
      }
    }

    if (!bShowSearch && searchReducer.searchword) {
      searchReducer.searchresult.cocktails = [];
      searchReducer.searchword = "";
      return;
    }

    //filter 변경에 의한 searchAPI 호출
    if (prevState.selectedOption.value !== selectedOption.value) {
      const word = searchReducer.searchword;
      const filter = selectedOption.value;
      const type = searchReducer.type;
      this.setState({ bsearchRequest: true });
      this.props.searchRequest({ word, filter, type });
      return;
    }

    // 결과창 떠있는 상태에서 검색 종류 or 단어 변경하여 검색 시 필터콤보 초기값으로 변경
    if (
      prevProps.searchReducer.searchword !== searchReducer.searchword ||
      prevProps.searchReducer.type !== searchReducer.type
    ) {
      if (bSearchAction && bsearchRequest) {
        this.setState({
          selectedOption: filter[0],
          bsearchRequest: false,
          isScroll: false
        });
      } else {
        this.setState({ selectedOption: filter[0], isScroll: false });
      }
    }

    if (
      bsearchRequest &&
      prevProps.searchReducer.searchresult.cocktails !==
        searchReducer.searchresult.cocktails
    ) {
      this.setState({ bsearchRequest: false, isScroll: false });
    }
  }

  onChangeSearchStatus = event => {
    if (this.state.bHideSearch && this.state.bShowSearch) {
      this.setState({
        bHideSearch: false
      });
    } else if (!this.state.bHideSearch) {
      this.setState({
        bShowSearch: !this.state.bShowSearch,
        bHideSearch: false,
        bSearchAction: false
      });
    }
  };

  handleChangeFilter = selectedOption => {
    this.setState({ selectedOption });
  };

  handleNotifyScroll = props => {
    const nextPage = props.next;
    const { searchReducer } = this.props;

    if (
      searchReducer.searchresult.page !== nextPage &&
      nextPage > searchReducer.searchresult.page &&
      !this.state.bsearchRequest
    ) {
      const { selectedOption } = this.state;

      const word = searchReducer.searchword;
      const filter = selectedOption.value;
      const type = searchReducer.type;

      this.setState({ bsearchRequest: true, isScroll: true });
      this.props.searchRequest({ word, filter, type, index: nextPage });
    }
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
          <div className={cx("text")} onClick={this.onUserModifyInfoClick}>
            개인정보 설정
          </div>
        </div>
        <div className={cx("container")}>
          <div className={cx("text")} onClick={this.onLogoutClick}>
            로그아웃
          </div>
        </div>
      </div>
    );
  };

  onUserModifyInfoClick = event => {
    this.setState({
      bShowUser: false,
      bShowLogin: true,
      bShowSearch: false,
      popupID: "usermodify"
    });
  };

  onMyMenuClick = event => {
    this.setState({ bShowUser: false, bShowSearch: false, bHideSearch: false });
    this.props.history.push("/mymenu");
  };

  onLogoutClick = event => {
    if (this.props.bLoginResult && this.state.bShowUser) {
      this.setState({ bShowUser: false, popupID: "login" });
      this.props.logout();

      const { history } = this.props;
      if (history && history.location.pathname !== "/")
        this.props.history.push("/");
    }
  };

  onShowLogin = event => {
    const _bShowLogin = this.state.bShowLogin;
    if (_bShowLogin) {
      if (event.target.id === this.state.popupID) {
        this.setState({ bShowLogin: false });
      }
    } else {
      if (this.props.bLoginResult) {
        this.setState({ bShowUser: !this.state.bShowUser });
      } else {
        this.setState({ bShowLogin: !_bShowLogin });
      }
    }
  };

  onLogoClick = event => {
    const { history } = this.props;
    this.setState({
      bShowSearch: false,
      bShowUser: false,
      selectedOption: filter[0],
      bsearchRequest: false,
      bHideSearch: false,
      bSearchAction: false,
      isScroll: false
    });
    history.push("/");
  };

  onCreateRecipesClick = event => {
    const { history } = this.props;
    history.push("/enrolment");
  };

  onHideSearchPopup = (isForward, scrollPos, orgScrollPos) => {
    if (scrollPos === 0) {
      this.setState({ bHideSearch: false });
    } else if (isForward && !this.state.bHideSearch && scrollPos > 0) {
      this.setState({ bHideSearch: true });
    }
  };

  //검색 유/무 알려고 만든 것(SearchPopup에 넘김)
  onSearchAction = (action = false) => {
    this.setState({ bSearchAction: action, bsearchRequest: action });
  };

  render() {
    const {
      bShowSearch,
      bShowLogin,
      bShowUser,
      selectedOption,
      bHideSearch,
      bSearchAction,
      bsearchRequest,
      isScroll
    } = this.state;
    const { searchresult } = this.props.searchReducer;

    return (
      <div
        className={cx(
          "container",
          bShowSearch ? "_over" : "",
          bSearchAction ? "_result" : ""
        )}
      >
        <div className={cx("toprect")}>
          <div className={cx("icon")} onClick={this.onLogoClick} />
          <div className={cx("right_container")}>
            <div className={cx("search_rect", bHideSearch ? "_over" : "")}>
              <div
                className={cx("search_container", bHideSearch ? "_over" : "")}
              >
                {bHideSearch && (
                  <div className={cx("text_rect")}>
                    {this.props.searchReducer.searchword}
                  </div>
                )}
                <Button
                  className={cx("search", bHideSearch ? "_over" : "")}
                  onClick={this.onChangeSearchStatus}
                />
              </div>
            </div>
            <Button
              className={cx("login", this.props.bLoginResult ? "_out" : "")}
              value={this.props.bLoginResult ? "" : "로그인"}
              onClick={this.onShowLogin}
            />
            {this.props.bLoginResult && (
              <Button
                className={cx("create_recipes")}
                onClick={this.onCreateRecipesClick}
              />
            )}
            {bShowUser && this.showUserPopup()}
          </div>
        </div>
        {bShowSearch && (
          <SearchPopup
            className={cx("searchrect", bHideSearch ? "_hide" : "")}
            searchAction={this.onSearchAction}
          />
        )}
        {bShowSearch && bSearchAction && (
          <div className={cx("searchresult_rect", bHideSearch ? "_over" : "")}>
            {searchresult.cocktails.length > 0 ? (
              <div className={cx("searchresult_container")}>
                <div className={cx("filter_rect")}>
                  <Combo
                    id="filter"
                    className={cx("filter")}
                    options={filter}
                    handleChange={this.handleChangeFilter}
                    isSearchable={false}
                    value={selectedOption}
                    defaultValue={selectedOption}
                    key="filter"
                    styles={customStyles}
                  />
                </div>
                {!isScroll && bsearchRequest && (
                  <div className={cx("loading_rect")}>
                    <GridSpinner
                      size={200}
                      color="white"
                      loading={bsearchRequest}
                    />
                  </div>
                )}
                <SearchResult
                  className={cx("searchresult")}
                  word={this.props.searchReducer.searchword}
                  type={this.props.searchReducer.type}
                  filter={this.props.searchReducer.filter}
                  page={searchresult.page}
                  pages={searchresult.pages}
                  searchList={searchresult.cocktails}
                  handleNotifyScroll={this.handleNotifyScroll}
                  onChange={this.onHideSearchPopup}
                />
              </div>
            ) : (
              <div className={cx("searchresult_container")}>
                {bsearchRequest ? (
                  <div className={cx("notresult_rect")}>
                    <GridSpinner
                      size={200}
                      color="white"
                      loading={bsearchRequest}
                    />
                  </div>
                ) : (
                  <div className={cx("notresult_rect")}>
                    <div className={cx("image_rect")} />
                    <div className={cx("text_rect")}>검색 결과가 없습니다!</div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
        {bShowLogin ? (
          <LoginPopup
            id={this.state.popupID}
            onClick={this.onShowLogin}
            userID={this.state.userID}
            password={this.state.password}
          />
        ) : null}
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
