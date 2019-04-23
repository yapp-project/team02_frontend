import { all, takeLatest, call, put } from "redux-saga/effects";
import { actions, searchSuccess } from "../action/searchAction";
import { searchCocktails } from "../api/searchAPI";

function* searchCocktail(action) {
  try {
    const { data } = action.payload;
    const result = yield call(searchCocktails, {
      word: data.word,
      type: data.type
    });
    data.cocktailArray = result;
    yield put(searchSuccess(data));
  } catch (error) {}
}

export default function* saga() {
  yield all([takeLatest(actions.SEARCH.REQUEST, searchCocktail)]);
}
