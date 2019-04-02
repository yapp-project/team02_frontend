import React from "react";
import classNames from "classnames/bind";
import styles from "./ViewRecipe.scss";

const cx = classNames.bind(styles);

const RecipeCup = ({recipe, descripe, tags}) => {
  return (
    <div className={cx("detail-content-main-side-info")}>
        <span className={cx("side-info")}>레시피 이름</span>
        <span className={cx("side-info content")}>{recipe}</span>

        <span className={cx("side-info")}>한줄 설명</span>
        <span className={cx("side-info content")}>{descripe}</span>

        <span className={cx("side-info")}>도수</span>
        <ul className={cx("side-info-alcohol")}>
            <li></li>
        </ul>

        <span className={cx("side-info")}>태그</span>
        <span className={cx("side-info content")}>{tags}</span>
    </div>
  );
};

export default RecipeCup;