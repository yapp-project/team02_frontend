import React from "react";
import classNames from "classnames/bind";
import styles from "./ViewRecipe.scss";

const cx = classNames.bind(styles);

const RecipeCup = () => {
  return (
    <span className={cx("detail-content-main-view-cup")}></span>
  );
};

export default RecipeCup;