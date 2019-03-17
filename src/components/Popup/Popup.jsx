import React from "react";
import classNames from "classnames/bind";
import styles from "./Popup.scss";
import Div from "../Div/Div";

const cx = classNames.bind(styles);

/**
 * @author AnGwangHo
 * @description 팝업 Div
 * @param id Block되는 Div ID
 * @param className Popup창 style(default : innercontainer)
 * @param content Popup창에 표시할 Tags
 * @param onClick Block된 Div의 Onclick 함수
 */
const Popup = ({ id, className = "innercontainer", content, onClick }) => {
  return (
    <div id={id} className={styles.popup} onClick={onClick}>
      <Div
        id={id + "_innercontainer"}
        className={cx(className)}
        content={content}
      />
    </div>
  );
};

export default Popup;
