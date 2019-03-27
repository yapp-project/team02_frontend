import React from "react";
import classNames from "classnames/bind";
import styles from "./CommonStep.scss";
import { Edit, Button } from "../../components";

const cx = classNames.bind(styles);

const Div = ({ contents, onChangeStepStatus, onSaveRecipe }) => {
  return (
    <div className={cx("common-container")}>
      <div className={cx("common-container-header")}>
        <span className={cx("step-1 select-step")} onClick={onChangeStepStatus}>
          <span>STEP 1</span>
        </span>

        <span className={cx("step-2")} onClick={onChangeStepStatus}>
          <span>STEP 2</span>
        </span>

        <span className={cx("step-3")} onClick={onChangeStepStatus}>
          <span>STEP 3</span>
        </span>

        <span className={cx("save")} onClick={onSaveRecipe}>저장하기</span>
      </div>

      <div className={cx("common-container-body")}>
        <div className={cx("common-content")}>
          <div className={cx("common-content-left")}>
            <span className={cx("common-container-title")}>{contents[0].title}</span>
            
            <span className={cx("common-container-detail")}>
              <span className={cx("common-container-contour")}></span>

              {contents[0].detail}
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

        <div className={cx("common-container-step3 close")}>
          <div className={cx("step3-container")}>
            <span className={cx("thums-image")}></span>

            <div className={cx("other-image")}>
              <span className={cx("images-item")}></span>
              <span className={cx("images-item")}></span>
              <span className={cx("images-item")}></span>
              <span className={cx("images-item")}></span>
              <span className={cx("images-item")}></span>
              <span className={cx("images-item")}></span>
              <span className={cx("images-item")}></span>
              <span className={cx("images-item")}></span>
            </div>
          </div>
        </div>
      </div>

      <div className={cx("done-container close")}>
        <div className={cx("done-notification-area")}>
          <span className={cx("done-closeButton")} onClick={onSaveRecipe}></span>

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
    </div>
  );
};

export default Div;

