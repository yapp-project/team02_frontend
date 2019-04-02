import React from "react";
import classNames from "classnames/bind";
import styles from "./ViewRecipe.scss";

const cx = classNames.bind(styles);

const RecipeImage = () => {
  return (
    <span className={cx("detail-content-main-view-image")}></span>
  );
};

export default RecipeImage;