import React from "react";
import classNames from "classnames/bind";
import styles from "./Enrolment.scss";
import { Edit } from "../../../components";
import { SliderPicker } from 'react-color';

const cx = classNames.bind(styles);

const handleChangeComplete = (color, idx) => {
    let colorTarget = document.querySelector(`#item-color_${idx}`);

    colorTarget.style.backgroundColor = color.hex;
};

const EnrolmentStuffItem = (props) => {
    let styles = {
        backgroundColor: props.stuff.color
    }
    
  return (
    <div className={cx("stuff-item")} stuff={props.idx}>
        <div className={cx("stuff-item-container")}>
            <div className={cx("stuff-item-input")}>
                <span id={`item-color_${props.idx}`} className={cx("stuff-item-color")} stuff={props.idx} onClick={props.onSelectColor} style={styles}></span>
                
                <div id={`color-picker_${props.idx}`} className={cx("color-picker", "close")}>
                    <SliderPicker 
                        styles={{ default: { wrap: {width: "200px"} } }}
                        onChangeComplete={ e => handleChangeComplete(e, props.idx) }
                    />
                    <span id={"color-picker-background"} className={cx("picker-background")} onClick={props.onSelectColor}></span>
                </div>

                <Edit
                    className={cx("stuff-item-input-stuff")}
                    placeholder="재료 이름"
                    defaultValue={props.stuff.name}
                    onChange={e => props.onSaveStuffName(e, props.idx)}
                />

                <Edit
                    className={cx("stuff-item-input-volume")}
                    placeholder="용량"
                    defaultValue={props.stuff.volume}
                    onChange={e => props.onSaveStuffVolume(e, props.idx)}
                />

                <span className={cx("volume-text")}> ml</span>

                <span className={cx("stuff-item-ratio")}>{`${props.stuff.ratio} %`}</span>

                <span className={cx("stuff-item-delete")} onClick={props.onDeleteStuff}></span>
            </div>
        </div>
    </div>
  );
};

export default EnrolmentStuffItem;