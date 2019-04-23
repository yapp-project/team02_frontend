import React from "react";
import classNames from "classnames/bind";
import styles from "./ViewRecipe.scss";
import { Edit, Button } from "../../../components";

const cx = classNames.bind(styles);

const RecipeComment = (props) => {
  return (
    <div className={cx("detail-content-main-side-comment")}>
        <div className={cx("detail-content-main-side-comment-container")}>
        {
            props.comments.map((input, index) => {
                return <div key={`comment${index}`} className={cx("detail-content-main-side-comment-item")}>
                        <span className={cx("comment-name")}>{input.nick}</span>
                        <span className={cx("comment-content")}>{input.comments}</span>
                        <span className={cx("comment-time")}>{input.time}</span>
                    </div>
           })
        }
        </div>

        <div className={cx("detail-content-main-side-comment-input")}>
            <Edit
                id="commentText"
                className={cx("comment-input")}
                type="text"
                placeholder="텍스트를 입력해주세요"
            />

            <Button
                className={cx("comment-button")}
                onClick={props.onAddComment}
            />
        </div>
    </div>
  );
};

export default RecipeComment;