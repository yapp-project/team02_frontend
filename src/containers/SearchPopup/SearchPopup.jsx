import React, { Component } from "react";
import classNames from "classnames/bind";
import styles from "./SearchPopup.scss";
import { connect } from "react-redux";
import { Button, Div, Edit, Popup, Combo } from "../../components";
import { searchRequest } from "../../action/searchAction";

const cx = classNames.bind(styles);

const mapStateToProps = state => {
  return { searchresult: state.searchReducer.searchresult };
};

const mapDispatchToProps = { searchRequest };

const SEARCH_BASE_TAG = 0; //태그기반 검색 선택
const SEARCH_BASE_MATERIAL = 1; //재료기반 검색 선택

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
    selectedOption: type[0]
  };

  componentDidUpdate() {
    // console.log("업데이트 됨 ㅣ " + this.state.selectedOption.value);
    // console.log(this.state.selectedOption);
  }

  /**
   * Event
   * handleChange : Combo item change
   */

  handleChangeType = selectedOption => {
    this.setState({ selectedOption });
  };
  handleChangeNumber = event => {
    const target = event.target;
    if (target.id === "start") {
      this.setState({ material_min: target.value });
    } else {
      this.setState({ material_max: target.value });
    }
  };

  onSearh = event => {
    const { keyCode } = event;
    if (keyCode === 13) {
      const value = event.target.value;
      if (!value) {
        alert("단어를 입력하세요!");
        return false;
      }
      //해쉬태그 분리
      const regexp = /\#[^#\s,;]+/g;
      let word = value.match(regexp);
      if (word) {
        word = word.map(item => item.replace("#", "")).toString();
      } else {
        alert("#을 적어서 입력해 주세요");
        return false;
      }

      //검색 type
      const type = this.state.selectedOption.value;

      //검색 API 호출
      if (type === SEARCH_BASE_TAG) {
        if (this.props.searchAction) {
          this.props.searchAction(true);
        }
        this.props.searchRequest({ word, filter: 0, type });
      } else if (type === SEARCH_BASE_MATERIAL) {
        if (this.props.searchAction) {
          this.props.searchAction(true);
        }
        this.props.searchRequest({
          word,
          filter: 0,
          type,
          number: {
            start: this.state.material_min,
            end: this.state.material_max
          }
        });
      }
    }
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
    const { selectedOption } = this.state;
    const customStyles = {
      control: base => ({
        ...base,
        height: 47,
        minHeight: 47,
        margin: 0,
        border: 0,
        backgroundColor: "#080f24",
        color: "#ffffff",
        paddingTop: 5
      }),
      menu: base => ({
        ...base,
        margin: 0,
        color: "#ffffff",
        backgroundColor: "#080f24",
        position: "absolute",
        height: "auto",
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
          <Combo
            className={cx("type")}
            value={selectedOption}
            options={type}
            handleChange={this.handleChangeType}
            isSearchable={false}
            defaultValue={type[0]}
            key="type"
            styles={customStyles}
          />,
          <Edit
            className={cx("search")}
            placeholder="#을 붙여서 검색해주세요 ex)#맛있는#칵테일"
            key="edit_search"
            onKeyUp={this.onSearh}
          />,
          this.state.selectedOption.value && (
            <Div
              className={cx("material_rect")}
              key="div_material_rect"
              content={
                <div className={cx("material_container")}>
                  <div className={cx("text")}>재료갯수</div>
                  <div className={cx("number_rect")}>
                    <Edit
                      id="start"
                      className={cx("start")}
                      type="number"
                      key="edit_start"
                      min="0"
                      max="99"
                      defaultValue="0"
                      onKeyUp={this.handleChangeNumber}
                    />
                    <div className={cx("number_text")}>~</div>
                    <Edit
                      id="end"
                      className={cx("end")}
                      type="number"
                      key="edit_end"
                      min="0"
                      max="99"
                      defaultValue="0"
                      onKeyUp={this.handleChangeNumber}
                    />
                  </div>
                </div>
              }
            />
          )
        ]}
      />,
      <Div
        id="recommend"
        className={cx("recommend")}
        content={[
          dummy_data.map((item, index) => {
            return (
              <div id={item} key={index} tabIndex="-1" className={cx("text")}>
                #{item}
              </div>
            );
          }),
          <div key="prev" className={cx("prev")}>
            <span className={cx("arrow")} onClick={this.onPrevScrollClick} />
          </div>,
          <div key="next" className={cx("next")}>
            <span className={cx("arrow")} onClick={this.onNextScrollClick} />
          </div>
        ]}
        key="div_recommend"
      />
    ];
  };

  render() {
    return <div className={this.props.className}>{this.search_form()}</div>;
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchPopup);
