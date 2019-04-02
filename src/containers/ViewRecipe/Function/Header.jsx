import React from "react";
import classNames from "classnames/bind";
import styles from "./ViewRecipe.scss";

const cx = classNames.bind(styles);

const RecipeHeader = ({cocktail, nick, like, comment}) => {
  return (
    <div className={cx("detail-content-header")}>
        <span>{cocktail}</span>

        <div className={cx("detail-content-header-info")}>
            <span>{nick}</span>

            <div className={cx("detail-content-header-info-count")}>
              <span style={{width: "16px", height: "16px", border: "1px solid #707070", "margin-right": "7px"}}></span>
              <span style={{"margin-right": "20px"}}>{like}</span>
              <span style={{width: "16px", height: "16px", border: "1px solid #707070", "margin-right": "7px"}}></span>
              <span>{comment}</span>
            </div>
        </div>
    </div>
  );
};

export default RecipeHeader;