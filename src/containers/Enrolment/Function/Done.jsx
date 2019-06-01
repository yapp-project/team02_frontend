import React from "react";
import classNames from "classnames/bind";
import styles from "./Enrolment.scss";
import { Button } from "../../../components";

const cx = classNames.bind(styles);

const EnrolmentDone = (props) => {
  return (
    <div id="done-container" className={cx("done-container", "close")}>
        <div className={cx("done-notification-area")}>
            <span className={cx("done-closeButton")} onClick={props.onDoneClose}></span>

            <span className={cx("done-icon")}></span>

            <span className={cx("done-title")}>Thank you!</span>

            <span className={cx("done-content")}>
            나만의 레시피가 성공적으로 등록되었습니다!
            <br></br>
            많은 사람들과 레시피를 공유해보세요.
            </span>

            <div className={cx("button-area")}>
                <Button
                    className={cx("confirm")}
                    value="레시피 확인하기"
                    // onClick={this.onSearh}
                />
                
                <Button
                    className={cx("enrollment")}
                    value="새 레시피 등록하기"
                    // onClick={this.onSearh}
                />
            </div>
        </div>
    </div>
  );
};

export default EnrolmentDone;