import { all, takeLatest, call, put } from "redux-saga/effects";
import {
  actions,
  loginSuccess,
  checkIDSuccess,
  registerSuccess
} from "../action/userAction";
import { setJoin, checkID, setLogin } from "../api/userAPI";

function* requestLogin(action) {
  try {
    const { userid, password } = action.payload;
    const { auth } = yield call(setLogin, { userid, password });
    console.log(auth);
    yield put(loginSuccess(auth));
  } catch (error) {}
}

function* requestIDCheck(action) {
  const { userid } = action.payload;

  const result = yield call(checkID, userid);
  console.log(result);

  yield put(checkIDSuccess(result));
}

function* requestRegister(action) {
  const { userid, password } = action.payload;

  const result = yield call(setJoin, { userid, password });
  console.log(result);

  yield put(registerSuccess(result));
}

export default function* saga() {
  yield all([
    takeLatest(actions.LOGIN.REQUEST, requestLogin),
    takeLatest(actions.IDCHECK.REQUEST, requestIDCheck),
    takeLatest(actions.REGISTER.REQUEST, requestRegister)
  ]);
}
