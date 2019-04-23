import React from "react";
import classNames from "classnames/bind";
import styles from "./Enrolment.scss";

const cx = classNames.bind(styles);

const EnrolmentStep3 = (props) => {
  return (
    <div className={cx("step", "step3")}>
        <div className={cx("step3-container")}>
            <span className={cx("thums-image")}></span>

            <div className={cx("other-image")}>
                <span className={cx("images-item")}></span>
                <span className={cx("images-item")}></span>
                <span className={cx("images-item")}></span>
                <span className={cx("images-item")}></span>
                <span className={cx("images-item")}></span>
                <span className={cx("images-item")}></span>
                <span className={cx("images-item")}></span>
                <span className={cx("images-item")}></span>
            </div>
        </div>
    </div>
  );
};

export default EnrolmentStep3;