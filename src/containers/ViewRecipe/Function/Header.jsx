import React from "react";
import classNames from "classnames/bind";
import styles from "./ViewRecipe.scss";
import heartImage from "../../../static/images/heart.svg";
import commentImage from "../../../static/images/comment_top.svg";

const toolbarStyleCommon = {
  width: '17px',
  backgroundRepeat: 'no-repeat',
  marginRight: '7px'
}

const cx = classNames.bind(styles);

const RecipeHeader = (props) => {
  return (
    <div className={cx("detail-content-header")}>
        <span>{props.cocktail}</span>

        <div className={cx("detail-content-header-info")}>
            <span>{props.nick}</span>

            <div className={cx("detail-content-header-info-count")}>
              <span style={Object.assign({},
                toolbarStyleCommon,
                {backgroundImage: `url(${heartImage})`})}></span>
              <span style={{"marginRight": "20px"}}>{props.like}</span>
              <span style={Object.assign({},
                toolbarStyleCommon,
                {backgroundImage: `url(${commentImage})`})}></span>
              <span>{props.comment}</span>
            </div>
        </div>
    </div>
  );
};

export default RecipeHeader;