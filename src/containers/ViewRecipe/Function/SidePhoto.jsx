import React from "react";
import classNames from "classnames/bind";
import styles from "./ViewRecipe.scss";

const cx = classNames.bind(styles);

const RecipePhoto = ({photos}) => {
  return (
    <div className={cx("detail-content-main-side-photo")}>
        <div className={cx("detail-content-main-side-photo-container")}>
            <span className={cx("photo-item")}>{photos[0]}</span>
            <span className={cx("photo-item")}>{photos[1]}</span>
            <span className={cx("photo-item")}>{photos[2]}</span>
            <span className={cx("photo-item")}>{photos[3]}</span>
            <span className={cx("photo-item")}>{photos[4]}</span>
            <span className={cx("photo-item")}>{photos[5]}</span>
        </div>
    </div>
  );
};

export default RecipePhoto;