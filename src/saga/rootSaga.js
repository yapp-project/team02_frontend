/**
 * @author AnGwangHo
 * @description similar to index.js, combine Saga
 */
import { all } from "redux-saga/effects";

export default function* rootSaga() {
  yield all();
}
