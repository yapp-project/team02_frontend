import React from "react";
import classNames from "classnames/bind";
import styles from "./Edit.scss";

const cx = classNames.bind(styles);

const Edit = ({ className, value, type = "text", placeholder, onInput }) => {
  return (
    <input
      className={cx(className)}
      value={value}
      type={type}
      placeholder={placeholder}
      onInput={onInput}
    />
  );
};

export default Edit;
