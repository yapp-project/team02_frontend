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

const Item = ({ num }) => (
  <SearchResultItem
    className={cx("item")}
    Image={`https://naver.github.io/egjs-infinitegrid/assets/image/${(num %
      59) +
      1}.jpg`}
    key={num}
    name={num}
    like={num}
  />
);

/**
 * @author AnGwangHo
 * @description 검색 결과를 표현하는 컨테이너
 */
class SearchResult extends Component {
  state = { list: [] };
  loadItems(groupKey, num) {
    const items = [];
    const start = this.start || 0;

    for (let i = 0; i < num; ++i) {
      items.push(
        <Item groupKey={groupKey} num={1 + start + i} key={start + i} />
      );
    }
    this.start = start + num;
    return items;
  }
  onAppend = ({ groupKey, startLoading }) => {
    startLoading();
    const list = this.state.list;
    const items = this.loadItems(parseFloat(groupKey) + 1, 5);

    this.setState({ list: list.concat(items) });
  };
  onLayoutComplete = ({ isLayout, endLoading }) => {
    !isLayout && endLoading();
  };

  render() {
    const { data } = this.props;
    return (
      <div className={cx("result_form")}>
        <GridLayout
          margin={10}
          align="center"
          onAppend={this.onAppend}
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
