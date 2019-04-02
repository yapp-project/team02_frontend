import React from "react";
import classNames from "classnames/bind";
import styles from "./Enrolment.scss";

const cx = classNames.bind(styles);

const EnrolmentLeft = ({contents}) => {
  return (
    <div className={cx("left")}>
        <span className={cx("title")}>{contents[0].title}</span>
        
        <span className={cx("detail")}>
            <span className={cx("contour")}></span>

            {contents[0].detail}
        </span>
    </div>
  );
};

export default EnrolmentLeft;