import React from "react";
import classNames from "classnames/bind";
import styles from "./ViewRecipe.scss";
import StuffItem from "./StuffItem";

const cx = classNames.bind(styles);

const RecipeStuff = (props) => {
  return (
    <div className={cx("detail-content-main-side-stuff")}>
        <div className={cx("detail-content-main-side-stuff-container")}>
        {
            props.stuffs.map((input, index) => {
                return <StuffItem
                    key={`stuffItem${index}`}
                    color={input.color}
                    name={input.name}
                    volume={input.volume}
                    ratio={input.ratio}
                />
             })
        }
        </div>
    </div>
  );
};

export default RecipeStuff;