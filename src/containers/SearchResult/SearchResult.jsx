import React, { Component } from "react";
import classNames from "classnames/bind";
import styles from "./SearchResult.scss";
import { connect } from "react-redux";
import { SearchResultItem } from "../../components";

import { GridLayout } from "@egjs/react-infinitegrid";
import { withRouter } from "react-router-dom";

const cx = classNames.bind(styles);

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = {};

/**
 * @author AnGwangHo
 * @description 검색 결과를 표현하는 컨테이너
 */
class SearchResult extends Component {
  state = {
    list: [],
    showModify: false,
    modifyXY: { x: 0, y: 0 },
    index: "",
    page: 0,
    pages: 0,
    searchList: [], //[{page:number,list:[]}, ...]
    _index: { page: 0, index: 0 }
  };

  componentDidMount() {
    const { searchresult } = this.props.searchReducer;
    this.setState({
      page: searchresult.page,
      pages: searchresult.pages,
      showModify: this.props.modify
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { searchresult } = this.props.searchReducer;
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
    if (prevProps.searchReducer.searchresult.page !== searchresult.page) {
      const len = searchresult.cocktails ? searchresult.cocktails.length : 0;
      const items = this.loadItems(parseFloat(this.groupKey) + 1, len);
      this.setState({
        page: searchresult.page,
        list: this.state.list.concat(items)
      });
      return;
    }
  }

  onPopupModifyClick = event => {
    this.props.history.push(`/enrolment/${this.state.index}`);
  };

  onCocktailClick = event => {
    this.props.history.push(`/viewRecipe`);
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
          <div className={cx("text")}>삭제하기</div>
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

  loadItems(groupKey, list) {
    const items = [];
    const start = this.start || 0;
    const cocktailArray = list;
    const len = list.length;
    const modify = this.props.modify;

    for (let i = 0; i < len; ++i) {
      items.push(
        <SearchResultItem
          groupKey={groupKey}
          className={cx("item")}
          key={1 + start + i}
          props={cocktailArray[i]}
          modify={modify}
          modifyClick={this.onModifyClick}
          informationClick={this.onCocktailClick}
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
    const list = this.state.list;
    const { page, pages, searchList } = this.props;
    const _searchList = this.state.searchList;

    if (pages === 1) {
      if (searchList.length && !_searchList.length) {
        startLoading();
        const items = this.loadItems(parseFloat(groupKey) + 1, searchList);
        this.setState({
          page,
          searchList: _searchList.concat({ page, list: items }),
          list: list.concat(items)
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
                list: list.concat(items)
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
                list: list.concat(items)
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

  render() {
    const list = this.state.searchList;
    const len = list.length;
    return (
      <div className={this.props.className}>
        <GridLayout
          margin={27}
          align="center"
          onAppend={this.onAppend}
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
