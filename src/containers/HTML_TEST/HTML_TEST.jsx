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
      <Div content={this.common_form("title", "detail")}></Div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
