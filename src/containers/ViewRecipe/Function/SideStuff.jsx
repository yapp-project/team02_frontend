import React from "react";
import classNames from "classnames/bind";
import styles from "./ViewRecipe.scss";

const cx = classNames.bind(styles);

const RecipeStuff = ({stuffs}) => {
  return (
    <div className={cx("detail-content-main-side-stuff")}>
        <div className={cx("detail-content-main-side-stuff-container")}>
            <div className={cx("detail-content-main-side-stuff-item")}>
                <span className={cx("stuff-color")}></span>
                <span className={cx("stuff-name")}>{stuffs[0].name}</span>
                <span className={cx("stuff-volume")}>{stuffs[0].volume}</span>
                <span className={cx("stuff-ratio")}>{stuffs[0].ratio}</span>
            </div>

            <div className={cx("detail-content-main-side-stuff-item")}>
                <span className={cx("stuff-color")}></span>
                <span className={cx("stuff-name")}>{stuffs[1].name}</span>
                <span className={cx("stuff-volume")}>{stuffs[1].volume}</span>
                <span className={cx("stuff-ratio")}>{stuffs[1].ratio}</span>
            </div>

            <div className={cx("detail-content-main-side-stuff-item")}>
                <span className={cx("stuff-color")}></span>
                <span className={cx("stuff-name")}>{stuffs[2].name}</span>
                <span className={cx("stuff-volume")}>{stuffs[2].volume}</span>
                <span className={cx("stuff-ratio")}>{stuffs[2].ratio}</span>
            </div>
        </div>
    </div>
  );
};

export default RecipeStuff;