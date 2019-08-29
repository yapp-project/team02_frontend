import React from "react";
import classNames from "classnames/bind";
import styles from "./ShakeItem.scss";

const cx = classNames.bind(styles);

const ShakeItem = props => {
  const inlineStyle = {
    background: props.color,
    flexBasis: 0,
    flexGrow: props.per,
    display: props.per <= 0 && "none"
  };
  return (
    <div className={cx("item")} style={inlineStyle}>
      <div className={cx("text")}>
        {/* {props.name + " " + props.per + "%"} */}
      </div>
    </div>
  );
};

export default ShakeItem;
