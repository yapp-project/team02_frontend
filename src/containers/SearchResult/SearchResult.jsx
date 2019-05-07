import React, { Component } from "react";
import classNames from "classnames/bind";
import styles from "./SearchResult.scss";
import { connect } from "react-redux";
import { SearchResultItem } from "../../components";

import { GridLayout } from "@egjs/react-infinitegrid";

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
  state = { list: [] };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.data.length && !this.props.data.length) {
      if (this.state.list.length > 0) {
        this.setState({ list: [] });
      }
    }
  }

  loadItems(groupKey, num) {
    const items = [];
    const start = this.start || 0;
    const cocktails = this.props.data;

    for (let i = 0; i < num; ++i) {
      items.push(
        <SearchResultItem
          groupKey={groupKey}
          className={cx("item")}
          key={1 + start + i}
          props={cocktails[i]}
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
        </GridLayout>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchResult);
