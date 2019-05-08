import React, { Component } from "react";
import classNames from "classnames/bind";
import styles from "./MyMenu.scss";
import { connect } from "react-redux";

//Layout
import SearchResult from "../SearchResult/SearchResult";

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
    // if (auth) {
    //   this.props.dataRequest(this.state.tabIndex, auth.userid);
    // this.setState({ userid: auth.userid });
    // }
    this.setState({ userid: "drinkme001" });
    this.props.dataRequest(this.state.tabIndex, "drinkme001");
    this.props.dataRequest(!this.state.tabIndex, "drinkme001");
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.tabIndex === 0) {
      if (prevProps.mymenu.scrap !== this.props.mymenu.scrap) {
        this.setState({ scrapArray: this.props.mymenu.scrap });
      }
    } else if (this.state.tabIndex === 1) {
      if (prevProps.mymenu.recipes !== this.props.mymenu.recipes) {
        this.setState({ recipesArray: this.props.mymenu.recipes });
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
                <div className={cx("button")} />
                <div className={cx("button_text")}>레시피 등록하기</div>
              </div>
            </div>
          </div>
        </div>
        <SearchResult
          className={cx("bottom_rect")}
          data={tabArray}
          modify={true}
        />
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyMenu);
