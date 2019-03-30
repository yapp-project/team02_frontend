import React from "react";
import classNames from "classnames/bind";
import styles from "./Edit.scss";

const cx = classNames.bind(styles);

const Edit = ({
  id,
  className,
  value,
  type = "text",
  placeholder,
  onKeyUp
}) => {
  return (
    <input
      id={id}
      className={cx(className)}
      value={value}
      type={type}
      placeholder={placeholder}
      onKeyUp={onKeyUp}
    />
  );
};

export default Edit;
