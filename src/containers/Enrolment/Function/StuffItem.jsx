import React from "react";
import classNames from "classnames/bind";
import styles from "./Enrolment.scss";
import { Edit } from "../../../components";

const cx = classNames.bind(styles);

const EnrolmentStuffItem = props => {
  let styles = {
    backgroundColor: props.stuff.color
  };

  return (
    <div className={cx("stuff-item")} stuff={props.idx}>
      <div className={cx("stuff-item-container")}>
        <div className={cx("stuff-item-input")}>
          <span
            id={`item-color_${props.idx}`}
            className={cx("stuff-item-color")}
            stuff={props.idx}
            onClick={e => props.onSelectColor(e)}
            style={styles}
          />

          <Edit
            className={cx("stuff-item-input-stuff")}
            placeholder="재료 이름"
            defaultValue={props.stuff.name}
            onChange={e => props.onSaveStuffName(e, props.idx)}
          />

          <Edit
            className={cx("stuff-item-input-volume")}
            placeholder="용량"
            type="number"
            value={props.stuff.ml}
            onChange={e => props.onSaveStuffVolume(e, props.idx)}
            min={0}
          />

          <span className={cx("volume-text")}> ml</span>

          <span className={cx("stuff-item-ratio")}>{`${
            props.stuff.ratio
          } %`}</span>
        </div>

        <span className={cx("stuff-delete")} onClick={props.onDeleteStuff} />
      </div>
    </div>
  );
};

export default EnrolmentStuffItem;
