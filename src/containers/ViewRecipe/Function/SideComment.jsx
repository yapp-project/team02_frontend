import React from "react";
import classNames from "classnames/bind";
import styles from "./ViewRecipe.scss";
import { Edit, Button } from "../../../components";

const cx = classNames.bind(styles);

const RecipeComment = ({comments}) => {
  return (
    <div className={cx("detail-content-main-side-comment")}>
        <div className={cx("detail-content-main-side-comment-container")}>
            <div className={cx("detail-content-main-side-comment-item")}>
                <span className={cx("comment-name")}>{comments[0].nick}</span>
                <span className={cx("comment-content")}>{comments[0].comments}</span>
                <span className={cx("comment-time")}>{comments[0].time}</span>
            </div>

            <div className={cx("detail-content-main-side-comment-item")}>
                <span className={cx("comment-name")}>{comments[1].nick}</span>
                <span className={cx("comment-content")}>{comments[1].comments}</span>
                <span className={cx("comment-time")}>{comments[1].time}</span>
            </div>

            <div className={cx("detail-content-main-side-comment-item")}>
                <span className={cx("comment-name")}>{comments[2].nick}</span>
                <span className={cx("comment-content")}>{comments[2].comments}</span>
                <span className={cx("comment-time")}> {comments[2].time}</span>
            </div>
        </div>

        <div className={cx("detail-content-main-side-comment-input")}>
            <Edit
                className={cx("comment-input")}
                type="text"
                placeholder="텍스트를 입력해주세요"
            />

            <Button
                className={cx("comment-button")}
            />
        </div>
    </div>
  );
};

export default RecipeComment;