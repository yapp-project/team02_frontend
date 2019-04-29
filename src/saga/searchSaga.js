import { all, takeLatest, call, put } from "redux-saga/effects";
import {
  actions,
  searchSuccess,
  recommendSuccess
} from "../action/searchAction";
import { searchCocktails, getRecommendTags } from "../api/searchAPI";

function* searchCocktail(action) {
  const { data } = action.payload;
  try {
    const result = yield call(searchCocktails, data.word, data.type);

    data.cocktailArray = result;
    yield put(searchSuccess(data));
  } catch (error) {}
}

function* _getRecommendTags() {
  try {
    const result = yield call(getRecommendTags);
    yield put(recommendSuccess(result));
  } catch (error) {}
}

export default function* saga() {
  yield all([
    takeLatest(actions.SEARCH.REQUEST, searchCocktail),
    takeLatest(actions.RECOMMEND.REQUEST, _getRecommendTags)
  ]);
}
