import React from "react";
import classNames from "classnames/bind";
import styles from "./Enrolment.scss";
import { Edit } from "../../../components";

const cx = classNames.bind(styles);

const EnrolmentStep1 = props => {
  return (
    <div className={cx("step", "step1")}>
      <span className={cx("title")}>CHOOSE CUP</span>

      <div className={cx("cup-select-container")}>
        <span
          className={cx(
            "cup-item1",
            props.info.cup === "하이볼" ? "select" : ""
          )}
          onClick={props.onChangeCup}
        >
          <em>하이볼</em>
        </span>
        <span
          className={cx(
            "cup-item2",
            props.info.cup === "리큐르" ? "select" : ""
          )}
          onClick={props.onChangeCup}
        >
          <em>리큐르</em>
        </span>
        <span
          className={cx(
            "cup-item3",
            props.info.cup === "허리케인" ? "select" : ""
          )}
          onClick={props.onChangeCup}
        >
          <em>허리케인</em>
        </span>
        <span
          className={cx(
            "cup-item4",
            props.info.cup === "마가렛" ? "select" : ""
          )}
          onClick={props.onChangeCup}
        >
          <em>마가렛</em>
        </span>
        <span
          className={cx(
            "cup-item5",
            props.info.cup === "마티니" ? "select" : ""
          )}
          onClick={props.onChangeCup}
        >
          <em>마티니</em>
        </span>
      </div>

      <span className={cx("information")}>INFORMATION</span>

      <div className={cx("descripe")}>
        <span>레시피 이름</span>

        <Edit
          id="recipe-name"
          className={cx("recipe-name")}
          placeholder="레시피 이름"
          onChange={props.onSaveName}
          value={props.info.name}
        />
      </div>

      <div className={cx("descripe")}>
        <span>한줄 설명</span>

        <Edit
          id="recipe-descripe"
          className={cx("recipe-descripe")}
          placeholder="이 레시피에 대한 설명"
          onChange={props.onSaveDescribe}
          value={props.info.describe}
        />
      </div>

      <div className={cx("descripe")}>
        <span>도수</span>

        <ul className={cx("alcohol")}>
          <li
            className={cx(
              "alcohol-item1",
              props.info.alcohol === 0 ? "select" : ""
            )}
            onClick={props.onChangeAlcohol}
          >
            <span>0˚ ~ 5˚</span>
            <span>술이야?</span>
            <span>음료수야?</span>
          </li>
          <li
            className={cx(
              "alcohol-item2",
              props.info.alcohol === 1 ? "select" : ""
            )}
            onClick={props.onChangeAlcohol}
          >
            <span>5˚ ~ 15˚</span>
            <span>기분좋게</span>
            <span>알딸딸~</span>
          </li>
          <li
            className={cx(
              "alcohol-item3",
              props.info.alcohol === 2 ? "select" : ""
            )}
            onClick={props.onChangeAlcohol}
          >
            <span>15˚ ~ 25˚</span>
            <span>마셔라</span>
            <span>쭉쭉쭉~</span>
          </li>
          <li
            className={cx(
              "alcohol-item4",
              props.info.alcohol === 3 ? "select" : ""
            )}
            onClick={props.onChangeAlcohol}
          >
            <span>25˚ ~ 40˚</span>
            <span>너 죽고</span>
            <span>나 죽자!</span>
          </li>
          <li
            className={cx(
              "alcohol-item5",
              props.info.alcohol === 4 ? "select" : ""
            )}
            onClick={props.onChangeAlcohol}
          >
            <span>40˚ ~</span>
            <span>진정한</span>
            <span>술고래!</span>
          </li>
        </ul>
      </div>

      <div className={cx("descripe")}>
        <span>태그</span>

        <Edit
          id="recipe-tag"
          className={cx("recipe-tag")}
          placeholder="#태그명"
          onChange={props.onSaveTags}
          value={props.info.tags}
        />
      </div>
    </div>
  );
};

export default EnrolmentStep1;
