import React, { Component } from "react";
import classNames from "classnames/bind";
import styles from "./ViewRecipe.scss";
import { connect } from "react-redux";
import { Popup } from "../../components";
import RecipeHeader from "./Function/Header";
import RecipeCup from "./Function/ViewCup";
import RecipeImage from "./Function/ViewImage";
import RecipeInfo from "./Function/SideInfo";
import RecipeStuff from "./Function/SideStuff";
import RecipePhoto from "./Function/SidePhoto";
import RecipeComment from "./Function/SideComment";
import { recipeIDRequest } from "../../action/recipeAction";

const cx = classNames.bind(styles);

const mapStateToProps = state => {
  return {
    recipe_info: state.recipeReducer.recipe_info,
    stuffs: state.recipeReducer.stuffs,
    photos: state.recipeReducer.photos,
    comments: state.recipeReducer.comments
  };
};

const mapDispatchToProps = { recipeIDRequest };

class ViewRecipe extends Component {
  state = {
    recipe_info: {
      cocktail: "",
      description: "",
      nick: "",
      like: 0,
      comment: 0,
      view: 0,
      tags: []
    },
    stuffs: [],
    photos: [],
    comments: [],
    main: <RecipeCup />,
    side: <RecipeInfo recipe="" descripe="" tags={[]} />
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.recipeIDRequest(id);
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.stuff === undefined &&
      prevProps.photos === undefined &&
      prevProps.comments === undefined &&
      prevProps.recipe_info === undefined
    ) {
      this.setState(
        {
          recipe_info: this.props.recipe_info,
          stuffs: this.props.stuffs,
          photos: this.props.photos,
          comments: this.props.comments,
          side: (
            <RecipeInfo
              recipe={this.state.recipe_info.cocktail}
              descripe={this.state.recipe_info.description}
              tags={this.state.recipe_info.tags}
            />
          )
        },
        () => {
          document.getElementById(
            "cocktail"
          ).innerHTML = this.props.recipe_info.cocktail;
          document.getElementById(
            "description"
          ).innerHTML = this.props.recipe_info.description;
          // document.getElementById('alcohol').innerHTML = '...';
          document.getElementById(
            "tag"
          ).innerHTML = this.props.recipe_info.tags.join(" ");
        }
      );
    }
  }

  onChangeFocusing = event => {
    let info = document.querySelector("#info");
    let stuff = document.querySelector("#stuff");
    let photo = document.querySelector("#photo");
    let comment = document.querySelector("#comment");

    if (info === event.target || info === event.target.parentNode) {
      this.setState({
        main: <RecipeCup />,
        side: (
          <RecipeInfo
            recipe={this.state.recipe_info.cocktail}
            descripe={this.state.recipe_info.description}
            tags={this.state.recipe_info.tags}
          />
        )
      });
    } else if (stuff === event.target || stuff === event.target.parentNode) {
      this.setState({
        main: <RecipeCup />,
        side: <RecipeStuff stuffs={this.state.stuffs} />
      });
    } else if (photo === event.target || photo === event.target.parentNode) {
      this.setState({
        main: <RecipeImage />,
        side: <RecipePhoto photos={this.state.photos} />
      });
    } else if (
      comment === event.target ||
      comment === event.target.parentNode
    ) {
      this.setState({
        main: <RecipeCup />,
        side: (
          <RecipeComment
            comments={this.state.comments}
            onAddComment={this.onAddComment}
          />
        )
      });
    }
  };

  onAddComment = () => {
    let comment = document.querySelector("#commentText").value;
    if (comment !== "" && comment !== undefined && comment !== null) {
      let now = new Date();
      let time =
        now.getHours > 9
          ? `${now.getHours()}:${now.getMinutes()}`
          : `0${now.getHours()}:${now.getMinutes()}`;
      let comments = this.state.comments;
      comments.push({ nick: "사용자", comments: comment, time: time });

      this.setState({ comments: comments });
      this.setState({
        side: (
          <RecipeComment comments={comments} onAddComment={this.onAddComment} />
        )
      });
    }
  };

  viewRecipe_form = () => {
    return [
      <div key="viewRecipe" className={cx("detail-container")}>
        <div className={cx("detail-content")}>
          <span className={cx("detail-content-arrow", "left")} />
          <span className={cx("detail-content-arrow", "right")} />

          <RecipeHeader
            cocktail={this.state.recipe_info.cocktail}
            nick={this.state.recipe_info.nick}
            like={this.state.recipe_info.like}
            comment={this.state.recipe_info.comment}
          />

          <div className={cx("detail-content-main")}>
            <div className={cx("detail-content-main-view")}>
              {this.state.main}
            </div>

            <div className={cx("detail-content-main-side")}>
              <div className={cx("detail-content-main-side-toolbar")}>
                <span id="info" onClick={this.onChangeFocusing}>
                  정보
                </span>
                <span id="stuff" onClick={this.onChangeFocusing}>
                  재료
                </span>
                <span id="photo" onClick={this.onChangeFocusing}>
                  사진
                </span>
                <span id="comment" onClick={this.onChangeFocusing}>
                  댓글
                </span>
              </div>

              {this.state.side}
            </div>
          </div>
        </div>

        <div className={cx("side-button-container")}>
          <div className={cx("side-button-area")}>
            <span id="close-botton" />
            <span id="edit-botton" />
            <span id="delete-botton" />
            <span id="like-botton" />
          </div>
        </div>
      </div>
    ];
  };

  render() {
    return (
      <Popup
        id="viewRecipe"
        className={cx("recipe-view-detail")}
        content={this.viewRecipe_form()}
      />
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewRecipe);
