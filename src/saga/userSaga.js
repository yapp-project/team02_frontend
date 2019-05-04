import { all, takeLatest, call, put } from "redux-saga/effects";
import {
  actions,
  loginSuccess,
  checkIDSuccess,
  registerSuccess,
  registerFailed,
  checkIDFailed
} from "../action/userAction";
import { setJoin, checkID, setLogin } from "../api/userAPI";

function* requestLogin(action) {
  try {
    const { userid, password } = action.payload;
    const result = yield call(setLogin, { userid, password });
    console.log(result);
    const localData = { userid: userid, password: password };
    localStorage.setItem("myData", JSON.stringify(localData));
    yield put(loginSuccess(result));
  } catch (error) {}
}

function* requestRegister(action) {
  const { userid, password } = action.payload;
  console.log("회원가입 시작");
  let result;
  try {
    result = yield call(checkID, userid);
    yield put(checkIDSuccess(result));
  } catch (error) {
    yield put(checkIDFailed(false));
  }

  if (result) {
    try {
      const result = yield call(setJoin, { userid, password });
      console.log(result);
      yield put(registerSuccess(result));
    } catch (error) {
      console.log("회원가입 실패:");
      yield put(registerFailed(false));
    }
  }
}

function logout() {
  localStorage.removeItem("myData");
}

export default function* saga() {
  yield all([
    takeLatest(actions.LOGIN.REQUEST, requestLogin),
    takeLatest(actions.REGISTER.REQUEST, requestRegister),
    takeLatest(actions.LOGIN.LOGOUT, logout)
  ]);
}
