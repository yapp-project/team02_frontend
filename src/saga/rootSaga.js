/**
 * @author AnGwangHo
 * @description similar to index.js, combine Saga
 */
import { all } from "redux-saga/effects";

import userSaga from "./userSaga";

export default function* rootSaga() {
  yield all([userSaga()]);
}
