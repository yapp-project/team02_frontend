import React, { Component } from "react";
import classNames from "classnames/bind";
import styles from "./SearchResult.scss";
import { connect } from "react-redux";
import { SearchResultItem } from "../../components";

import { GridLayout } from "@egjs/react-infinitegrid";
import { withRouter } from "react-router-dom";

import { searchRequest } from "../../action/searchAction";

const cx = classNames.bind(styles);

const mapStateToProps = state => {
  return { searchReducer: state.searchReducer };
};

const mapDispatchToProps = { searchRequest };

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
    pages: 0
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
    //이전에 있다가 현재 없으면 초기화

    // if (prevProps.data.cocktails.length && !this.props.data.cocktails.length) {
    //   if (this.state.list.length > 0) {
    //     this.setState({ list: [] });
    //     return;
    //   }
    // }

    //word 달라지면 list 초기화
    if (
      prevProps.searchReducer.searchword !== this.props.searchReducer.searchword
    ) {
      this.setState({ list: [], page: 0, pages: 0 });
      return;
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

    //filter변경에 의한 list 초기화
    if (prevProps.searchReducer.filter !== this.props.searchReducer.filter) {
      this.setState({
        page: 0,
        list: []
      });
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

  loadItems(groupKey, num) {
    const items = [];
    const start = this.start || 0;
    const { searchresult } = this.props.searchReducer;
    const cocktails = searchresult.cocktails;
    const modify = this.props.modify;

    for (let i = 0; i < num; ++i) {
      items.push(
        <SearchResultItem
          groupKey={groupKey}
          className={cx("item")}
          key={1 + start + i}
          props={cocktails[i]}
          modify={modify}
          modifyClick={this.onModifyClick}
          informationClick={this.onCocktailClick}
        />
      );
    }
    this.start = start + num;
    return items;
  }

  /**
   * GridLayout Append Event
   * @description GridLayout에 우측or아래로 스크롤 시 & Item이 부족한 경우 호출 됨
   */
  onAppend = ({ groupKey, startLoading, endLoading }) => {
    const list = this.state.list;
    const len = this.props.data.cocktails
      ? this.props.data.cocktails.length
      : 0;

    const { searchresult } = this.props.searchReducer;

    //전체 페이지 보다 작은 경우 실행
    if (searchresult.pages > this.state.page) {
      if (this.state.page === 0 && searchresult.page === 1) {
        //최초 로딩되는 시점에만 수행
        startLoading();
        const items = this.loadItems(parseFloat(groupKey) + 1, len);
        this.setState({ page: searchresult.page, list: list.concat(items) });
        endLoading();
      } else if (this.state.page === searchresult.page) {
        //scroll 됬을 때 한 번만 로딩 되도록 조건문 설정
        const word = this.props.searchReducer.searchword;
        const filter = this.props.searchReducer.filter;
        const type = this.props.searchReducer.type;

        this.props.searchRequest({
          word,
          filter,
          type,
          index: searchresult.page + 1
        });
        this.groupKey = groupKey;
      }
    }
  };
  onLayoutComplete = ({ isLayout, isAppend, endLoading }) => {
    !isLayout && endLoading();
  };

  render() {
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
          {this.state.list}
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
