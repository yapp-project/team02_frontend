import React from "react";
import classNames from "classnames/bind";
import styles from "./Enrolment.scss";
import { Edit, Button } from "../../../components";

const cx = classNames.bind(styles);

const EnrolmentStep2 = () => {
  return (
    <div className={cx("step", "step2")}>
        <div className={cx("step2-container")}>
            <Button
                className={cx("shake")}
                value="Shake Me!"
                // onClick={this.onSearh}
            />

            <div className={cx("stuff-container")}>
                <span className={cx("stuff-add")}></span>

                <div className={cx("stuff-item")}>
                    <span className={cx("stuff-item-color")}></span>

                    <Edit
                        className={cx("stuff-item-input-stuff")}
                        placeholder="재료 이름"
                    />

                    <Edit
                        className={cx("stuff-item-input-volume")}
                        placeholder="용량 ml"
                    />

                    <span className={cx("stuff-item-ratio")}>30%</span>
                </div>
            </div>
        </div>
    </div>
  );
};

export default EnrolmentStep2;