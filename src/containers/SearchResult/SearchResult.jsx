import React, { Component } from "react";
import classNames from "classnames/bind";
import styles from "./SearchResult.scss";
import { connect } from "react-redux";
import { SearchResultItem } from "../../components";

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
  /**
   * @author AnGwangHo
   * @description 칵테일 검색결과 레이아웃
   * @param data 검색결과 data[{no, Image, name},{}...]
   */
  result_form = data => {
    return data.map(item => {
      return (
        <ui className={cx("resultitem")} key={item.name}>
          <SearchResultItem className={cx("image_container")} props={item} />
        </ui>
      );
    });
  };

  render() {
    const { data } = this.props;
    return (
      <div>
        <ul className={cx("searchresultform")}>{this.result_form(data)}</ul>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchResult);
