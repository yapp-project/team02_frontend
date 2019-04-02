import React, { Component } from "react";
import classNames from "classnames/bind";
import styles from "./Enrolment.scss";
import { connect } from "react-redux";
import { Div, CommonStep } from "../../components";
import Header from "./Function/Header";
import Left from "./Function/Left";
import Middle from "./Function/Middle";
import Step1 from "./Function/Step1";
import Step2 from "./Function/Step2";
import Step3 from "./Function/Step3";
import Done from "./Function/Done";

const cx = classNames.bind(styles);

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = {};

class Enrolment extends Component {
  state = {
    "middle": <Middle/>,
    "step": <Step1/>
  };

  contents = [
    {"title" : "INPUT INFO", "detail" : "나만의 레시피 만들기 첫번째 단계! 레시피에 어울리는 컵을 선택하고, 정보를 입력해주세요."},
    {"title" : "PUT INGREDIENT", "detail" : "나만의 레시피 만들기 두번째 단계! 레시피에 들어갈 재료를 순서대로 추가하고, 완료되면 ‘Shake Me!’ 버튼을 클릭해주세요."},
    {"title" : "ADD PICUTRES", "detail" : "나만의 레시피 만들기 마지막 단계! 직접 만든 음료를 사진으로 찍어 등록하고, 썸네일 사진을 골라주세요."}
  ];

  onChangeStepStatus = event => {
    let clickText = event.target.innerText;
    let stepTarget = document.querySelectorAll(".step-1, .step-2, .step-3");

    stepTarget.forEach(val => {
      val.classList.remove("select-step");
    });

    switch (clickText) {
      case "STEP 1":
        stepTarget[0].classList.add("select-step");
        break;
      case "STEP 2":
        stepTarget[1].classList.add("select-step");
        break;
      case "STEP 3":
        stepTarget[2].classList.add("select-step");
        break;
      default:
        break;
    }
  };

  onSaveRecipe = event => {
    let doneView = document.querySelector(".done-container");

    doneView.classList.toggle("close");
  };

  render() {
    const { middle, step } = this.state;

    return (
      <div className={cx("enrolment-container")}>
        <Header
          onChangeStepStatus={this.onChangeStepStatus}
          onSaveRecipe={this.onSaveRecipe}
        />

        <div className={cx("content")}>
          <Left
            contents={this.contents}
          />

          {middle}
          
          {step}
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Enrolment);
