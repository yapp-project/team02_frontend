import React, { Component } from "react";
import classNames from "classnames/bind";
import styles from "./SideBar.scss";
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
      <div className={cx("content")}>
        <div className={cx("content-container")}>
          <div className={cx("content-sideBar")}>
            <div className={cx("content-sideBar-icon")}>
              <ul>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
              </ul>
            </div>

            <div className={cx("content-sideBar-main")}>
              <div className={cx("content-sideBar-title")}>
                Title
              </div>

              <div className={cx("content-sideBar-tags")}>
                <ul>
                  <li>태그 1</li>
                  <li>태그 2</li>
                  <li>태그 3</li>
                  <li>태그 4</li>
                  <li>태그 6</li>
                  <li>태그 7</li>
                  <li>태그 8</li>
                  <li>태그 9</li>
                  <li>태그 10</li>
                </ul>
              </div>

              <div className={cx("content-sideBar-stuff")}>
                <span>stuff</span>

                <ul>
                  <li>
                    <span className={cx("content-sideBar-stuff-image")}></span>
                    <span className={cx("content-sideBar-stuff-name")}>재료 1</span>
                  </li>
                  <li>
                    <span className={cx("content-sideBar-stuff-image")}></span>
                    <span className={cx("content-sideBar-stuff-name")}>재료 2</span>
                  </li>
                  <li>
                    <span className={cx("content-sideBar-stuff-image")}></span>
                    <span className={cx("content-sideBar-stuff-name")}>재료 3</span>
                  </li>
                </ul>
              </div>

              <div className={cx("content-sideBar-order")}>
                <span>order</span>

                <ul>
                  <li>1. 레시피 첫번째</li>
                  <li>2. 레시피 첫번째</li>
                  <li>3. 레시피 첫번째</li>
                  <li>4. 레시피 첫번째</li>
                </ul>
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
