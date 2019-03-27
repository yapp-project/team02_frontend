import React, { Component } from "react";
import classNames from "classnames/bind";
import styles from "./MainView.scss";
import { connect } from "react-redux";
import { Button } from "../../components";
import LoginPopup from "../LoginPopup/LoginPopup";
import SearchPopup from "../SearchPopup/SearchPopup";
import { SearchResultItem } from "../../components";
import cocktail1 from "../../static/images/a1.jpeg";
import cocktail2 from "../../static/images/a2.jpg";

const cx = classNames.bind(styles);

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = {};
const loginPopupID = "login";
const searchPopupID = "search";

const dummy_data = [
  { no: 0, Image: cocktail1, name: "칵테일1" },
  { no: 1, Image: cocktail2, name: "칵테일2" },
  { no: 2, Image: cocktail1, name: "칵테일1" },
  { no: 3, Image: cocktail2, name: "칵테일2" },
  { no: 4, Image: cocktail1, name: "칵테일1" },
  { no: 5, Image: cocktail2, name: "칵테일2" }
];

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

  //보여주기용 임시 추후 인자 넘기는걸로 수정
  recommend_cocktail = ({ data }) => {
    return data.map(item => {
      return (
        <SearchResultItem
          className={cx("cocktail")}
          key={item.no}
          props={item}
        />
      );
    });
  };

  render() {
    return (
      <div className={cx("mainview")}>
        <div>
          <div className={cx("headerview")}>
            헤더레이아웃 위치
            <Button value="로그인" onClick={this.onShowLogin} />
            <Button value="검색" onClick={this.onShowSearch} />
          </div>
        </div>
        <div className={cx("bodyview")}>
          <div className={cx("top")}>
            <div className={cx("image")}>이미지</div>
            <div className={cx("contents")}>
              <div className={cx("title")}>Drink Me</div>
              <div className={cx("bottom")}>
                <div className={cx("text")}>
                  세상의 다양한 칵테일 레시피를 공유하다.
                </div>
                <Button className={cx("button")} value="+" />
                <div className={cx("button_text")}>레시피 등록하기</div>
              </div>
            </div>
          </div>
          <div className={cx("bottom")}>
            <div className={cx("hashtag")}>
              <div tabIndex="-1">#Citrus</div>
              <div tabIndex="-1">#Vodka</div>
              <div tabIndex="-1">#Bombay</div>
              <div tabIndex="-1">#Bombay</div>
              <div tabIndex="-1">#Bombay</div>
              <div tabIndex="-1">#Bombay</div>
            </div>
            <div className={cx("images")}>
              <div>{this.recommend_cocktail({ data: dummy_data })}</div>
            </div>
          </div>
        </div>

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
