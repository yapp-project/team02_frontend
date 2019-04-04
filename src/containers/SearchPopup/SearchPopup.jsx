import React, { Component } from "react";
import classNames from "classnames/bind";
import styles from "./SearchPopup.scss";
import { connect } from "react-redux";
import { Button, Div, Edit, Popup, Combo } from "../../components";
import SearchResult from "../SearchResult/SearchResult";

const cx = classNames.bind(styles);

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = {};

const SEARCH_FITER_TIME = 0; //태그기반 검색 선택
const SEARCH_FITER_SCRAP = 1; //재료기반 검색 선택
const SEARCH_BASE_TAG = 0; //태그기반 검색 선택
const SEARCH_BASE_MATERIAL = 1; //재료기반 검색 선택
const filter = [
  { value: SEARCH_FITER_TIME, label: "최신순" },
  { value: SEARCH_FITER_SCRAP, label: "스크랩순" }
];
const type = [
  { value: SEARCH_BASE_TAG, label: "태그 기반" },
  { value: SEARCH_BASE_MATERIAL, label: "재료 기반" }
];
const dummy_data = [
  "Citrus",
  "Bombay",
  "Vodka",
  "Bombay",
  "Bombay",
  "Bombay",
  "Bombay",
  "Bombay"
];

const styleStrategies = [
  {
    mediaQuery: "(max-width: 719.9px)",
    style: { numberOfColumns: 1, gutterHeight: 5, gutterWidth: 0 }
  },
  {
    mediaQuery: "(min-width: 720px) and (max-width: 1023.9px)",
    style: { numberOfColumns: 2, gutterHeight: 15, gutterWidth: 15 }
  },
  {
    mediaQuery: "(min-width: 1024px)",
    style: { numberOfColumns: 3, gutterHeight: 30, gutterWidth: 30 }
  }
];
const transition = "top 100ms ease-in-out, left 100ms ease-in-out";

/**
 * @author AnGwangHo
 * @description 검색 팝업으로 독립적으로 구성된다.
 * @param id 팝업 시 block되는 부분의 ID(팝업 닫기 위해 설정)
 * @param onClick block되는 부분 onClick 함수
 */
class SearchPopup extends Component {
  state = {
    material_min: 0,
    material_max: 0,
    recommend: {},
    selectedOption: null,
    bSaerch: false
  };

  /**
   * Event
   * handleChange : Combo item change
   */
  handleChange = selectedOption => {
    this.setState({ selectedOption });
  };

  onSearh = event => {
    const { keyCode } = event;
    if (keyCode === 13) this.setState({ bSaerch: !this.state.bSaerch });
  };

  onNextScrollClick = event => {
    const target = document.getElementById("recommend");
    const _scrollLeft = target.scrollLeft;
    target.scrollTo(_scrollLeft + 185, 0);
  };

  onPrevScrollClick = event => {
    const target = document.getElementById("recommend");
    const _scrollLeft = target.scrollLeft;
    target.scrollTo(_scrollLeft - 185, 0);
  };

  /**
   * Layout
   * 검색 form Layout
   * key : List 사용 시 유니크한 값 설정 필요
   */
  search_form = () => {
    const { selectedOption, bSaerch } = this.state;
    const customStyles = {
      control: base => ({
        ...base,
        height: 47,
        minHeight: 47,
        margin: 0,
        border: 0,
        backgroundColor: "#080f24",
        color: "#ffffff"
      }),
      menu: base => ({
        ...base,
        margin: 0,
        color: "#ffffff",
        backgroundColor: "#080f24",
        "font-size": 20
      }),
      indicatorSeparator: base => ({
        ...base,
        backgroundColor: "transparent"
      }),
      dropdownIndicator: base => ({
        ...base,
        color: "#ffffff",
        "&:hover": {
          color: "#ffffff"
        }
      }),
      singleValue: base => ({
        ...base,
        color: "#fff"
      }),
      valueContainer: base => ({
        ...base,
        color: "#ffffff",
        "font-size": 20
      }),
      input: base => ({
        ...base,
        color: "#ffffff",
        "font-size": 20
      })
    };
    return [
      <Div
        className={cx("topcotainer")}
        key="top_div"
        content={[
          <Edit
            className={cx("search")}
            placeholder="검색어를 입력해주세요"
            key="edit_search"
            onKeyUp={this.onSearh}
          />,
          <Combo
            className={cx("filter")}
            value={selectedOption}
            options={filter}
            handleChange={this.handleChange}
            isSearchable={false}
            defaultValue={filter[0]}
            key="filter"
            styles={customStyles}
          />,
          <Combo
            className={cx("type")}
            value={selectedOption}
            options={type}
            handleChange={this.handleChange}
            isSearchable={false}
            defaultValue={type[0]}
            key="type"
            styles={customStyles}
          />
        ]}
      />,
      <Div
        id="recommend"
        className={cx("recommend")}
        content={[
          dummy_data.map(item => {
            return (
              <div id={item} key={item} tabIndex="-1" className={cx("text")}>
                #{item}
              </div>
            );
          }),
          <div className={cx("prev")}>
            <span className={cx("arrow")} onClick={this.onPrevScrollClick} />
          </div>,
          <div className={cx("next")}>
            <span className={cx("arrow")} onClick={this.onNextScrollClick} />
          </div>
        ]}
        key="div_recommend"
      />,
      bSaerch ? <SearchResult /> : null
    ];
  };

  render() {
    return <div>{this.search_form()}</div>;
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchPopup);
