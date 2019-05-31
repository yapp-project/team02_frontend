import React from "react";
import classNames from "classnames/bind";
import styles from "./Enrolment.scss";

const cx = classNames.bind(styles);

const EnrolmentMiddle = (props) => {
  return (
    <div className={cx("middle")}>
        <span id="cup-area"></span>
        <div class={cx("drink-container")}>
          <div class={cx("drink-color")}></div>
        </div>
    </div>
  );
};

export default EnrolmentMiddle;