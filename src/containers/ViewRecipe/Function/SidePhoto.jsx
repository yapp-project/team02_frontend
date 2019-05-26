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
            let style = {
              backgroundImage: `url(${input})`,
              backgroundSize: 'contain',
              cursor: 'pointer'
            }
            return <span style={style} key={`images${index}`} className={cx("photo-item")} idx={index} onClick={event => props.changePhoto(event)}></span>
         })
        }
        </div>
    </div>
  );
};

export default RecipePhoto;