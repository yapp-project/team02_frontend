import React, { Component } from "react";
import classNames from "classnames/bind";
import styles from "./LoginPopup.scss";
import { connect } from "react-redux";
import { Button, Div, Edit, Popup } from "../../components";
import {
  loginRequest,
  checkIDRequest,
  registerRequest,
  actions
} from "../../action/userAction";
import { CircleSpinner } from "react-spinners-kit";
import { debounce } from "lodash";

const cx = classNames.bind(styles);

const mapStateToProps = state => {
  return {
    bRegisterResult: state.userReducer.bRegisterResult,
    bIDCheckResult: state.userReducer.bIDCheckResult,
    bLoginResult: state.userReducer.bLoginResult,
    user: state.userReducer.user
  };
};

const mapDispatchToProps = {
  loginRequest,
  checkIDRequest,
  registerRequest
};

/**
 * @author AnGwangHo
 * @description 로그인/회원가입 페이지
 * @param id 팝업 시 block되는 부분의 ID(팝업 닫기 위해 설정)
 * @param onClick block되는 부분 onClick 함수
 */
class LoginPopup extends Component {
  state = {
    bShowLogin: true, //로그인 폼 보여주는지 여부
    bShowRegister: false, //회원가입 폼 보여주는 지 여부
    ID: null,
    passwd: null,
    recheck: false,
    checkID: false,
    loading: false
  };

  componentDidUpdate(prevProps, prevSate) {
    if (
      this.state.bShowRegister &&
      this.props.bIDCheckResult &&
      this.props.bRegisterResult
    ) {
      document.getElementById("pwd").value = "";
      this.setState({ bShowLogin: true, bShowRegister: false, loading: false });
      document.getElementById("pwd").focus();
    }

    const { user } = this.props;
    if (prevProps.user.state === actions.IDCHECK.REQUEST) {
      switch (user.state) {
        case actions.IDCHECK.SUCCESS:
          if (user.checkID) {
            this.setState({ checkID: true });
          } else {
            this.setState({ checkID: false });
          }
          break;
        default:
          this.setState({ checkID: false });
          break;
      }
    }
  }

  /**
   * Event
   * 로그인, 회원가입
   */
  onShowRegister = event => {
    document.getElementById("id").value = "";
    document.getElementById("pwd").value = "";
    this.setState({ bShowLogin: false, bShowRegister: true });
  };

  onShowLogin = event => {
    this.setState({ bShowLogin: true, bShowRegister: false });
  };

  onLoginClick = event => {
    if (!this.state.ID) {
      alert("ID를 입력해주세요");
      document.getElementById("id").focus();
    } else if (!this.state.passwd) {
      alert("passwd를 입력해주세요");
      document.getElementById("pwd").focus();
    }
    this.setState({ loading: true });
    this.props.loginRequest(this.state.ID, this.state.passwd);
  };

  onRegisterClick = event => {
    if (!this.state.ID) {
      alert("ID를 입력해주세요");
      document.getElementById("id").focus();
    } else if (!this.state.passwd || this.state.passwd.length < 8) {
      alert("passwd를 8자 이상 입력해주세요");
      document.getElementById("pwd").focus();
    } else if (this.state.passwd !== this.state.recheck) {
      alert("passwd 재확인을 입력해주세요");
      document.getElementById("pwdrecheck").focus();
    } else if (!this.state.checkID) {
      alert("ID 중복 확인해주세요!");
      document.getElementById("idcheck").focus();
    } else {
      this.setState({ loading: true });
      this.props.registerRequest(this.state.ID, this.state.passwd);
    }
  };

  //회원가입 취소
  onCancelClick = event => {
    //아이디, 비밀번호 input 초기화
    document.getElementById("id").value = "";
    document.getElementById("pwd").value = "";
    this.setState({
      bShowLogin: true,
      bShowRegister: false,
      ID: null,
      passwd: null,
      recheck: false
    });
  };

  onChangeIDInput = event => {
    const _id = event.target.value;
    if (this.state.bShowRegister) {
      this.debouncedHandleChange(_id);
    } else {
      this.setState({ ID: _id });
    }
  };

  debouncedHandleChange = debounce(value => {
    if (value.length > 1) {
      if (this.state.ID !== value) {
        this.setState({ ID: value });
        this.props.checkIDRequest(value);
      }
    } else {
      this.setState({ ID: "", checkID: false });
    }
  }, 300);

  onChangePwdInput = event => {
    const _pwd = event.target.value;
    this.setState({ passwd: _pwd });
  };
  onChangeReCheckInput = event => {
    const _value = event.target.value;
    this.setState({ recheck: _value });
  };

  /**
   * Layout
   * 로그인, 회원가입
   * key : List 사용 시 유니크한 값 설정 필요
   */
  login_form = () => {
    return [
      <div className={cx("logininner")}>
        <div className={cx("loading_rect", !this.state.loading && "_hide")}>
          <CircleSpinner
            size={100}
            color="white"
            loading={this.state.loading}
          />
        </div>
        <div className={cx("close_button_rect")}>
          <div id="login" className={cx("close")} onClick={this.props.onClick}>
            x
          </div>
        </div>
        <div className={cx("title")}>Sign in</div>
        <div>
          <Edit
            id="id"
            className={cx("id")}
            placeholder="아이디를 입력해주세요"
            key="edit_id"
            onKeyUp={this.onChangeIDInput}
          />
        </div>
        <div>
          <Edit
            id="pwd"
            className={cx("pwd")}
            type="password"
            placeholder="비밀번호를 입력해주세요"
            key="edit_pwd"
            onKeyUp={this.onChangePwdInput}
          />
        </div>
        <div>
          <Button
            className={cx("login")}
            value="로그인"
            key="btn_login"
            onClick={this.onLoginClick}
          />
        </div>
        <div className={cx("etc")}>
          <div className={cx("inner")}>
            <div className={cx("forgot")}>계정을 잊어버리셨나요?</div>
            <div className={cx("register")} onClick={this.onShowRegister}>
              회원가입
            </div>
          </div>
        </div>
      </div>
    ];
  };

  /**
   * @author AnGwangHo
   * @description 회원가입 Layout
   * @return 회원가입 Layout을 반환한다.
   */
  register_form = () => {
    return [
      <div className={cx("registerinner")}>
        <div className={cx("loading_rect", !this.state.loading && "_hide")}>
          <CircleSpinner
            size={100}
            color="white"
            loading={this.state.loading}
          />
        </div>
        <div className={cx("close_button_rect")}>
          <div id="login" className={cx("close")} onClick={this.props.onClick}>
            x
          </div>
        </div>
        <div className={cx("title")}>Sign up</div>
        <div className={cx("id_rect")}>
          <Div
            id="id_container"
            key="id_container"
            className={cx("id_container")}
            content={[
              <Edit
                id="id"
                className={cx("id")}
                placeholder="아이디를 입력해주세요"
                key="edit_id"
                onKeyUp={this.onChangeIDInput}
              />,
              <Div
                id="idcheck"
                className={cx("show_idcheck", this.state.checkID && "ok")}
                key="div_idcheck"
              />
            ]}
            onClick={function() {
              document.getElementById("id").focus();
            }}
          />
        </div>
        <div>
          <Edit
            id="pwd"
            className={cx("pwd")}
            type="password"
            placeholder="비밀번호를 입력해주세요"
            key="edit_pwd"
            onKeyUp={this.onChangePwdInput}
          />
        </div>
        <div>
          <Edit
            id="pwdrecheck"
            className={cx("pwdrecheck")}
            type="password"
            placeholder="비밀번호 재확인"
            key="edit_pwdrecheck"
            onKeyUp={this.onChangeReCheckInput}
          />
        </div>
        <div>
          <Button
            className={cx("register")}
            value="회원가입"
            key="btn_register"
            onClick={this.onRegisterClick}
          />
          <Button
            className={cx("cancel")}
            value="취소"
            key="btn_cancel"
            onClick={this.onCancelClick}
          />
        </div>
      </div>
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
