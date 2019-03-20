import React from "react";
import classNames from "classnames/bind";
import styles from "./Button.scss";
const cx = classNames.bind(styles);

const Button = ({ className, value, onClick }) => {
  return (
    <button className={cx(styles.button, className)} onClick={onClick}>
      {value}
    </button>
  );
};

export default Button;
