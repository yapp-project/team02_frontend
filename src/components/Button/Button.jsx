import React from "react";
import classNames from "classnames/bind";
import styles from "./Button.scss";
const cx = classNames.bind(styles);

const Button = props => {
  return (
    <button
      id={props.id ? props.id : props.className}
      key={props.key ? props.key : props.className}
      className={cx(props.className, { button: !props.className })}
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
};

export default Button;
