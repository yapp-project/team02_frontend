import React, { Component } from "react";
import classNames from "classnames/bind";
import styles from "./MyMenu.scss";
import { connect } from "react-redux";

//Layout
import SearchResult from "../SearchResult/SearchResult";

import { searchRequest } from "../../action/searchAction";

const cx = classNames.bind(styles);

const mapStateToProps = state => {
  return { searchresult: state.searchReducer.searchresult };
};

const mapDispatchToProps = { searchRequest };

class MyMenu extends Component {
  state = {
    tabIndex: 0 // 0-스크랩, 1-등록한 레시피
  };

  componentDidMount() {
    //스크랩 불러와야함.
    this.props.searchRequest({ word: "gangnam", filter: 0, type: 0 });
  }

  onTabButtonClick = event => {
    const target = event.target;
    if (target.id === "scrap") {
      this.setState({ tabIndex: 0 });
    } else if (target.id === "recipes") {
      this.setState({ tabIndex: 1 });
    }
  };

  render() {
    const { tabIndex } = this.state;
    console.log(tabIndex);
    return (
      <div className={cx("mymenu_container")}>
        <div className={cx("top_rect")}>
          <div className={cx("top_container")}>
            <div className={cx("userid")}>Park Sae Ha</div>
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
                  24
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
                  11
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
          data={this.props.searchresult.cocktails}
        />
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyMenu);
