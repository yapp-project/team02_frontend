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

const cx = classNames.bind(styles);

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = {};

class ViewRecipe extends Component {
  recipe_info = {name: "레시피 이름", descripe: "이 레시피에 대한 설명", tags: "#태그 #태그 #태그"}

  stuffs=[
    {name:"재료 이름1", volume: "용량ml", ratio: "30%"},
    {name:"재료 이름2", volume: "용량ml", ratio: "30%"},
    {name:"재료 이름3", volume: "용량ml", ratio: "30%"}
  ]

  photos=[
    "사진 1", "사진 2", "사진 3", "사진 4", "사진 5", "사진 6"
  ]

  comments=[
    {nick: "닉네임 A", comments: "댓글내용 1", time: "00:00"},
    {nick: "닉네임 B", comments: "댓글내용 2", time: "11:11"},
    {nick: "닉네임 C", comments: "댓글내용 3", time: "22:22"}
  ]

  cocktail_info=[
    {cocktail: "칵테일 이름", nick: "등록한 사람 닉네임", like :"85", comment :"35"}
  ]
  
  state = {
    main: <RecipeCup/>,
    side: 
    <RecipeInfo
      recipe={this.recipe_info.name}
      descripe={this.recipe_info.descripe}
      tags={this.recipe_info.tags}
    />
  };

  onChangeFocusing = event => {
    let info = document.querySelector("#info");
    let stuff = document.querySelector("#stuff");
    let photo = document.querySelector("#photo");
    let comment = document.querySelector("#comment");

    if (info === event.target || info === event.target.parentNode) {
      this.setState( { 
        main: <RecipeCup/>, 
        side: 
        <RecipeInfo
          recipe={this.recipe_info.name}
          descripe={this.recipe_info.descripe}
          tags={this.recipe_info.tags}
        />
      } );

    } else if (stuff === event.target || stuff === event.target.parentNode) {
      this.setState( { 
        main: <RecipeCup/>, 
        side: 
        <RecipeStuff
          stuffs={this.stuffs}
        />
      } );

    } else if (photo === event.target || photo === event.target.parentNode) {
      this.setState( { 
        main: <RecipeImage/>, 
        side: 
        <RecipePhoto
          photos={this.photos}
        />
      } );

    } else if (comment === event.target || comment === event.target.parentNode) {
      this.setState( { 
        main: <RecipeCup/>, 
        side: 
        <RecipeComment
          comments={this.comments}
        />
      } );

    }
  }

  viewRecipe_form = () => {
    return [
      <div className={cx("detail-container")}>
        <div className={cx("detail-content")}>
          <RecipeHeader
            cocktail="칵테일 이름"
            nick="등록한 사람 닉네임"
            like="85"
            comment="35"
          />

          <div className={cx("detail-content-main")}>
            <div className={cx("detail-content-main-view")}>

            {this.state.main}
              
            </div>

            <div className={cx("detail-content-main-side")}>
              <div className={cx("detail-content-main-side-toolbar")}>
                <span id="info" onClick={this.onChangeFocusing}>정보</span>
                <span id="stuff" onClick={this.onChangeFocusing}>재료</span>
                <span id="photo" onClick={this.onChangeFocusing}>사진</span>
                <span id="comment" onClick={this.onChangeFocusing}>댓글</span>
              </div>

              {this.state.side}

            </div>
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
