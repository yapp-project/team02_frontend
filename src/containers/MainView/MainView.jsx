import React, { Component } from "react";
import classNames from "classnames/bind";
import styles from "./MainView.scss";
import { connect } from "react-redux";
import { Button } from "../../components";

const cx = classNames.bind(styles);

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = {};

class MainView extends Component {
  render() {
    return (
      <div>
        <div className={cx("body")}>메인페이지입니다.</div>
        <Button value="버튼입니다" />
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainView);
