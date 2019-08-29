import React, { Component } from "react";
import classNames from "classnames/bind";
import styles from "./MainView.scss";
//컴포넌트
import { connect } from "react-redux";
import { Button } from "../../components";
import { SearchResultItem } from "../../components";
import { recommendRequest, searchRequest } from "../../action/searchAction";

import ViewRecipe from "../ViewRecipe/ViewRecipe";

import { CircleSpinner } from "react-spinners-kit";

import { setScrapRequest } from "../../action/userAction.js";
import { debounce } from "lodash";

const cx = classNames.bind(styles);

const mapStateToProps = state => {
  return {
    recommend: state.searchReducer.recommend,
    scrap: state.userReducer.scrap,
    networkStatus: state.searchReducer.networkStatus
  };
};

const mapDispatchToProps = { recommendRequest, searchRequest, setScrapRequest };

class MainView extends Component {
  state = {
    showPopup: false,
    showSearch: false,
    selectTag: "", //현재 사용자가 선택한 추천 태그
    loading: true,
    scroll: {
      start: true,
      end: true
    },
    viewRecipeInfo: {
      bShow: false,
      ID: "",
      index: 0, //현재 ID가 List에 위치한 index
      prev: false,
      next: false
    },
    bScrapAction: false,
    isMobile: false
  };

  /**
   * 최초 로딩 시 서버 통신
   * @description 1. 추천 해쉬태그 받아 오기
   * 2. 해쉬태그 가장 첫 번째 검색 결과 가져오기
   **/
  componentDidMount() {
    //1. 추천 해쉬태그 서버 통신
    const _recommend = this.props.recommend;
    if (
      navigator.userAgent.toLowerCase().indexOf("iphone") > 0 ||
      navigator.userAgent.toLowerCase().indexOf("android") > 0
    ) {
      this.setState({ isMobile: true });
    }
    if (!_recommend.tags.length) {
      this.props.recommendRequest();
    } else {
      //뒤로가기 해서 들어온 경우 로딩을 끈다.
      if (_recommend.result.length) {
        this.setState({ loading: false, selectTag: _recommend.tags[0].tag });
      }
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.networkStatus.status === 0 && this.state.loading) {
      this.setState({ loading: false });
      return;
    }
    //최초 통신한 경우 첫번째 태그에 대한 검색 결과 가져와야 함
    if (
      !prevProps.recommend.tags.length &&
      this.props.recommend.tags.length > 0
    ) {
      const word = this.props.recommend.tags[0].tag;
      this.setState({ selectTag: word });
      this.props.searchRequest({ word, type: 0, recommend: true });
    }

    if (prevProps.recommend.result !== this.props.recommend.result) {
      const _width = document
        .getElementById("imageContainer")
        .getBoundingClientRect().width;
      const _scrollWidth = this.props.recommend.result.length * 386;

      if (this.state.loading) {
        this.setState({ loading: false });
      }
      if (_scrollWidth >= _width) {
        if (this.state.scroll.end) {
          this.setState({ scroll: { start: true, end: false } });
        }
      } else {
        if (!this.state.scroll.start || !this.state.scroll.end)
          this.setState({ scroll: { start: true, end: true } });
      }
    }

    //Random Tag.length = 0, result = []인 경우 예외처리
    if (
      this.state.loading &&
      !this.props.recommend.tags.length &&
      !this.props.recommend.result.length
    ) {
      this.setState({ loading: false });
    }

    //스크랩 한 경우
    if (this.props.scrap.result) {
      if (
        prevProps.scrap.status !== this.props.scrap.status ||
        prevState.viewRecipeInfo.ID !== this.state.viewRecipeInfo.ID
      ) {
        let num = 0; //0-save 1-delete
        if (this.props.scrap.status === "delete") {
          num = -1;
        } else {
          num = 1;
        }
        const index = this.state.viewRecipeInfo.index;
        this.props.recommend.result[index].scrap += num;
        this.setState({ bScrapAction: false });
        return;
      }
    }
  }

  /**
   * hashTag onClick Event Handler
   * @description 해쉬태그를 누를 때 마다 서버 통신해서 결과를 가져온다.
   */
  onButtonClick = event => {
    const comp = event.target;
    const word = comp.id;
    //style 변경을 위한 state change
    this.setState({ selectTag: word, loading: true });
    //server 통신
    this.props.searchRequest({ word, type: 0, recommend: true });
  };

  onCocktailClick = event => {
    event.preventDefault();
    event.stopPropagation();

    const cocktailID = event.target.id;

    //click한 칵테일의 위치를 List에서 찾는 Logic
    const index = this.findCocktailIndex(cocktailID);

    const next = index !== this.props.recommend.result.length - 1;
    const prev = index !== 0;
    this.setState({
      viewRecipeInfo: {
        bShow: true,
        ID: event.target.id,
        index,
        next,
        prev
      }
    });
    return false;
  };

  findCocktailIndex = cocktailID => {
    const List = this.props.recommend.result;

    return parseInt(
      List.findIndex(item => {
        return item._id === cocktailID;
      }).toString()
    );
  };

  onDetailViewClose = () => {
    this.setState({
      viewRecipeInfo: { ...this.state.viewRecipeInfo, bShow: false }
    });
  };

  onLikeClick = event => {
    event.preventDefault();
    event.stopPropagation();
    //서버 통신
    const type = 3;
    const cocktailID = event.target.id;
    const auth = JSON.parse(localStorage.getItem("myData")); //localstorage에서 가져옴
    const userID = auth.userid;

    const index = this.findCocktailIndex(cocktailID);

    this.debounceRequestScrap({ index, cocktailID, type, userID });
  };

  debounceRequestScrap = debounce(({ index, cocktailID, type, userID }) => {
    this.setState({
      viewRecipeInfo: {
        ...this.state.viewRecipeInfo,
        index: index,
        ID: cocktailID
      }
    });
    this.props.setScrapRequest({ type, data: { cocktailID, userID } });
  }, 300);

  recommend_cocktail = ({ data }) => {
    return data.map(item => {
      return (
        <SearchResultItem
          className={cx("cocktail")}
          key={item._id}
          props={item}
          informationClick={this.onCocktailClick}
          likeClick={this.onLikeClick}
        />
      );
    });
  };

  onNextScrollClick = event => {
    const target = document.getElementById("cocktailcontainer");
    const _scrollLeft = target.scrollLeft;

    if (_scrollLeft === 0) {
      target.scrollTo(_scrollLeft + 360, 0);
    } else {
      target.scrollTo(_scrollLeft + 386, 0);
    }
  };

  onPrevScrollClick = event => {
    const target = document.getElementById("cocktailcontainer");
    const _scrollLeft = target.scrollLeft;

    target.scrollTo(_scrollLeft - 386, 0);
  };

  onCreateRecipesClick = event => {
    const { history } = this.props;
    history.push("/enrolment");
  };

  onScroll = event => {
    const target = event.target;
    const _maxScrollWidth = target.scrollWidth - target.clientWidth;
    if (target.scrollLeft === 0) {
      this.setState({ scroll: { start: true, end: false } });
    } else if (target.scrollLeft === _maxScrollWidth) {
      this.setState({ scroll: { start: false, end: true } });
    } else {
      const { scroll } = this.state;
      if (scroll.start || scroll.end) {
        this.setState({ scroll: { start: false, end: false } });
      }
    }
  };

  onMoveClick = (event, bNext) => {
    event.preventDefault();
    event.stopPropagation();
    const { index } = this.state.viewRecipeInfo;
    const list = this.props.recommend.result;

    if (bNext) {
      //다음
      if (index === list.length - 2) {
        this.setState({
          viewRecipeInfo: {
            ...this.state.viewRecipeInfo,
            ID: list[index + 1]._id,
            index: index + 1,
            next: false,
            prev: true
          }
        });
      } else {
        this.setState({
          viewRecipeInfo: {
            ...this.state.viewRecipeInfo,
            ID: list[index + 1]._id,
            index: index + 1,
            prev: true
          }
        });
      }
    } else {
      //이전
      if (index === 1) {
        this.setState({
          viewRecipeInfo: {
            ...this.state.viewRecipeInfo,
            ID: list[index - 1]._id,
            index: index - 1,
            prev: false,
            next: true
          }
        });
      } else {
        this.setState({
          viewRecipeInfo: {
            ...this.state.viewRecipeInfo,
            ID: list[index - 1]._id,
            index: index - 1,
            next: true
          }
        });
      }
    }
    return false;
  };

  /**
   * @author AnGwangHo
   * @description 랜덤 태그 반환
   * @param tags 랜덤으로 추천된 Tag[a,b,c...]
   */
  showRecommendTags = ({ tags }) => {
    return tags.map(tag => {
      return (
        <Button
          id={tag.tag}
          key={tag._id}
          value={"#" + tag.tag}
          className={cx("hashtag", {
            selected: tag.tag === this.state.selectTag
          })}
          onClick={this.onButtonClick}
        />
      );
    });
  };

  render() {
    const { tags } = this.props.recommend;
    return (
      <div className={cx("mainview")}>
        {this.state.viewRecipeInfo.bShow && (
          <div className={cx("viewreipe_rect")}>
            <ViewRecipe
              id={this.state.viewRecipeInfo.ID}
              closeClick={this.onDetailViewClose}
              onMove={this.onMoveClick}
              isPrev={this.state.viewRecipeInfo.prev}
              isNext={this.state.viewRecipeInfo.next}
            />
          </div>
        )}
        <div className={cx("explanation_rect")}>
          <div className={cx("left")}>
            <div className={cx("logo")} />
          </div>
          <div className={cx("title")}>Drink Me!</div>
          <div className={cx("contents")}>
            <div className={cx("text")}>
              세상의 다양한 칵테일 레시피를 공유하다.
            </div>
          </div>
          {!this.state.isMobile && (
            <div className={cx("register_rect")}>
              <div
                className={cx("button")}
                onClick={this.onCreateRecipesClick}
              />
              <div
                className={cx("button_text")}
                onClick={this.onCreateRecipesClick}
              >
                레시피 등록하기
              </div>
            </div>
          )}
        </div>
        <div className={cx("hashtag_rect")}>
          <div className={cx("hashtag_container")}>
            <div className={cx("hastag_inner")}>
              {this.showRecommendTags({ tags })}
            </div>
          </div>
        </div>
        <div className={cx("image_rect")}>
          <div id="imageContainer" className={cx("innercontainer")}>
            <div className={cx("loading_rect", !this.state.loading && "_hide")}>
              <CircleSpinner
                size={100}
                color="white"
                loading={this.state.loading}
              />
            </div>
            {!this.state.loading &&
              !this.props.recommend.tags.length &&
              !this.props.recommend.result.length && (
                <div className={cx("nodata_rect")}>
                  <div className={cx("nodata_image")} />
                  <div className={cx("nodata_text")}>
                    {this.props.networkStatus.status === 0
                      ? "서버 연결에 실패하였습니다"
                      : "현재 등록된 레시피가 없습니다."}
                  </div>
                </div>
              )}
            <span
              className={cx("prevbspan", this.state.scroll.start && "_hide")}
              onClick={this.onPrevScrollClick}
            />
            <span
              className={cx("nextspan", this.state.scroll.end && "_hide")}
              onClick={this.onNextScrollClick}
            />
            <div
              id="cocktailcontainer"
              className={cx("cocktailcontainer")}
              onScroll={this.onScroll}
            >
              {this.recommend_cocktail({ data: this.props.recommend.result })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainView);
