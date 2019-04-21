import React from "react";
import classNames from "classnames/bind";
import styles from "./ViewRecipe.scss";

const cx = classNames.bind(styles);


const EnrolmentStuffItem = (props) => {
  return (
    <div key={`stuff${props.idx}`} className={cx("detail-content-main-side-stuff-item")}>
        <span className={cx("stuff-color")}></span>
        <span className={cx("stuff-name")}>{props.name}</span>
        <span className={cx("stuff-volume")}>{props.volume}</span>
        <span className={cx("stuff-ratio")}>{props.ratio}</span>
    </div>
  );
};

export default EnrolmentStuffItem;