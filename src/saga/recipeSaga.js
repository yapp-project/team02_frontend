import { all, call, put, takeEvery } from "redux-saga/effects";
import {
  actions,
  recipeAllSuccess,
  recipeIDSuccess,
  recipeTagLatestSuccess,
  recipeTagViewSuccess,
  recipeStuffLatestSuccess,
  recipeStuffViewSuccess
} from "../action/recipeAction";
import { 
  getRecipe,
  getRecipeByID,
  getTagByLatest,
  getTagByView,
  getStuffByLatest,
  getStuffByView
 } from "../api/recipeAPI";

function* requestAll () {
  try {
    const result = yield call(getRecipe);
    yield put(recipeAllSuccess(result));
  } catch (error) {}
}

function* requestRecipeByID(action) {
  const { id } = action.payload;
  try {
    const result = yield call(getRecipeByID, {id});
    yield put(recipeIDSuccess(result));
  } catch (error) {}
}

function* requestRecipeTagByLatest(action) {
  const { tag } = action.payload;
  try {
    const result = yield call(getTagByLatest, tag);
    yield put(recipeTagLatestSuccess(result));
  } catch (error) {}
}

function* requestRecipeTagByView(action) {
  const { tag } = action.payload;
  try {
    const result = yield call(getTagByView, tag);
    yield put(recipeTagViewSuccess(result));
  } catch (error) {}
}

function* requestRecipeStuffByLatest(action) {
  const { ingredient } = action.payload;
  try {
    const result = yield call(getStuffByLatest, ingredient);
    yield put(recipeStuffLatestSuccess(result));
  } catch (error) {}
}

function* requestRecipeStuffByView(action) {
  const { ingredient } = action.payload;
  try {
    const result = yield call(getStuffByView, ingredient);
    yield put(recipeStuffViewSuccess(result));
  } catch (error) {}
}

export default function* saga() {
  yield all([
    takeEvery(actions.ALL.REQUEST, requestAll),
    takeEvery(actions.BYID.REQUEST, requestRecipeByID),
    takeEvery(actions.TAGBYLATEST.REQUEST, requestRecipeTagByLatest),
    takeEvery(actions.TAGBYVIEW.REQUEST, requestRecipeTagByView),
    takeEvery(actions.STUFFBYLATEST.REQUEST, requestRecipeStuffByLatest),
    takeEvery(actions.STUFFBYVIEW.REQUEST, requestRecipeStuffByView)
  ]);
}
