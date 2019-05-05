import React from "react";
import classNames from "classnames/bind";
import styles from "./ViewRecipe.scss";

const cx = classNames.bind(styles);

const RecipeCup = (props) => {
  return (
    <div className={cx("detail-content-main-side-info")}>
        <span className={cx("side-info")}>레시피 이름</span>
        <span id="cocktail" className={cx("side-info", "content")}>{props.recipe}</span>

        <span className={cx("side-info")}>한줄 설명</span>
        <span id="description" className={cx("side-info", "content")}>{props.descripe}</span>

        <span className={cx("side-info")}>도수</span>
        <span id="alcohol" className={cx("side-info", "alcohol")}></span>

        <span className={cx("side-info")}>태그</span>
        <span id="tag" className={cx("side-info", "content", "tags")}>{props.tags.join(' ')}</span>
    </div>
  );
};

export default RecipeCup;