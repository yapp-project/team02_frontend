import React, { Component } from "react";
import classNames from "classnames/bind";
import styles from "./SearchPopup.scss";
import { connect } from "react-redux";
import { Button, Div, Edit, Popup, Combo } from "../../components";

const cx = classNames.bind(styles);

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = {};

const SEARCH_BASE_TAG = 0; //태그기반 검색 선택
const SEARCH_BASE_MATERIAL = 1; //재료기반 검색 선택
const options = [
  { value: SEARCH_BASE_TAG, label: "태그" },
  { value: SEARCH_BASE_MATERIAL, label: "재료" }
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
    selectedOption: null
  };

  /**
   * Event
   * handleChange : Combo item change
   */
  handleChange = selectedOption => {
    this.setState({ selectedOption });
  };

  /**
   * Layout
   * 검색 form Layout
   * key : List 사용 시 유니크한 값 설정 필요
   */
  search_form = () => {
    const { selectedOption } = this.state;

    return [
      <Combo
        className={cx("combo")}
        value={selectedOption}
        options={options}
        handleChange={this.handleChange}
        defaultValue={options[0]}
        key="combo"
      />,
      <Edit
        className={cx("search")}
        placeholder="검색어를 입력해주세요"
        key="edit_search"
      />,
      <Button className={cx("search")} value="검색" key="btn_search" />,
      <Div className={cx("recommend")} content="추천단어" key="div_recommend" />
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
