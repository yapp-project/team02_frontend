import React from "react";
import classNames from "classnames/bind";
import styles from "./ViewRecipe.scss";

const alcoholContent = [
  ["0˚ ~ 5˚", "술이야?", "음료수야?"],
  ["5˚ ~ 15˚", "기분좋게", "알딸딸~"],
  ["15˚ ~ 25˚", "마셔라", "쭉쭉쭉~"],
  ["25˚ ~ 40˚", "너 죽고", "나 죽자!"],
  ["40˚ ~", "진정한", "술고래!"]
]

const cx = classNames.bind(styles);

const RecipeCup = (props) => {
  return (
    <div className={cx("detail-content-main-side-info")}>
        <span className={cx("side-info")}>레시피 이름</span>
        <span id="cocktail" className={cx("side-info", "content")}>{props.recipe}</span>

        <span className={cx("side-info")}>한줄 설명</span>
        <span id="description" className={cx("side-info", "content")}>{props.descripe}</span>

        <span className={cx("side-info")}>도수</span>
        <span id="alcohol" className={cx("side-info", "alcohol")}>
          {
            alcoholContent[props.alcohol].map((input, index) => {
              return <span key={`images${index}`}>{input}</span>
            })
          }
        </span>

        <span className={cx("side-info")}>태그</span>
        <span id="tag" className={cx("side-info", "content", "tags")}>{props.tags.join(' ')}</span>
    </div>
  );
};

export default RecipeCup;