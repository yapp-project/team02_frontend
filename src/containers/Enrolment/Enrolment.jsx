import React, { Component } from "react";
import classNames from "classnames/bind";
import styles from "./Enrolment.scss";
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
      <Div className="content" content={this.common_form("Input Information", "나만의 레시피 만들기 첫번째 단계! 레시피에 어울리는 컵을 선택하고, 정보를 입력해주세요.")}></Div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
