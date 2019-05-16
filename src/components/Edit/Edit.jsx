import React from "react";
import classNames from "classnames/bind";
import styles from "./Edit.scss";

const cx = classNames.bind(styles);

const Edit = ({
  key,
  id,
  className,
  value,
  type = "text",
  placeholder,
  onKeyUp,
  onChange,
  defaultValue,
  min,
  max
}) => {
  return (
    <input
      key={key}
      id={id}
      className={cx(className)}
      value={value}
      type={type}
      placeholder={placeholder}
      onKeyUp={onKeyUp}
      onChange={onChange}
      defaultValue={defaultValue}
      min={min}
      max={max}
    />
  );
};

export default Edit;
