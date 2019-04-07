import React from "react";
import classNames from "classnames/bind";
import styles from "./Enrolment.scss";
import { Button } from "../../../components";
import StuffItem from "./StuffItem";

const cx = classNames.bind(styles);

const EnrolmentStep2 = (props) => {
  return (
    <div className={cx("step", "step2")}>
        <div className={cx("step2-container")}>
            <Button
                className={cx("shake")}
                value="Shake Me!"
                // onClick={this.onSearh}
            />

            <div className={cx("stuff-container")}>
                <span id="add-button" className={cx("stuff-add")} onClick={props.onAddStuff}></span>

                {
                    props.stuff.map((input, index) => {
                        console.log(input);
                        return <StuffItem
                            idx={index}
                            stuff={input}
                            onDeleteStuff={props.onDeleteStuff}
                            onSaveStuffName={props.onSaveStuffName}
                            onSaveStuffVolume={props.onSaveStuffVolume}
                        />
                    })
                }
                
            </div>
        </div>
    </div>
  );
};

export default EnrolmentStep2;