import React from "react";
import classNames from "classnames/bind";
import styles from "./Enrolment.scss";
import { Button } from "../../../components";
import StuffItem from "./StuffItem";

const cx = classNames.bind(styles);

const EnrolmentStep2 = props => {
  const _stuff = props.stuff.concat().reverse();
  const len = _stuff.length - 1;
  return (
    <div className={cx("step", "step2")}>
      <div className={cx("step2-container")}>
        <Button
          className={cx("shake")}
          value="Shake Me!"
          onClick={props.onShakeMe}
        />

        <div className={cx("stuff-area")}>
          <div id="stuff-container" className={cx("stuff-container")}>
            <span
              id="add-button"
              className={cx("stuff-add")}
              onClick={props.onAddStuff}
            />
            {_stuff.map((input, index) => {
              return (
                <StuffItem
                  key={`stuff${len - index}`}
                  idx={len - index}
                  stuff={input}
                  onDeleteStuff={props.onDeleteStuff}
                  onSaveStuffName={props.onSaveStuffName}
                  onSaveStuffVolume={props.onSaveStuffVolume}
                  onSelectColor={props.onSelectColor}
                  validateNumber={props.validateNumber}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnrolmentStep2;
