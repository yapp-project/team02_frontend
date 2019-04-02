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
  { no: 0, Image: cocktail1, name: "칵테일1", like: 10 },
  { no: 1, Image: cocktail2, name: "칵테일2", like: 20 },
  { no: 2, Image: cocktail1, name: "칵테일3", like: 30 },
  { no: 3, Image: cocktail2, name: "칵테일4", like: 40 },
  { no: 4, Image: cocktail1, name: "칵테일5", like: 50 },
  { no: 5, Image: cocktail2, name: "칵테일6", like: 60 }
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

  onCloseLogin = () => {
    this.setState({ showPopup: false });
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

  onNextScrollClick = event => {
    const target = document.getElementById("images");
    const _scrollLeft = target.scrollLeft;
    target.scrollTo(_scrollLeft + 360, 0);
  };

  onPrevScrollClick = event => {
    const target = document.getElementById("images");
    const _scrollLeft = target.scrollLeft;
    target.scrollTo(_scrollLeft - 360, 0);
  };

  render() {
    return (
      <div className={cx("mainview")}>
        <div className={cx("header")}>
          <span className={cx("logo")} />
          <div className={cx("functions")}>
            우측 기능버튼
            <Button value="로그인" onClick={this.onShowLogin} />
            <Button value="검색" onClick={this.onShowSearch} />
          </div>
        </div>
        <div className={cx("explanation_rect")}>
          <div className={cx("left")}>
            <div className={cx("logo")} />
          </div>
          <div className={cx("title")}>Drink Me!</div>
          <div className={cx("contents")}>
            세상의 다양한 칵테일 레시피를 공유하다.
          </div>
          <div className={cx("register_rect")}>
            <div className={cx("button")} />
            <div className={cx("button_text")}>레시피 등록하기</div>
          </div>
        </div>
        <div className={cx("hashtag_rect")}>
          <div className={cx("hashtag_container")}>
            <div className={cx("hastag_inner")}>
              <button className={cx("hashtag")}>#Citrus</button>
              <button className={cx("hashtag")}>#Vodka</button>
              <button className={cx("hashtag")}>#Bombay</button>
              <button className={cx("hashtag")}>#Bombay</button>
              <button className={cx("hashtag")}>#Bombay</button>
              <button className={cx("hashtag")}>#Bombay</button>
            </div>
          </div>
        </div>
        <div id="images" className={cx("images")}>
          <div className={cx("innercontainer")}>
            <div className={cx("prevcontainer")}>
              <span
                className={cx("prevbspan")}
                onClick={this.onPrevScrollClick}
              />
            </div>
            {this.recommend_cocktail({ data: dummy_data })}
            <div className={cx("nextcontainer")}>
              <span
                className={cx("nextspan")}
                onClick={this.onNextScrollClick}
              />
            </div>
          </div>
        </div>

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
