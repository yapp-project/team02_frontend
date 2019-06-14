import React from "react";
import classNames from "classnames/bind";
import styles from "./ViewRecipe.scss";
import StuffItem from "./StuffItem";

const cx = classNames.bind(styles);

const RecipeStuff = (props) => {
  let totalVolume = 0;
  props.stuffs.forEach(val => {
    totalVolume += val.ml;
  });

  for(let i = 0; i < props.stuffs.length; i++) {
    props.stuffs[i].ratio = Math.floor(props.stuffs[i].ml / totalVolume * 100) + ' %';
    props.stuffs[i].ml = props.stuffs[i].ml + ' ml';
  }

  return (
    <div className={cx("detail-content-main-side-stuff")}>
        <div className={cx("detail-content-main-side-stuff-container")}>
        {
            props.stuffs.map((input, index) => {
                return <StuffItem
                    key={`stuffItem${index}`}
                    color={input.color}
                    name={input.name}
                    volume={input.ml}
                    ratio={input.ratio}
                />
             })
        }
        </div>
    </div>
  );
};

export default RecipeStuff;