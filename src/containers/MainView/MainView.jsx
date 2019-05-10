import React, { Component } from "react";
import classNames from "classnames/bind";
import styles from "./MainView.scss";
//컴포넌트
import { connect } from "react-redux";
import { Button } from "../../components";
import { SearchResultItem } from "../../components";
import { recommendRequest, searchRequest } from "../../action/searchAction";

import Header from "../Header/Header";

import { CircleSpinner } from "react-spinners-kit";

const cx = classNames.bind(styles);

const mapStateToProps = state => {
  return { recommend: state.searchReducer.recommend };
};

const mapDispatchToProps = { recommendRequest, searchRequest };

class MainView extends Component {
  state = {
    showPopup: false,
    showSearch: false,
    selectTag: "", //현재 사용자가 선택한 추천 태그
    loading: true
  };

  /**
   * 최초 로딩 시 서버 통신
   * @description 1. 추천 해쉬태그 받아 오기
   * 2. 해쉬태그 가장 첫 번째 검색 결과 가져오기
   */
  componentDidMount() {
    //1. 추천 해쉬태그 서버 통신
    const _recommend = this.props.recommend;
    if (!_recommend.tags.length) {
      this.props.recommendRequest();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    //최초 통신한 경우 첫번째 태그에 대한 검색 결과 가져와야 함
    if (
      !prevProps.recommend.tags.length &&
      this.props.recommend.tags.length > 0
    ) {
      const word = this.props.recommend.tags[0].tag;
      this.setState({ selectTag: word });
      this.props.searchRequest({ word, type: 0, recommend: true });
    }

    if (this.props.recommend.result.length && prevState.loading) {
      this.setState({ loading: false });
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

  onCloseLogin = () => {
    this.setState({ showPopup: false });
  };

  recommend_cocktail = ({ data }) => {
    return data.map(item => {
      return (
        <SearchResultItem
          className={cx("cocktail")}
          key={item._id}
          props={item}
        />
      );
    });
  };

  onNextScrollClick = event => {
    const target = document.getElementById("images");
    const _scrollLeft = target.scrollLeft;
    target.scrollTo(_scrollLeft + 360, 0);
  };

  onPrevScrollClick = event => {
    const target = document.getElementById("images");
    const _scrollLeft = target.scrollLeft;
    target.scrollTo(_scrollLeft - 360, 0);
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
        <div className={cx("header")}>
          <Header />
        </div>
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
          <div className={cx("register_rect")}>
            <div className={cx("button")} />
            <div className={cx("button_text")}>레시피 등록하기</div>
          </div>
        </div>
        <div className={cx("hashtag_rect")}>
          <div className={cx("hashtag_container")}>
            <div className={cx("hastag_inner")}>
              {this.showRecommendTags({ tags })}
            </div>
          </div>
        </div>
        <div className={cx("images")}>
          <div className={cx("innercontainer")}>
            <div className={cx("loading_rect", !this.state.loading && "_hide")}>
              <CircleSpinner
                size={300}
                color="white"
                loading={this.state.loading}
              />
            </div>
            <span
              className={cx("prevbspan")}
              onClick={this.onPrevScrollClick}
            />
            <span className={cx("nextspan")} onClick={this.onNextScrollClick} />
            <div id="images" className={cx("cocktailcontainer")}>
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
