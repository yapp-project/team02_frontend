import React from "react";
import classNames from "classnames/bind";
import styles from "./ViewRecipe.scss";

const cx = classNames.bind(styles);

const RecipeHeader = (props) => {
  return (
    <div className={cx("detail-content-header")}>
        <span>{props.cocktail}</span>

        <div className={cx("detail-content-header-info")}>
            <span>{props.nick}</span>

            <div className={cx("detail-content-header-info-count")}>
              <span style={{width: "16px", height: "16px", border: "1px solid #707070", "marginRight": "7px"}}></span>
              <span style={{"marginRight": "20px"}}>{props.like}</span>
              <span style={{width: "16px", height: "16px", border: "1px solid #707070", "marginRight": "7px"}}></span>
              <span>{props.comment}</span>
            </div>
        </div>
    </div>
  );
};

export default RecipeHeader;