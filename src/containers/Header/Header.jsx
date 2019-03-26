import React, { Component } from "react";
import classNames from "classnames/bind";
import styles from "./Header.scss";
import { connect } from "react-redux";
import { Button } from "../../components";

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

  render() {
    const { bShowSearch } = this.state;

    return (
      <div className={cx("test")}>
        <div className={cx("header-container")}>
          <div className={cx("header-container-top")}>
            <div className={cx("icon")}>this layout is icon</div>
            <Button className={cx("login")} value="Login" onClick=""/>
            <Button className={cx("search")} value="Search" onClick={this.onChangeSearchStatus}/>
          </div>

          <div className={cx("header-container-bottom", { show : bShowSearch, close : !bShowSearch })}>
            <div className={cx("header-search-container")}>
              <div className={cx("header-search-container-main")}>
                <div className={cx("header-search-input")}>
                  <input type="text" id="search-input" value="" placeholder="insert here"></input>
                </div>

                <div className={cx("header-recommendation")}>
                  <div className={cx("header-recommendation-list")}>
                    <ul>
                      <li>맛있는!</li>
                      <li>달콤한!</li>
                      <li>안녕하세여!</li>
                      <li>테그길이에따른칸수확인!</li>
                      <li>테스트데이터!</li>
                      <li>맛있는!</li>
                      <li>달콤한!</li>
                      <li>안녕하세여!</li>
                      <li>테그길이에따른칸수확인!</li>
                      <li>테스트데이터!</li>
                      <li>맛있는!</li>
                      <li>달콤한!</li>
                      <li>안녕하세여!</li>
                      <li>테그길이에따른칸수확인!</li>
                      <li>테스트데이터!</li>
                      <li>맛있는!</li>
                      <li>달콤한!</li>
                      <li>안녕하세여!</li>
                      <li>테그길이에따른칸수확인!</li>
                      <li>테스트데이터!</li>
                    </ul>
                  </div>
                </div>
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
