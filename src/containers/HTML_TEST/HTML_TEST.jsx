import React, { Component } from "react";
import classNames from "classnames/bind";
import styles from "./HTML_TEST.scss";
import { connect } from "react-redux";
import { Div, CommonStep } from "../../components";

const cx = classNames.bind(styles);

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = {};

class Header extends Component {
  state = {
    bShowSearch: false
  };

  onChangeSearchStatus = event => {
    this.setState({ bShowSearch: !this.state.bShowSearch });
  };

  common_form = (title, detail) => {
    return [
      <CommonStep
        title={title}
        detail={detail}
      />
    ];
  };

  render() {
    const { bShowSearch } = this.state;

    return (
      // <Div content={this.common_form("title", "detail")}></Div>
      <div className={cx("detail-container")}>
        <div className={cx("detail-content")}>
          <div className={cx("detail-content-header")}>
            <span>칵테일 이름</span>

            <div className={cx("detail-content-header-info")}>
              <span>등록한 사람 닉네임</span>

              <div className={cx("detail-content-header-info-count")}>
                <span style={{display: "inline-block", width: "16px", height: "16px", border: "1px solid #707070"}}></span>
                <span>85</span>
                <span style={{display: "inline-block", width: "16px", height: "16px", border: "1px solid #707070"}}></span>
                <span>24</span>
              </div>
            </div>
          </div>

          <div className={cx("detail-content-main")}>
            <div className={cx("detail-content-main-view")}>
              <span className={cx("detail-content-main-view-cup show")}></span>

              <span className={cx("detail-content-main-view-image close")}></span>
            </div>

            <div className={cx("detail-content-main-side")}>
              <div className={cx("detail-content-main-side-toolbar")}>
                <span><text>정보</text></span>
                <span><text>재료</text></span>
                <span><text>사진</text></span>
                <span>댓글</span>
              </div>

              <div className={cx("detail-content-main-side-info")}>

              </div>

            </div>
          </div>

        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
