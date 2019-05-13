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
  state = { list: [], showModify: false, modifyXY: { x: 0, y: 0 }, index: "" };

  componentDidMount() {
    this.setState({ showModify: this.props.modify });
  }

  componentDidUpdate(prevProps, prevState) {
    //이전에 있다가 현재 없으면 초기화
    if (prevProps.data.length && !this.props.data.length) {
      if (this.state.list.length > 0) {
        this.setState({ list: [] });
      }
    }

    //리스트 초기화
    if (prevProps.data !== this.props.data) {
      if (this.state.list.length) {
        this.setState({ list: [] });
      }
    }

    // 수정/삭제 팝업 떠있는 경우 Tab 변경 시 닫도록 state변경
    if (!this.props.modify && this.state.showModify) {
      this.setState({ showModify: false });
    }

    if (this.props.modify && this.state.showModify) {
      const x = this.state.modifyXY.x;
      const y = this.state.modifyXY.y;
      setTimeout(function() {
        document.getElementById("modifyPopup").style["left"] = x + "px";
        document.getElementById("modifyPopup").style["top"] = y + "px";
      });
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
    const cocktails = this.props.data;
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
  onAppend = ({ groupKey, startLoading }) => {
    const list = this.state.list;
    const len = this.props.data ? this.props.data.length : 0;

    if (len > 0) {
      startLoading();
      const items = this.loadItems(parseFloat(groupKey) + 1, len);
      this.setState({ list: list.concat(items) });
    }
  };
  onLayoutComplete = ({ isLayout, endLoading }) => {
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
