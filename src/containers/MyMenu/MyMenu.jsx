import React, { Component } from "react";
import classNames from "classnames/bind";
import styles from "./MyMenu.scss";
import { connect } from "react-redux";

//Layout
import SearchResult from "../SearchResult/SearchResult";
import Header from "../Header/Header";

import { dataRequest } from "../../action/userAction";

const cx = classNames.bind(styles);

const mapStateToProps = state => {
  return { mymenu: state.userReducer.mymenu };
};

const mapDispatchToProps = { dataRequest };

class MyMenu extends Component {
  state = {
    userid: "",
    tabIndex: 0, // 0-스크랩, 1-등록한 레시피,
    scrapArray: [],
    recipesArray: []
  };

  componentDidMount() {
    const auth = JSON.parse(localStorage.getItem("myData")); //localstorage에서 가져옴
    if (auth) {
      this.setState({ userid: auth.userid });
      this.props.dataRequest(0, auth.userid);
      this.props.dataRequest(1, auth.userid);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const _myMenu = this.props.mymenu;
    const _prevMyMenu = prevProps.mymenu;
    if (this.state.tabIndex === 0) {
      if (_prevMyMenu.scrap !== _myMenu.scrap) {
        this.setState({ scrapArray: _myMenu.scrap });
      }

      //최초 통신 시 등록한 레시피 갯수 반영
      if (_prevMyMenu.recipes !== _myMenu.recipes) {
        this.setState({ recipesArray: _myMenu.recipes });
      }
    } else if (this.state.tabIndex === 1) {
      if (_prevMyMenu.recipes !== _myMenu.recipes) {
        this.setState({ recipesArray: _myMenu.recipes });
      }
    }
  }

  onTabButtonClick = event => {
    const target = event.target;
    if (target.id === "scrap") {
      this.setState({ tabIndex: 0 });
      this.props.dataRequest(this.state.tabIndex, "drinkme001");
    } else if (target.id === "recipes") {
      this.setState({ tabIndex: 1 });
      this.props.dataRequest(this.state.tabIndex, "drinkme001");
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
          data={tabArray}
          modify={tabIndex ? true : false}
        />
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyMenu);
