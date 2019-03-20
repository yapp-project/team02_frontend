import React, { Component } from "react";
import classNames from "classnames/bind";
import styles from "./LoginPopup.scss";
import { connect } from "react-redux";
import { Button, Div, Edit, Popup } from "../../components";

const cx = classNames.bind(styles);

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = {};

/**
 * @author AnGwangHo
 * @description 로그인/회원가입 페이지
 * @param id 팝업 시 block되는 부분의 ID(팝업 닫기 위해 설정)
 * @param onClick block되는 부분 onClick 함수
 */
class LoginPopup extends Component {
  state = {
    bShowLogin: true, //로그인 폼 보여주는지 여부
    bShowRegister: false //회원가입 폼 보여주는 지 여부
  };

  /**
   * Event
   * 로그인, 회원가입
   */
  onShowRegister = event => {
    this.setState({ bShowLogin: false, bShowRegister: true });
  };

  onShowLogin = event => {
    this.setState({ bShowLogin: true, bShowRegister: false });
  };

  /**
   * Layout
   * 로그인, 회원가입
   * key : List 사용 시 유니크한 값 설정 필요
   */
  login_form = () => {
    return [
      <Edit
        className={cx("edit__id")}
        placeholder="아이디를 입력해주세요"
        key="edit_id"
      />,
      <Edit
        className={cx("edit__pwd")}
        type="password"
        placeholder="비밀번호를 입력해주세요"
        key="edit_pwd"
      />,
      <Button className={cx("btn__login")} value="로그인" key="btn_login" />,
      <Div
        className={cx("div__register")}
        content="회원가입"
        onClick={this.onShowRegister}
        key="div_register"
      />
    ];
  };

  register_form = () => {
    return [
      <Edit
        className={cx("edit__id")}
        placeholder="아이디를 입력해주세요"
        key="edit_id"
      />,
      <Edit
        className={cx("edit__pwd")}
        type="password"
        placeholder="비밀번호를 입력해주세요"
        key="edit_pwd1"
      />,
      <Edit
        className={cx("edit_pwd")}
        type="password"
        placeholder="한번 더 비밀번호를 입력해주세요"
        key="edit_pwd2"
      />,
      <Button
        className={cx("btn__register")}
        value="회원가입"
        key="btn_register"
      />,
      <Button
        className={cx("btn__cancel")}
        value="취소"
        onClick={this.onShowLogin}
        key="btn_cancel"
      />
    ];
  };

  render() {
    const { bShowLogin } = this.state; //로그인, 회원가입 폼 전환
    const { onClick = null, id = "login" } = this.props; //부모로부터 click event, id 인자로 받음

    return (
      <Popup
        id={id}
        className={cx(bShowLogin ? styles.loginform : styles.registerform)}
        content={bShowLogin ? this.login_form() : this.register_form()}
        onClick={onClick}
      />
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPopup);
