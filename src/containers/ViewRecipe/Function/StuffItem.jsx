import React from "react";
import classNames from "classnames/bind";
import styles from "./ViewRecipe.scss";

const cx = classNames.bind(styles);

const EnrolmentStuffItem = props => {
  let style = {
    backgroundColor: props.color
  };

  return (
    <div className={cx("detail-content-main-side-stuff-item")}>
      <span style={style} className={cx("stuff-color")} />
      <span className={cx("stuff-name")}>{props.name}</span>
      <span className={cx("stuff-volume")} title={props.volume}>
        {props.volume}
      </span>
      <span className={cx("stuff-ratio")}>{props.ratio}</span>
    </div>
  );
};

export default EnrolmentStuffItem;
