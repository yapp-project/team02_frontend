import React, { Component } from "react";
import classNames from "classnames/bind";
import styles from "./ViewRecipe.scss";
import { connect } from "react-redux";
import { Popup, Button } from "../../components";
import RecipeHeader from "./Function/Header";
import RecipeCup from "./Function/ViewCup";
import RecipeImage from "./Function/ViewImage";
import RecipeInfo from "./Function/SideInfo";
import RecipeStuff from "./Function/SideStuff";
import RecipePhoto from "./Function/SidePhoto";
import RecipeComment from "./Function/SideComment";
import { recipeIDRequest } from "../../action/recipeAction";

import infoImage from "../../static/images/info.svg";
import stuffImage from "../../static/images/stuff.svg";
import photoImage from "../../static/images/photo.svg";
import commentImage from "../../static/images/comment.svg";

import infoImageP from "../../static/images/info_p.svg";
import stuffImageP from "../../static/images/stuff_p.svg";
import photoImageP from "../../static/images/photo_p.svg";
import commentImageP from "../../static/images/comment_p.svg";

import closeIcon from "../../static/images/close.svg";
import modifyIcon from "../../static/images/modify.svg";
import deleteIcon from "../../static/images/delete.svg";
import heartIcon from "../../static/images/heart-button.svg";

import arrowLeft from "../../static/images/arrow-left.svg";
import arrowRight from "../../static/images/arrow-right.svg";

import { setScrapRequest } from "../../action/userAction.js";
import { withRouter } from "react-router-dom";

import { addCommentRequest } from "../../action/recipeAction";

const toolbarStyleCommon = {
  backgroundRepeat: "no-repeat",
  backgroundSize: "21px",
  opacity: "0.4",
  backgroundPosition: "center"
};

const viewImageStyle = {
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  backgroundSize: "contain"
};

const cx = classNames.bind(styles);

const mapStateToProps = state => {
  return {
    recipe_info: state.recipeReducer.recipe_info,
    stuffs: state.recipeReducer.stuffs,
    photos: state.recipeReducer.photos,
    comment: state.recipeReducer.comment,
    scrap: state.userReducer.scrap
  };
};

const mapDispatchToProps = {
  recipeIDRequest,
  setScrapRequest,
  addCommentRequest
};

class ViewRecipe extends Component {
  state = {
    recipe_info: {
      cocktail: "",
      description: "",
      nick: "",
      like: 0,
      comment: 0,
      view: 0,
      tags: [],
      alcohol: 0,
      glass: 0
    },
    stuffs: [],
    photos: [],
    comment: [],
    main: <RecipeCup glass="0" />,
    side: <RecipeInfo alcohol="0" recipe="" descripe="" tags={[]} />,
    bShowDelete: false,
    userID: ""
  };

  componentDidMount() {
    document.getElementById("viewRecipe").parentElement.style.backgroundColor =
      "#0f1835";
    document.getElementById("viewRecipe").style.backgroundColor =
      "rgba(255, 255, 255, 0.4)";
    const { id } = this.props;
    this.props.recipeIDRequest(id);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.id !== this.props.id) {
      const { id } = this.props;
      this.props.recipeIDRequest(id);
      return;
    }
    if (
      prevProps.stuff === undefined &&
      prevProps.photos === undefined &&
      prevProps.comment === undefined &&
      prevProps.recipe_info === undefined
    ) {
      const auth = JSON.parse(localStorage.getItem("myData")); //localstorage에서 가져옴
      this.setState(
        {
          recipe_info: this.props.recipe_info,
          stuffs: this.props.stuffs,
          photos: this.props.photos,
          comment: this.props.comment,
          main: <RecipeCup glass={this.props.recipe_info.glass} />,
          side: (
            <RecipeInfo
              alcohol={this.state.recipe_info.alcohol}
              recipe={this.state.recipe_info.cocktail}
              descripe={this.state.recipe_info.description}
              tags={this.state.recipe_info.tags}
            />
          ),
          userID: auth ? auth.userid : ""
        },
        () => {
          document.getElementById(
            "cocktail"
          ).innerHTML = this.props.recipe_info.cocktail;
          document.getElementById(
            "description"
          ).innerHTML = this.props.recipe_info.description;
          document.getElementById(
            "tag"
          ).innerHTML = this.props.recipe_info.tags.join(" ");
        }
      );
    } else {
      //값이 있는 경우
      if (
        prevProps.id === this.props.id &&
        !this.state.stuffs.length &&
        !this.state.recipe_info.nick
      ) {
        const auth = JSON.parse(localStorage.getItem("myData")); //localstorage에서 가져옴
        this.setState(
          {
            recipe_info: this.props.recipe_info,
            stuffs: this.props.stuffs,
            photos: this.props.photos,
            comment: this.props.comment,
            main: <RecipeCup glass={this.props.recipe_info.glass} />,
            side: (
              <RecipeInfo
                alcohol={this.state.recipe_info.alcohol}
                recipe={this.state.recipe_info.cocktail}
                descripe={this.state.recipe_info.description}
                tags={this.state.recipe_info.tags}
              />
            ),
            userID: auth ? auth.userid : ""
          },
          () => {
            document.getElementById(
              "cocktail"
            ).innerHTML = this.props.recipe_info.cocktail;
            document.getElementById(
              "description"
            ).innerHTML = this.props.recipe_info.description;
            document.getElementById(
              "tag"
            ).innerHTML = this.props.recipe_info.tags.join(" ");
          }
        );
      } else {
        if (prevProps.recipe_info !== this.props.recipe_info) {
          const auth = JSON.parse(localStorage.getItem("myData")); //localstorage에서 가져옴
          this.setState(
            {
              recipe_info: this.props.recipe_info,
              stuffs: this.props.stuffs,
              photos: this.props.photos,
              comments: this.props.comments,
              main: <RecipeCup glass={this.props.recipe_info.glass} />,
              side: (
                <RecipeInfo
                  alcohol={this.state.recipe_info.alcohol}
                  recipe={this.state.recipe_info.cocktail}
                  descripe={this.state.recipe_info.description}
                  tags={this.state.recipe_info.tags}
                />
              ),
              userID: auth ? auth.userid : ""
            },
            () => {
              document.getElementById(
                "cocktail"
              ).innerHTML = this.props.recipe_info.cocktail;
              document.getElementById(
                "description"
              ).innerHTML = this.props.recipe_info.description;
              document.getElementById(
                "tag"
              ).innerHTML = this.props.recipe_info.tags.join(" ");
            }
          );
          return;
        }
        const nowScrap = this.props.scrap;
        if (nowScrap.result && prevProps.scrap.status !== nowScrap.status) {
          let num = 1;
          if (nowScrap.status === "delete") {
            num = -1;
          }
          this.setState({
            recipe_info: {
              ...this.state.recipe_info,
              like: this.state.recipe_info.like + num
            }
          });
        }
      }
    }
  }

  onChangeFocusing = event => {
    let info = document.querySelector("#info");
    let stuff = document.querySelector("#stuff");
    let photo = document.querySelector("#photo");
    let comment = document.querySelector("#comment");

    info.style.backgroundImage = `url(${infoImage})`;
    info.style.opacity = 0.4;

    stuff.style.backgroundImage = `url(${stuffImage})`;
    stuff.style.opacity = 0.4;

    photo.style.backgroundImage = `url(${photoImage})`;
    photo.style.opacity = 0.4;

    comment.style.backgroundImage = `url(${commentImage})`;
    comment.style.opacity = 0.4;

    if (info === event.target || info === event.target.parentNode) {
      this.setState({
        main: <RecipeCup glass={this.state.recipe_info.glass} />,
        side: (
          <RecipeInfo
            alcohol={this.state.recipe_info.alcohol}
            recipe={this.state.recipe_info.cocktail}
            descripe={this.state.recipe_info.description}
            tags={this.state.recipe_info.tags}
          />
        )
      });

      info.style.backgroundImage = `url(${infoImageP})`;
      info.style.opacity = 1;
    } else if (stuff === event.target || stuff === event.target.parentNode) {
      this.setState({
        main: <RecipeCup glass={this.state.recipe_info.glass} />,
        side: <RecipeStuff stuffs={this.state.stuffs} />
      });

      stuff.style.backgroundImage = `url(${stuffImageP})`;
      stuff.style.opacity = 1;
    } else if (photo === event.target || photo === event.target.parentNode) {
      this.setState({
        main: <RecipeImage image={this.state.photos[0]} />,
        side: (
          <RecipePhoto
            photos={this.state.photos}
            changePhoto={this.onChangePhoto}
          />
        )
      });

      photo.style.backgroundImage = `url(${photoImageP})`;
      photo.style.opacity = 1;
    } else if (
      comment === event.target ||
      comment === event.target.parentNode
    ) {
      this.setState({
        main: <RecipeCup glass={this.state.recipe_info.glass} />,
        side: (
          <RecipeComment
            comment={this.state.comment}
            onAddComment={this.onAddComment}
          />
        )
      });

      comment.style.backgroundImage = `url(${commentImageP})`;
      comment.style.opacity = 1;
    }
  };

  onAddComment = () => {
    let commentText = document.querySelector("#commentText").value;
    if (
      commentText !== "" &&
      commentText !== undefined &&
      commentText !== null
    ) {
      let now = new Date();
      let time =
        now.getHours() > 9
          ? `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`
          : `0${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
      let thisComment = {
        nick: this.state.userID,
        comment: commentText,
        time: time
      };
      let comment = this.state.comment;
      comment.push(thisComment);

      this.setState({ comment: comment });
      this.setState({
        side: (
          <RecipeComment comment={comment} onAddComment={this.onAddComment} />
        )
      });
      this.props.addCommentRequest({ id: this.props.id, comment: thisComment });
      // 여기 이 api 호출하고 성공할 시 그때 ui 에 추가해주는건 그때 해줘야함
      // 즉, update 그 function 에서 해야함
      document.querySelector("#commentText").value = "";
    }
  };

  onChangePhoto = event => {
    this.setState({
      main: (
        <RecipeImage
          image={this.state.photos[event.target.getAttribute("idx")]}
        />
      )
    });
  };

  onDeleteCocktailClick = event => {
    this.setState({ bShowDelete: true });
  };

  onNotifyPopupCancelClick = event => {
    this.setState({ bShowDelete: false });
  };

  cocktailDeleteAPI = event => {
    //칵테일 삭제 API 호출
    const type = 2;
    this.props.dataRequest(type, this.props.id);
    this.setState({ bShowDelete: false });
    this.props.closeClick();
  };

  onLikeClick = event => {
    const type = 3;
    this.props.setScrapRequest({
      type,
      data: { cocktailID: this.props.id, userID: this.state.userID }
    });
  };

  showNotifyPopup = () => {
    return (
      <div className={cx("showNotifyPopup")}>
        <div className={cx("text")}>정말로 삭제 하겠습니까?</div>
        <div className={cx("container")}>
          <Button
            className={cx("ok")}
            value="확인"
            onClick={this.cocktailDeleteAPI}
          />
          <Button
            className={cx("cancel")}
            value="취소"
            onClick={this.onNotifyPopupCancelClick}
          />
        </div>
      </div>
    );
  };

  onDetailViewEdit = () => {
    this.props.history.push(`/enrolment/${this.props.id}`);
  };

  viewRecipe_form = () => {
    return [
      <div key="viewRecipe" className={cx("detail-container")}>
        {this.state.bShowDelete && (
          <div className={cx("notifypopup_rect")}>{this.showNotifyPopup()}</div>
        )}
        <div className={cx("detail-content")}>
          {this.props.isPrev && (
            <span
              style={Object.assign({}, toolbarStyleCommon, {
                backgroundImage: `url(${arrowLeft})`,
                backgroundSize: "contain",
                opacity: 1
              })}
              className={cx("detail-content-arrow", "left")}
              onClick={event => {
                return this.props.onMove(event, false);
              }}
            />
          )}
          {this.props.isNext && (
            <span
              style={Object.assign({}, toolbarStyleCommon, {
                backgroundImage: `url(${arrowRight})`,
                backgroundSize: "contain",
                opacity: 1
              })}
              className={cx("detail-content-arrow", "right")}
              onClick={event => {
                return this.props.onMove(event, true);
              }}
            />
          )}

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
                <span
                  style={Object.assign({}, toolbarStyleCommon, {
                    backgroundImage: `url(${infoImageP})`,
                    opacity: 1
                  })}
                  id="info"
                  onClick={this.onChangeFocusing}
                />
                <span
                  style={Object.assign({}, toolbarStyleCommon, {
                    backgroundImage: `url(${stuffImage})`
                  })}
                  id="stuff"
                  onClick={this.onChangeFocusing}
                />
                <span
                  style={Object.assign({}, toolbarStyleCommon, {
                    backgroundImage: `url(${photoImage})`
                  })}
                  id="photo"
                  onClick={this.onChangeFocusing}
                />
                <span
                  style={Object.assign({}, toolbarStyleCommon, {
                    backgroundImage: `url(${commentImage})`
                  })}
                  id="comment"
                  onClick={this.onChangeFocusing}
                />
              </div>

              {this.state.side}
            </div>
          </div>
        </div>

        <div className={cx("side-button-container")}>
          <div className={cx("side-button-area")}>
            <span
              style={Object.assign({}, toolbarStyleCommon, {
                backgroundImage: `url(${closeIcon})`,
                backgroundSize: "cover",
                opacity: 1
              })}
              id="close-botton"
              onClick={this.props.closeClick}
            />
            {this.state.userID === this.state.recipe_info.nick &&
              ((
                <span
                  style={Object.assign({}, toolbarStyleCommon, {
                    backgroundImage: `url(${modifyIcon})`,
                    backgroundSize: "cover",
                    opacity: 1
                  })}
                  id="edit-botton"
                  onClick={this.onDetailViewEdit}
                />
              ),
              (
                <span
                  style={Object.assign({}, toolbarStyleCommon, {
                    backgroundImage: `url(${deleteIcon})`,
                    backgroundSize: "cover",
                    opacity: 1
                  })}
                  id="delete-botton"
                  onClick={this.onDeleteCocktailClick}
                />
              ))}
            <span
              style={Object.assign({}, toolbarStyleCommon, {
                backgroundImage: `url(${heartIcon})`,
                backgroundSize: "cover",
                opacity: 1
              })}
              id="like-botton"
              onClick={this.onLikeClick}
            />
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

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ViewRecipe)
);
