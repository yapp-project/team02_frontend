import React from "react";
import classNames from "classnames/bind";
import styles from "./SearchResultItem.scss";

const cx = classNames.bind(styles);

/**
 * @author AnGwangHo
 * @description 한개의 칵테일 검색결과를 보여준다
 * @param props object형태의 칵테일 정보 {no, Image, name}
 */
const SearchResultItem = ({ className, props }) => {
  const { no, Image, name } = props;

  return (
    <div className={cx(className, { image_container: !className })}>
      <img className={cx("item_img")} src={Image} alt="사진" />
      <div className={cx("information_rect")}>
        <div className={cx("cocktailName")}>{name}</div>
        <div className={cx("bottom")}>
          <div className={cx("userName")}>{name}</div>
          <div className={cx("right")}>
            <div className={cx("like")} />
            <div className={cx("number")}>123</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResultItem;
