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

const toolbarStyleCommon = {
  backgroundRepeat: 'no-repeat',
  backgroundSize: '21px',
  opacity: '0.4',
  backgroundPosition: 'center'
}

const viewImageStyle = {
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  backgroundSize: 'contain'
}

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
      tags: [],
      alcohol: 0,
      glass: 0
    },
    stuffs: [],
    photos: [],
    comments: [],
    main: 
      <RecipeCup
        glass="0"
      />,
    side: 
      <RecipeInfo
        alcohol="0"
        recipe=""
        descripe=""
        tags={[]}
      />
  };

  componentDidMount() {
    document.getElementById('viewRecipe').parentElement.style.backgroundColor = "#0f1835";
    document.getElementById('viewRecipe').style.backgroundColor = "rgba(255, 255, 255, 0.4)";
    
    this.props.recipeIDRequest("5cdd7b4e11fcfd662cdd0888");
  }

  componentDidUpdate(prevProps, prevState) {    
    if (prevProps.stuff === undefined && prevProps.photos === undefined && prevProps.comments === undefined && prevProps.recipe_info === undefined) {
      this.setState({
        recipe_info: this.props.recipe_info,
        stuffs: this.props.stuffs,
        photos: this.props.photos,
        comments: this.props.comments,
        main: 
        <RecipeCup
          glass={this.props.recipe_info.glass}
        />,
        side: 
        <RecipeInfo
          alcohol={this.state.recipe_info.alcohol}
          recipe={this.state.recipe_info.cocktail}
          descripe={this.state.recipe_info.description}
          tags={this.state.recipe_info.tags}
        />
      }, () => {
        document.getElementById('cocktail').innerHTML = this.props.recipe_info.cocktail;
        document.getElementById('description').innerHTML = this.props.recipe_info.description;
        document.getElementById('tag').innerHTML = this.props.recipe_info.tags.join(' ');
      });
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
      this.setState( { 
        main: 
        <RecipeCup
          glass={this.state.recipe_info.glass}
        />, 
        side: 
        <RecipeInfo
          alcohol={this.state.recipe_info.alcohol}
          recipe={this.state.recipe_info.cocktail}
          descripe={this.state.recipe_info.description}
          tags={this.state.recipe_info.tags}
        />
      } );

      info.style.backgroundImage = `url(${infoImageP})`;
      info.style.opacity = 1;

    } else if (stuff === event.target || stuff === event.target.parentNode) {
      this.setState( { 
        main: 
        <RecipeCup
          glass={this.state.recipe_info.glass}
        />,  
        side: 
        <RecipeStuff
          stuffs={this.state.stuffs}
        />
      } );

      stuff.style.backgroundImage = `url(${stuffImageP})`;
      stuff.style.opacity = 1;

    } else if (photo === event.target || photo === event.target.parentNode) {
      this.setState( { 
        main: <RecipeImage
          image={this.state.photos[0]}
        />, 
        side: 
        <RecipePhoto
          photos={this.state.photos}
          changePhoto={this.onChangePhoto}
        />
      } );

      photo.style.backgroundImage = `url(${photoImageP})`;
      photo.style.opacity = 1;

    } else if (comment === event.target || comment === event.target.parentNode) {
      this.setState( { 
        main: 
        <RecipeCup
          glass={this.state.recipe_info.glass}
        />, 
        side: 
        <RecipeComment
          comments={this.state.comments}
          onAddComment={this.onAddComment}
        />
      } );

      comment.style.backgroundImage = `url(${commentImageP})`;
      comment.style.opacity = 1;

    }
  };

  onAddComment = () => {
    let comment = document.querySelector("#commentText").value;
    if (comment !== "" && comment !== undefined && comment !== null) {
      let now = new Date();
      let time = now.getHours > 9 ? `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}` : `0${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
      let comments = this.state.comments;
      comments.push({nick: "사용자", comments: comment, time: time});

      this.setState({comments: comments});
      this.setState( {
        side: 
        <RecipeComment
          comments={comments}
          onAddComment={this.onAddComment}
        />
      } );

      document.querySelector("#commentText").value = "";
    }
  };

  onChangePhoto = event => {
    this.setState( { 
      main: <RecipeImage
        image={this.state.photos[event.target.getAttribute('idx')]}
      />
    } );
  }

  viewRecipe_form = () => {
    return [
      <div key="viewRecipe" className={cx("detail-container")}>
        <div className={cx("detail-content")}>
          <span style={Object.assign({},
            toolbarStyleCommon,
            {backgroundImage: `url(${arrowLeft})`, backgroundSize: 'contain', opacity: 1})} className={cx("detail-content-arrow", "left")}></span>
          <span style={Object.assign({},
            toolbarStyleCommon,
            {backgroundImage: `url(${arrowRight})`, backgroundSize: 'contain', opacity: 1})} className={cx("detail-content-arrow", "right")}></span>

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
                <span style={Object.assign({},
                  toolbarStyleCommon,
                  {backgroundImage: `url(${infoImageP})`, opacity: 1})} id="info" onClick={this.onChangeFocusing}></span>
                <span style={Object.assign({},
                  toolbarStyleCommon,
                  {backgroundImage: `url(${stuffImage})`})} id="stuff" onClick={this.onChangeFocusing}></span>
                <span style={Object.assign({},
                  toolbarStyleCommon,
                  {backgroundImage: `url(${photoImage})`})} id="photo" onClick={this.onChangeFocusing}></span>
                <span style={Object.assign({},
                  toolbarStyleCommon,
                  {backgroundImage: `url(${commentImage})`})} id="comment" onClick={this.onChangeFocusing}></span>
              </div>

              {this.state.side}
            </div>
          </div>
        </div>

        <div className={cx("side-button-container")}>
          <div className={cx("side-button-area")}>
            <span style={Object.assign({},
              toolbarStyleCommon,
              {backgroundImage: `url(${closeIcon})`, backgroundSize: 'cover', opacity: 1})} id="close-botton"></span>
            <span style={Object.assign({},
              toolbarStyleCommon,
              {backgroundImage: `url(${modifyIcon})`, backgroundSize: 'cover', opacity: 1})} id="edit-botton"></span>
            <span style={Object.assign({},
              toolbarStyleCommon,
              {backgroundImage: `url(${deleteIcon})`, backgroundSize: 'cover', opacity: 1})} id="delete-botton"></span>
            <span style={Object.assign({},
              toolbarStyleCommon,
              {backgroundImage: `url(${heartIcon})`, backgroundSize: 'cover', opacity: 1})} id="like-botton"></span>
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
