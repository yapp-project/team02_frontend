import React from "react";
import classNames from "classnames/bind";
import styles from "./Enrolment.scss";
import { ShakeList } from "../../../components";
import cup_empty1 from "../../../static/images/glass1_full_enrolment.png";
const cx = classNames.bind(styles);

const EnrolmentMiddle = props => {
  return (
    <div className={cx("middle")}>
      {/* <span id="cup-area" /> */}
      <div className={cx("cup_container")}>
        <img
          id="cup-area"
          className={cx("cup_img")}
          src={props.cupImage ? props.cupImage : cup_empty1}
          alt="컵"
        />
      </div>
      {props.stuff && (
        <div className={cx("drink-container")}>
          <ShakeList
            id={props.id}
            className={props.className}
            shakeitem={props.stuff}
            direction={props.direction}
            startposition={props.startposition}
            endposition={props.endposition}
          />
        </div>
      )}
    </div>
  );
};

export default EnrolmentMiddle;
