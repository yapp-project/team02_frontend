import React from "react";
import classNames from "classnames/bind";
import styles from "./ViewRecipe.scss";

const cx = classNames.bind(styles);

const RecipePhoto = (props) => {
  return (
    <div className={cx("detail-content-main-side-photo")}>
        <div className={cx("detail-content-main-side-photo-container")}>
        {
          props.photos.map((input, index) => {
            return <span key={`images${index}`} className={cx("photo-item")}>{input}</span>
         })
        }
        </div>
    </div>
  );
};

export default RecipePhoto;