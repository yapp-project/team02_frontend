import React, { Component } from "react";
import classNames from "classnames/bind";
import styles from "./SearchPopup.scss";
import { connect } from "react-redux";
import { Button, Div, Edit, Popup, Combo } from "../../components";
import SearchResult from "../SearchResult/SearchResult";
import { isAbsolute } from "path";

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

  onSearh = () => {
    this.setState({ bSaerch: !this.state.bSaerch });
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
            onInput={this.onSearh}
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
        className={cx("recommend")}
        content={[
          dummy_data.map(item => {
            return (
              <div id={item} key={item} tabIndex="-1" className={cx("text")}>
                #{item}
              </div>
            );
          }),
          <div className={cx("next")}>></div>
        ]}
        key="div_recommend"
      />,
      bSaerch ? <SearchResult /> : null
    ];
  };

  render() {
    const { onClick = null, id = "search" } = this.props; //부모로부터 click event, id 인자로 받음
    return (
      <Popup
        id={id}
        className={cx("searchform")}
        content={this.search_form()}
        onClick={onClick}
      />
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchPopup);
