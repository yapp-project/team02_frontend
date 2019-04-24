/**
 * @author AnGwangHo
 * @description similar to index.js, combine Saga
 */
import { all } from "redux-saga/effects";

import userSaga from "./userSaga";
import searchSaga from "./searchSaga";

export default function* rootSaga() {
  yield all([userSaga(), searchSaga()]);
}
