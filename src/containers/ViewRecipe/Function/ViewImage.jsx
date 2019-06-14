import React from "react";
import classNames from "classnames/bind";
import styles from "./ViewRecipe.scss";

const cx = classNames.bind(styles);

const RecipeImage = (props) => {
  const style = {
    backgroundImage: `url(${props.image})`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  }

  return (
    <span style={style} id="viewImage" className={cx("detail-content-main-view-image")}></span>
  );
};

export default RecipeImage;