import { all, call, put, takeLatest } from "redux-saga/effects";
import {
  actions,
  enrolmentSuccess

} from "../action/enrolmentAction";
import { 
  enrolmentRecipe
 } from "../api/enrolmentAPI";

function* enrolmentRecipeRequest (action) {
  try {
    const { data } = action.payload;
    const result = yield call(enrolmentRecipe, {data});
    yield put(enrolmentSuccess(result));
  } catch (error) {}
}

export default function* saga() {
  yield all([
    takeLatest(actions.ENROLMENT.REQUEST, enrolmentRecipeRequest)
  ]);
}
