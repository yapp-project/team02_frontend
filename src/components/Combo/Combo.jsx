import React from "react";
import Select from "react-select"; //select libery사용
import classNames from "classnames/bind";
import styles from "./Combo.scss";

const cx = classNames.bind(styles);

const Combo = ({
  id,
  className,
  options,
  handleChange,
  defaultValue,
  styles,
  isSearchable,
  value
}) => {
  return (
    <Select
      id={id}
      className={cx(className, { default: !className })}
      value={value}
      options={options}
      onChange={handleChange}
      isSearchable={isSearchable}
      defaultValue={defaultValue}
      styles={styles}
    />
  );
};

export default Combo;
