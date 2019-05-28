import { all, takeLatest, call, put } from "redux-saga/effects";
import {
  actions,
  loginSuccess,
  checkIDSuccess,
  registerSuccess,
  registerFailed,
  checkIDFailed,
  dataEnd,
  dataError,
  usereditSuccess,
  usereditFailed,
  userDeleteSuccess,
  userDeleteFailed
} from "../action/userAction";
import {
  setJoin,
  checkID,
  setLogin,
  getMyScrap,
  getMyRecipes,
  setUserEdit,
  setUserDelete,
  deleteCocktail,
  setScrap
} from "../api/userAPI";

function* requestLogin(action) {
  try {
    const { userid, password } = action.payload;
    const result = yield call(setLogin, { userid, password });
    const localData = { userid: userid, password: password };
    localStorage.setItem("myData", JSON.stringify(localData));
    yield put(loginSuccess(result));
  } catch (error) {
    if (error.status === 404) {
      const auth = JSON.parse(localStorage.getItem("myData"));
      if (auth) {
        logout();
      }
    }
  }
}

function* requestRegister(action) {
  const { userid, password } = action.payload;
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
      yield put(registerSuccess(result));
    } catch (error) {
      yield put(registerFailed(false));
    }
  }
}

function* requsetIdChek(action) {
  try {
    const { userid } = action.payload;
    const result = yield call(checkID, userid);
    yield put(checkIDSuccess(result));
  } catch (error) {
    yield put(checkIDFailed(false));
  }
}

//회원정보 수정 API
function* requsetUserEdit(action) {
  try {
    const { id, password, newpasswd } = action.payload;
    const result = yield call(setUserEdit, id, password, newpasswd);
    yield put(usereditSuccess(result));
  } catch (error) {
    yield put(usereditFailed(false));
  }
}

//회원탈퇴
function* requseUserDelete(action) {
  try {
    const { id, password } = action.payload;
    const result = yield call(setUserDelete, id, password);
    yield put(userDeleteSuccess(result));
    logout();
  } catch (error) {
    yield put(userDeleteFailed(false));
  }
}

//MyMenu에서 스크랩, 등록한 레시피 정보, 레시피 삭제 하는 API
//type [0: 스크랩 정보, 1: 등록한 레시피, 2: 레시피 삭제, 3: 스크랩 기능]
function* requestData(action) {
  const { type, data } = action.payload;

  try {
    let result = [];
    if (type === 0) {
      result = yield call(getMyScrap, data.userID);
      result = result.map(item => {
        return item.scraps[0];
      });
    } else if (type === 1) {
      result = yield call(getMyRecipes, data.userID);
    } else if (type === 2) {
      // result = yield call(deleteCocktail, id);
      result = true;
    } else if (type === 3) {
      result = yield call(setScrap, data.userID, data.cocktailID);
    }

    yield put(dataEnd(type, result));
  } catch (error) {
    yield put(dataError(type, false));
  }
}

function logout() {
  localStorage.removeItem("myData");
}

export default function* saga() {
  yield all([
    takeLatest(actions.LOGIN.REQUEST, requestLogin),
    takeLatest(actions.REGISTER.REQUEST, requestRegister),
    takeLatest(actions.IDCHECK.REQUEST, requsetIdChek),
    takeLatest(actions.LOGIN.LOGOUT, logout),
    takeLatest(actions.SCRAP.REQUEST, requestData),
    takeLatest(actions.RECIPE.REQUEST, requestData),
    takeLatest(actions.LKIE.REQUEST, requestData),
    takeLatest(actions.USEREDIT.REQUEST, requsetUserEdit),
    takeLatest(actions.USERDELETE.REQUEST, requseUserDelete)
  ]);
}
