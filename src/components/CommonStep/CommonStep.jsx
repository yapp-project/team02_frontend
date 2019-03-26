import React from "react";
import classNames from "classnames/bind";
import styles from "./CommonStep.scss";
import { Edit } from "../../components";

const cx = classNames.bind(styles);

const Div = ({ title, detail }) => {
  return (
    <div className={cx("common-container")}>
      <div className={cx("common-container-header")}>
        <span className={cx("step-1")}>
          <span className={cx("step")}>STEP1</span>
        </span>

        <span className={cx("step-2")}>
          <span className={cx("step")}>STEP2</span>
        </span>

        <span className={cx("step-3")}>
          <span className={cx("step")}>STEP3</span>
        </span>

        <span className={cx("save")}>저장하기</span>
      </div>

      <div className={cx("common-container-body")}>
        <div className={cx("common-content")}>
          <div className={cx("common-content-left")}>
            <span className={cx("common-container-title")}>{title}</span>
            
            <span className={cx("common-container-detail")}>
              <span className={cx("common-container-contour")}></span>
              {detail}
            </span>
          </div>
        </div>

        <div className={cx("common-content-middle")}>
          <span className={cx("common-container-cup")}></span>
        </div>

        <div className={cx("common-container-step1 show")}>
          <div className={cx("step1-container")}>
            <span className={cx("title")}>CHOOSE CUP</span>

            <div className={cx("cup-select-container")}>
              <span className={cx("cup-item1")}></span>
              <span className={cx("cup-item2")}></span>
              <span className={cx("cup-item3")}></span>
              <span className={cx("cup-item4")}></span>
              <span className={cx("cup-item5")}></span>
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
            </div>
          </div>
        </div>

        <div className={cx("common-container-step2 close")}>
          hello
        </div>

        <div className={cx("common-container-step3 close")}>
          hello
        </div>
      </div>
    </div>
  );
};

export default Div;

