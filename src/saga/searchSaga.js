import { all, takeLatest, call, put } from "redux-saga/effects";
import {
  actions,
  searchSuccess,
  recommendSuccess
} from "../action/searchAction";
import { searchCocktails, getRecommendTags } from "../api/searchAPI";
import cocktail1 from "../static/images/a1.jpeg";
import cocktail2 from "../static/images/a2.jpg";

const dummy_data = [
  { no: 0, Image: cocktail1, name: "칵테일1", like: 10 },
  { no: 1, Image: cocktail2, name: "칵테일2", like: 20 },
  { no: 2, Image: cocktail1, name: "칵테일3", like: 30 },
  { no: 3, Image: cocktail2, name: "칵테일4", like: 40 },
  { no: 4, Image: cocktail1, name: "칵테일5", like: 50 },
  { no: 5, Image: cocktail2, name: "칵테일6", like: 60 }
];

function* searchCocktail(action) {
  const { data } = action.payload;
  try {
    // const result = yield call(searchCocktails, data.word, data.type);

    // data.cocktailArray = result;
    data.cocktailArray = dummy_data;
    yield put(searchSuccess(data));
  } catch (error) {}
}

function* _getRecommendTags() {
  try {
    // const result = yield call(getRecommendTags);
    const result = [
      "Citrus",
      "Vodka",
      "Bombay",
      "HightBall",
      "LemonSour",
      "Martini"
    ]; // 실제 서버 통신 완료 후 제거
    yield put(recommendSuccess(result));
  } catch (error) {}
}

export default function* saga() {
  yield all([
    takeLatest(actions.SEARCH.REQUEST, searchCocktail),
    takeLatest(actions.RECOMMEND.REQUEST, _getRecommendTags)
  ]);
}
