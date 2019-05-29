import React from "react";
import classNames from "classnames/bind";
import styles from "./Enrolment.scss";

const cx = classNames.bind(styles);

const EnrolmentHeader = ({onChangeStepStatus, onSaveRecipe}) => {
  return (
    <div className={cx("enrolment-header")}>
        <span className={cx("step-1", "select-step")} onClick={onChangeStepStatus}>
            <span>STEP 1</span>
        </span>

        <span className={cx("step-2")} onClick={onChangeStepStatus}>
            <span>STEP 2</span>
        </span>

        <span className={cx("step-3")} onClick={onChangeStepStatus}>
            <span>STEP 3</span>
        </span>

        <span id="saveRecipe" className={cx("save")} onClick={onSaveRecipe}>저장하기</span>
    </div>
  );
};

export default EnrolmentHeader;