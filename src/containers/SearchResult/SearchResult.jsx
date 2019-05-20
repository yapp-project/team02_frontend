import React, { Component } from "react";
import classNames from "classnames/bind";
import styles from "./SearchResult.scss";
import { connect } from "react-redux";
import { SearchResultItem, Button } from "../../components";

import { GridLayout } from "@egjs/react-infinitegrid";
import { withRouter } from "react-router-dom";

import { dataRequest } from "../../action/userAction.js";

const cx = classNames.bind(styles);

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = { dataRequest };

/**
 * @author AnGwangHo
 * @description 검색 결과를 표현하는 컨테이너
 */
class SearchResult extends Component {
  state = {
    showModify: false,
    modifyXY: { x: 0, y: 0 },
    index: "",
    page: 0,
    pages: 0,
    searchList: [], //[{page:number,list:[]}, ...]
    bShowDelete: false
  };

  componentDidMount() {
    this.setState({
      page: this.props.page,
      pages: this.props.pages,
      showModify: this.props.modify
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const nowProps = this.props;
    if (
      prevProps.modify !== this.props.modify &&
      prevProps.searchList !== nowProps.searchList
    ) {
      if (this.state.searchList.length) {
        this.setState({ searchList: [] });
      }
    }

    if (!this.props.modify && this.state.showModify) {
      // 수정/삭제 팝업 떠있는 경우 Tab 변경 시 닫도록 state변경
      this.setState({ showModify: false });
    }

    // 마이메뉴에서 사용
    // 칵테일 수정/삭제 팝업 띄우기 위해 사용 callback미사용 시 원하는 위치에 못띄움(pure 동작 우선 됨)
    if (this.props.modify && this.state.showModify) {
      const x = this.state.modifyXY.x;
      const y = this.state.modifyXY.y;
      setTimeout(function() {
        document.getElementById("modifyPopup").style["left"] = x + "px";
        document.getElementById("modifyPopup").style["top"] = y + "px";
      });
    }

    //filter, word, type변경에 의한 list 초기화
    if (
      prevProps.filter !== nowProps.filter ||
      prevProps.word !== nowProps.word ||
      prevProps.type !== nowProps.type
    ) {
      this.setState({ searchList: [], page: 0, pages: 0 });
      return;
    }

    //scroll 시 page 갱신 및 list update
    if (prevProps.page !== this.props.page) {
      const list = this.props.searchList;
      const items = this.loadItems(parseFloat(this.groupKey) + 1, list);

      this.setState({
        page: this.props.page,
        searchList: this.state.searchList.concat({
          page: this.props.page,
          list: items
        })
      });
      return;
    }

    if (nowProps.userReducer) {
      if (
        prevState.bShowDelete &&
        !this.state.bShowDelete &&
        !this.state.showModify
      ) {
        if (nowProps.userReducer.mymenu.bRecipeDelete) {
          console.log("삭제 성공");
        } else {
          console.log("삭제 실패");
        }
      }
    }
  }

  onPopupModifyClick = event => {
    this.props.history.push(`/enrolment/${this.state.index}`);
  };

  onCocktailClick = event => {
    this.props.history.push(`/viewRecipe`);
  };

  onDeleteCocktailClick = event => {
    this.setState({ bShowDelete: true });
  };

  onNotifyPopupCancelClick = event => {
    this.setState({ bShowDelete: false });
  };

  cocktailDeleteAPI = event => {
    //칵테일 삭제 API 호출
    this.props.dataRequest(2, this.state.index);
    this.setState({ showModify: false, bShowDelete: false });
  };

  showModifyPopup = () => {
    return (
      <div id="modifyPopup" className={cx("modify_popup")}>
        <div className={cx("container")}>
          <div className={cx("text")} onClick={this.onPopupModifyClick}>
            수정하기
          </div>
        </div>
        <div className={cx("container")}>
          <div className={cx("text")} onClick={this.onDeleteCocktailClick}>
            삭제하기
          </div>
        </div>
      </div>
    );
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

  onModifyClick = event => {
    const comp = document.getElementById(event.target.id);
    this.setState({
      showModify: !this.state.showModify,
      modifyXY: {
        x: parseInt(comp.style.left.split("px"), 10) + 205,
        y: parseInt(comp.style.top.split("px"), 10) + 60
      },
      index: event.target.id
    });
  };

  onLikeClick = event => {
    event.preventDefault();
    event.stopPropagation();
    const id = event.target.id;
    const { searchList, page } = this.state;

    //서버 통신

    //state.list에 반영
    this.setState({
      searchList: searchList.map(item =>
        item.page === page
          ? {
              ...item,
              list: item.list.map(cocktail =>
                cocktail.props.props._id === id
                  ? {
                      ...cocktail,
                      props: {
                        ...cocktail.props,
                        props: {
                          ...cocktail.props.props,
                          scrap: cocktail.props.props.scrap + 1
                        }
                      }
                    }
                  : cocktail
              )
            }
          : item
      )
    });
  };

  loadItems(groupKey, list) {
    const items = [];
    const start = this.start || 0;
    const cocktailArray = list;
    const len = list.length;
    const modify = this.props.modify;
    let size = "";
    for (let i = 0; i < len; ++i) {
      if (cocktailArray[i].scrap > 50) {
        size = "big";
      } else if (cocktailArray[i].scrap > 20) {
        size = "middle";
      } else {
        size = "";
      }
      items.push(
        <SearchResultItem
          groupKey={groupKey}
          className={cx("item", size)}
          key={1 + start + i}
          props={cocktailArray[i]}
          modify={modify}
          modifyClick={this.onModifyClick}
          informationClick={this.onCocktailClick}
          likeClick={this.onLikeClick}
        />
      );
    }
    this.start = start + len;
    return items;
  }

  /**
   * GridLayout Append Event
   * @description GridLayout에 우측or아래로 스크롤 시 & Item이 부족한 경우 호출 됨
   */
  onAppend = ({ groupKey, startLoading, endLoading }) => {
    const { page, pages, searchList } = this.props;
    const _searchList = this.state.searchList;

    if (pages === 1) {
      if (searchList.length && !_searchList.length) {
        startLoading();
        const items = this.loadItems(parseFloat(groupKey) + 1, searchList);
        this.setState({
          page,
          searchList: _searchList.concat({ page, list: items }),
          list: _searchList.concat(items)
        });
        endLoading();
      }
    } else {
      //전체 페이지 보다 작은 경우 실행
      if (pages >= page) {
        if (searchList.length) {
          //최초 실행
          if (page === 1) {
            if (!_searchList.length) {
              // console.log("pages 1개 이상인 경우 최초실행");
              startLoading();
              const items = this.loadItems(
                parseFloat(groupKey) + 1,
                searchList
              );
              this.setState({
                page,
                searchList: _searchList.concat({ page, list: items }),
                list: _searchList.concat(items)
              });
              endLoading();
            } else {
              // console.log("pages 1개 이상인 경우 추가 아이템 호출필요");
              this.props.handleNotifyScroll({ next: page + 1 });
            }
          } else {
            //page 2 이상인 경우
            if (
              !_searchList.some(item => {
                return item.page === page;
              })
            ) {
              // console.log("배열에 없음");
              const items = this.loadItems(
                parseFloat(groupKey) + 1,
                searchList
              );
              this.setState({
                page,
                searchList: _searchList.concat({ page, list: items }),
                list: _searchList.concat(items)
              });
            } else {
              // console.log("다음 페이지 호출 해야함", this.props);
              if (pages > page) {
                this.props.handleNotifyScroll({ next: page + 1 });
              }
            }
          }
        } else {
          // console.log("검색 결과 없음");
        }
      }
    }
  };

  onLayoutComplete = ({ isLayout, isAppend, endLoading }) => {
    !isLayout && endLoading();
  };

  onUserScroll = ({ isForward, scrollPos, orgScrollPos }) => {
    if (this.props.onChange) {
      this.props.onChange(isForward, scrollPos, orgScrollPos);
      if (
        window.event.target.scrollHeight <=
        scrollPos + window.event.target.clientHeight
      ) {
        if (this.props.pages > this.props.page)
          this.props.handleNotifyScroll({ next: this.props.page + 1 });
      }
    }
  };

  render() {
    const list = this.state.searchList;
    const len = list.length;

    return (
      <div className={this.props.className}>
        {this.state.bShowDelete && (
          <div className={cx("notifypopup_rect")}>{this.showNotifyPopup()}</div>
        )}
        <GridLayout
          margin={27}
          align="center"
          onAppend={this.onAppend}
          onChange={this.onUserScroll}
          isOverflowScroll={true}
          onLayoutComplete={this.onLayoutComplete}
          transitionDuration={0.2}
          isConstantSize={true}
        >
          {len > 0 &&
            list.map(item => {
              return item.list;
            })}
          {this.state.showModify && this.showModifyPopup()}
        </GridLayout>
      </div>
    );
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SearchResult)
);
