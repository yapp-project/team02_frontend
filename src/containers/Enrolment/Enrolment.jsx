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
  };

  contents = [
    {"title" : "Input Information", "detail" : "나만의 레시피 만들기 첫번째 단계! 레시피에 어울리는 컵을 선택하고, 정보를 입력해주세요."},
    {"title" : "Put Material", "detail" : "나만의 레시피 만들기 두번째 단계! 레시피에 들어갈 재료를 순서대로 추가하고, 완료되면 ‘Shake Me!’ 버튼을 클릭해주세요."},
    {"title" : "Add Pictures", "detail" : "나만의 레시피 만들기 마지막 단계! 직접 만든 음료를 사진으로 찍어 등록하고, 썸네일 사진을 골라주세요."}
  ];

  onChangeStepStatus = event => {
    let clickText = event.target.innerText;
    let stepTarget = document.querySelectorAll(".step-1, .step-2, .step-3");
    let infoStep = document.querySelectorAll(".common-container-step1, .common-container-step2, .common-container-step3");
    let content = document.querySelectorAll(".common-container-title, .common-container-detail");

    switch (clickText) {
      case "STEP 1":
        stepTarget[0].classList.add("select-step");
        stepTarget[1].classList.remove("select-step");
        stepTarget[2].classList.remove("select-step");

        infoStep[0].classList.add("show");
        infoStep[1].classList.add("close");
        infoStep[2].classList.add("close");
        infoStep[0].classList.remove("close");
        infoStep[1].classList.remove("show");
        infoStep[2].classList.remove("show");

        content[0].innerText = this.contents[0].title;
        content[1].innerText = this.contents[0].detail;
        break;
      case "STEP 2":
        stepTarget[0].classList.remove("select-step");
        stepTarget[1].classList.add("select-step");
        stepTarget[2].classList.remove("select-step");

        infoStep[0].classList.add("close");
        infoStep[1].classList.add("show");
        infoStep[2].classList.add("close");
        infoStep[0].classList.remove("show");
        infoStep[1].classList.remove("close");
        infoStep[2].classList.remove("show");

        content[0].innerText = this.contents[1].title;
        content[1].innerText = this.contents[1].detail;
        break;
      case "STEP 3":
        stepTarget[0].classList.remove("select-step");
        stepTarget[1].classList.remove("select-step");
        stepTarget[2].classList.add("select-step");

        infoStep[0].classList.add("close");
        infoStep[1].classList.add("close");
        infoStep[2].classList.add("show");
        infoStep[0].classList.remove("show");
        infoStep[1].classList.remove("show");
        infoStep[2].classList.remove("close");

        content[0].innerText = this.contents[2].title;
        content[1].innerText = this.contents[2].detail;
        break;
      default:
        break;
    }
  };

  common_form = (contents, onChangeStepStatus) => {
    return [
      <CommonStep
        contents={contents}
        onChangeStepStatus={onChangeStepStatus}
      />
    ];
  };

  render() {
    return (
      <Div className="content" content={this.common_form(this.contents, this.onChangeStepStatus)}></Div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
