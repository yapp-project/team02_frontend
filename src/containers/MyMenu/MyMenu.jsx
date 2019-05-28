import React, { Component } from "react";
import classNames from "classnames/bind";
import styles from "./MyMenu.scss";
import { connect } from "react-redux";

//Layout
import SearchResult from "../SearchResult/SearchResult";

import { scrapRequest, recipeRequest } from "../../action/userAction";

const cx = classNames.bind(styles);

const mapStateToProps = state => {
  return { mymenu: state.userReducer.mymenu, scrap: state.userReducer.scrap };
};

const mapDispatchToProps = { scrapRequest, recipeRequest };

class MyMenu extends Component {
  state = {
    userid: "",
    tabIndex: 0, // 0-스크랩, 1-등록한 레시피,
    scrapArray: [],
    recipesArray: [],
    page: 1,
    pages: 1
  };

  componentDidMount() {
    const auth = JSON.parse(localStorage.getItem("myData")); //localstorage에서 가져옴
    if (auth) {
      this.setState({ userid: auth.userid });
      this.props.scrapRequest({ type: 0, data: { userID: auth.userid } });
      this.props.recipeRequest({ type: 1, data: { userID: auth.userid } });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const _myMenu = this.props.mymenu;
    const _prevMyMenu = prevProps.mymenu;
    if (this.state.tabIndex === 0) {
      if (_prevMyMenu.scrap !== _myMenu.scrap) {
        const page = _myMenu.scrap.length ? 1 : 0;
        const pages = _myMenu.scrap.length ? 1 : 0;
        this.setState({
          scrapArray: _myMenu.scrap,
          page,
          pages
        });
        return;
      } else if (_myMenu.scrap.length && !this.state.scrapArray.length) {
        const page = _myMenu.scrap.length ? 1 : 0;
        const pages = _myMenu.scrap.length ? 1 : 0;
        this.setState({
          scrapArray: _myMenu.scrap,
          page,
          pages
        });
        return;
      }

      //최초 통신 시 등록한 레시피 갯수 반영
      if (_prevMyMenu.recipes !== _myMenu.recipes) {
        this.setState({ recipesArray: _myMenu.recipes });
      }

      //스크랩 해제한 경우 List에서 제외시켜야함
      if (this.props.scrap.result && this.props.scrap.status === "delete") {
        this.props.scrap.result = false;
        this.props.scrap.status = "";
        this.props.scrapRequest({
          type: 0,
          data: { userID: this.state.userid }
        });
      }
    } else if (this.state.tabIndex === 1) {
      if (_prevMyMenu.recipes !== _myMenu.recipes) {
        const page = _myMenu.scrap.length ? 1 : 0;
        const pages = _myMenu.scrap.length ? 1 : 0;
        this.setState({
          recipesArray: _myMenu.recipes,
          page,
          pages
        });
      }
    }
  }

  onTabButtonClick = event => {
    const target = event.target;
    if (target.id === "scrap") {
      this.setState({ tabIndex: 0 });
      this.props.scrapRequest({
        type: 0,
        data: { userID: this.state.userid }
      });
    } else if (target.id === "recipes") {
      this.setState({ tabIndex: 1 });
      this.props.recipeRequest({
        type: 1,
        data: { userID: this.state.userid }
      });
    }
  };

  onCreateRecipesClick = event => {
    const { history } = this.props;
    history.push("/enrolment");
  };

  render() {
    const { userid, tabIndex, scrapArray, recipesArray } = this.state;
    const tabArray = tabIndex ? recipesArray : scrapArray;

    return (
      <div className={cx("mymenu_container")}>
        <div className={cx("top_rect")}>
          <div className={cx("top_container")}>
            <div className={cx("userid")}>{userid}</div>
            <div className={cx("tab_container")}>
              <div
                id="scrap"
                className={cx("tab_button", {
                  selected: !tabIndex
                })}
                onClick={this.onTabButtonClick}
              >
                <div id="scrap" className={cx("text")}>
                  스크랩
                </div>
                <div id="scrap" className={cx("number")}>
                  {scrapArray.length}
                </div>
              </div>
              <div
                id="recipes"
                className={cx("tab_button", {
                  selected: tabIndex
                })}
                onClick={this.onTabButtonClick}
              >
                <div id="recipes" className={cx("text")}>
                  등록한 레시피
                </div>
                <div id="recipes" className={cx("number")}>
                  {recipesArray.length}
                </div>
              </div>
              <div className={cx("register_rect")}>
                <div
                  className={cx("button")}
                  onClick={this.onCreateRecipesClick}
                />
                <div
                  className={cx("button_text")}
                  onClick={this.onCreateRecipesClick}
                >
                  레시피 등록하기
                </div>
              </div>
            </div>
          </div>
        </div>
        <SearchResult
          className={cx("bottom_rect")}
          modify={tabIndex ? true : false}
          page={this.state.page}
          pages={this.state.pages}
          searchList={tabArray}
        />
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyMenu);
