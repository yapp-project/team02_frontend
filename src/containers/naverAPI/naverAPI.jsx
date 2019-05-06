import React, { Component } from "react";
import classNames from "classnames/bind";
import styles from "./naverAPI.scss";

import { connect } from "react-redux";

import { GridLayout } from "@egjs/react-infinitegrid";
import SearchResultItem from "../../components/SearchResultItem/SearchResultItem";

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

class naverAPI extends Component {
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
    return (
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
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(naverAPI);
