import React from "react";
import classNames from "classnames/bind";
import styles from "./Enrolment.scss";
import { Edit } from "../../../components";

const cx = classNames.bind(styles);

const EnrolmentStep1 = () => {
  return (
    <div className={cx("step", "step1")}>
        <span className={cx("title")}>CHOOSE CUP</span>

        <div className={cx("cup-select-container")}>
            <span className={cx("cup-item1")}><text>하이볼</text></span>
            <span className={cx("cup-item2", "select")}><text>리큐르</text></span>
            <span className={cx("cup-item3")}><text>허리케인</text></span>
            <span className={cx("cup-item4")}><text>마가렛</text></span>
            <span className={cx("cup-item5")}><text>마티니</text></span>
        </div>

        <span className={cx("information")}>INFORMATION</span>

        <div className={cx("descripe")}>
            <span>레시피 이름</span>

            <Edit
            className={cx("recipe-name")}
            placeholder="레시피 이름"
            />
        </div>

        <div className={cx("descripe")}>
            <span>한줄 설명</span>

            <Edit
            className={cx("recipe-descripe")}
            placeholder="레시피 이름"
            />
        </div>

        <div className={cx("descripe")}>
            <span>도수</span>

            <ul className={cx("alcohol")}>
                <li className={cx("alcohol-item1")}></li>
                <li className={cx("alcohol-item2")}></li>
                <li className={cx("alcohol-item3")}></li>
                <li className={cx("alcohol-item4")}></li>
                <li className={cx("alcohol-item5")}></li>
            </ul>
        </div>

        <div className={cx("descripe")}>
            <span>태그</span>

            <Edit
            className={cx("recipe-tag")}
            placeholder="#태그명"
            />

            <Edit
            className={cx("recipe-tag")}
            placeholder="#태그명"
            />
        </div>
    </div>
  );
};

export default EnrolmentStep1;