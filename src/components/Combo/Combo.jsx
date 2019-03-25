import React from "react";
import Select from "react-select"; //select libery사용
import classNames from "classnames/bind";
import styles from "./Combo.scss";

const cx = classNames.bind(styles);

const Combo = ({ className, options, handleChange, defaultValue, styles }) => {
  return (
    <Select
      className={cx(className, { default: !className })}
      options={options}
      onChange={handleChange}
      defaultValue={defaultValue}
      styles={styles}
    />
  );
};

export default Combo;
