import React from "react";
import classNames from "classnames/bind";
import styles from "./Div.scss";

const cx = classNames.bind(styles);

const Div = ({ id, className, content, onClick }) => {
  return (
    <div id={id} className={cx(className)} onClick={onClick}>
      {content}
    </div>
  );
};

export default Div;
