import React, { Component } from "react";
import classNames from "classnames/bind";
import styles from "./LoginPopup.scss";
import { connect } from "react-redux";
import { Button, Div, Edit, Popup } from "../../components";
import {
  loginRequest,
  checkIDRequest,
  registerRequest,
  usereditRequest,
  userDeleteRequest,
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
    user: state.userReducer.user,
    bModifyUser: state.userReducer.bModifyUser,
    bUserDelete: state.userReducer.bUserDelete,
    set_auth: state.userReducer.set_auth
  };
};

const mapDispatchToProps = {
  loginRequest,
  checkIDRequest,
  registerRequest,
  usereditRequest,
  userDeleteRequest
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
    loading: false,
    notifyPopup: false
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
            if (!this.state.checkID) {
              this.setState({ checkID: true });
            }
          } else {
            if (this.state.checkID) {
              this.setState({ checkID: false });
            }
          }
          break;
        default:
          if (this.state.checkID) {
            this.setState({ checkID: false });
          }
          break;
      }
    } else if (prevProps.user.state === actions.LOGIN.REQUEST) {
      this.setState({ loading: false });
      switch (user.state) {
        case actions.LOGIN.FAILED:
          alert("아이디/비밀번호를 다시 확인해 주세요!");
          break;
        default:
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
      return false;
    } else if (!this.state.passwd) {
      alert("passwd를 입력해주세요");
      document.getElementById("pwd").focus();
      return false;
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
    } else if (!this.state.recheck) {
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

    if (this.state.bShowLogin && event.keyCode === 13) {
      this.onLoginClick(event);
    }
  };
  onChangeReCheckInput = event => {
    const _value = event.target.value;
    const _pwd = this.state.passwd;
    if (_pwd && _pwd.length >= 8 && _value.length >= 8 && _pwd === _value) {
      this.setState({ recheck: true });
    } else {
      if (this.state.recheck) {
        this.setState({ recheck: false });
      }
    }
  };

  /**
   * Layout
   * 로그인, 회원가입
   * key : List 사용 시 유니크한 값 설정 필요
   */
  login_form = () => {
    return [
      <div className={cx("logininner")} key="logininner">
        <div className={cx("loading_rect", !this.state.loading && "_hide")}>
          <CircleSpinner
            size={100}
            color="white"
            loading={this.state.loading}
          />
        </div>
        <div className={cx("close_button_rect")}>
          <div
            id={this.props.id}
            className={cx("close")}
            onClick={this.props.onClick}
          >
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
      <div className={cx("registerinner")} key="registerinner">
        <div className={cx("loading_rect", !this.state.loading && "_hide")}>
          <CircleSpinner
            size={100}
            color="white"
            loading={this.state.loading}
          />
        </div>
        <div className={cx("close_button_rect")}>
          <div
            id={this.props.id}
            className={cx("close")}
            onClick={this.props.onClick}
          >
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
        <div className={cx("recheck_rect")}>
          <Div
            id="recheck_container"
            key="recheck_container"
            className={cx("recheck_container")}
            content={[
              <Edit
                id="pwdrecheck"
                className={cx("pwdrecheck")}
                type="password"
                placeholder="비밀번호 재확인"
                key="edit_pwdrecheck"
                onKeyUp={this.onChangeReCheckInput}
              />,
              <Div
                id="pwdrecheck"
                className={cx("show_pwdrecheck", this.state.recheck && "ok")}
                key="div_pwdrecheck"
              />
            ]}
            onClick={function() {
              document.getElementById("pwdrecheck").focus();
            }}
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

  userModifyForm = () => {
    return [
      <div className={cx("usermodifyinner")} key="usermodifyinner">
        <div className={cx("loading_rect", !this.state.loading && "_hide")}>
          <CircleSpinner
            size={100}
            color="white"
            loading={this.state.loading}
          />
        </div>
        <div className={cx("close_button_rect")}>
          <div
            id={this.props.id}
            className={cx("close")}
            onClick={this.props.onClick}
          >
            x
          </div>
        </div>
        {this.state.notifyPopup && (
          <div className={cx("notifypopup_rect")}>{this.showNotifyPopup()}</div>
        )}
        <div className={cx("title")}>Edit Profile</div>
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
        <div className={cx("recheck_rect")}>
          <Div
            id="recheck_container"
            key="recheck_container"
            className={cx("recheck_container")}
            content={[
              <Edit
                id="pwdrecheck"
                className={cx("pwdrecheck")}
                type="password"
                placeholder="비밀번호 재확인"
                key="edit_pwdrecheck"
                onKeyUp={this.onChangeReCheckInput}
              />,
              <Div
                id="pwdrecheck"
                className={cx("show_pwdrecheck", this.state.recheck && "ok")}
                key="div_pwdrecheck"
              />
            ]}
            onClick={function() {
              document.getElementById("pwdrecheck").focus();
            }}
          />
        </div>
        <div>
          <Button
            className={cx("modify_ok")}
            value="수정완료"
            key="btn_modify_ok"
            onClick={this.onModifyClick}
          />
          <Button
            className={cx("userdelete")}
            value="탈퇴하기"
            key="btn_userdelete"
            onClick={this.onUserDeleteClick}
          />
        </div>
      </div>
    ];
  };

  showNotifyPopup = () => {
    return (
      <div className={cx("showNotifyPopup")}>
        <div className={cx("text")}>정말로 탈퇴 하겠습니까?</div>
        <div className={cx("container")}>
          <Button
            className={cx("ok")}
            value="확인"
            onClick={this.userDeleteAPI}
          />
          <Button
            className={cx("cancel")}
            value="취소"
            onClick={this.onNotifyCancelClick}
          />
        </div>
      </div>
    );
  };

  onNotifyCancelClick = evnet => {
    this.setState({ notifyPopup: false });
  };

  onModifyClick = event => {
    //수정 API
    const id = this.props.userID;
    const password = this.props.password;
    if (!this.state.passwd || this.state.passwd.length < 8) {
      alert("passwd를 8자 이상 입력해주세요");
      document.getElementById("pwd").focus();
    } else if (!this.state.recheck) {
      alert("passwd 재확인을 입력해주세요");
      document.getElementById("pwdrecheck").focus();
    } else {
      //성공 후 로컬 스토리지 수정해야함
      this.props.usereditRequest({
        id,
        password,
        newpasswd: this.state.passwd
      });
    }
  };

  //탈퇴 API
  onUserDeleteClick = event => {
    this.setState({ notifyPopup: true });
  };
  userDeleteAPI = event => {
    const id = this.props.userID;
    const password = this.props.password;

    this.props.usereditRequest({
      id,
      password
    });
    this.setState({ notifyPopup: false });
  };

  render() {
    const { bShowLogin } = this.state; //로그인, 회원가입 폼 전환
    const { onClick = null, id = "login" } = this.props; //부모로부터 click event, id 인자로 받음

    return id === "login" ? (
      <Popup
        id={id}
        className={cx(bShowLogin ? styles.loginform : styles.registerform)}
        content={bShowLogin ? this.login_form() : this.register_form()}
        onClick={onClick}
      />
    ) : (
      <Popup
        id={id}
        className={cx(styles.usermodify_form)}
        content={this.userModifyForm()}
        onClick={onClick}
      />
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPopup);
