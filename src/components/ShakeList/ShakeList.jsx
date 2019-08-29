import React from "react";
import classNames from "classnames/bind";
import styles from "./ShakeList.scss";
import ShakeItem from "./ShakeItem";

const cx = classNames.bind(styles);

/**
 * @author AnGwangHo
 * @description Shake Me의 Overay Layout
 * @param id Component의 이름
 * @param className css설정할 이름 default : shakelist
 * @param shakeitem 재료의 array객체로 순서대로 표현한다[{color, name, ml, %, size}, ...]
 * @param direction 재료가 시작할 위치를 설정한다(하->상 : 0, 상->하 : 1)
 * @param startposition 시작 위치에서 부모로부터 얼마나 띄울지를 설정한다(margin과 유사)
 * @param endposition 시작 위치로부터 어디까지 아이템을 표현할 지 설정한다
 * @param width 현재 List의 크기를 설정한다.
 * @param height 현재 List의 높이를 설정한다.
 */
const ShakeList = ({
  id,
  className = cx("shakelist"),
  shakeitem,
  direction = 0,
  startposition,
  endposition,
  width,
  left
}) => {
  const listStyle = {
    width: width,
    left: left
  };
  const containerStyle = {
    height: endposition,
    bottom: startposition
  };

  return (
    <div id={id} className={className} style={listStyle}>
      <div className={cx("shakelist_container")} style={containerStyle}>
        {shakeitem.map(item => {
          return (
            <ShakeItem
              key={Math.random()}
              color={item.color}
              name={item.name}
              ml={item.ml}
              per={item.ratio}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ShakeList;
