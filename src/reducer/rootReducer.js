/**
 * @author AnGwangHo
 * @description similar to index.js, combine Reducer
 */
import { combineReducers } from "redux";
import userReducer from "./userReducer";
import searchReducer from "./searchReducer";
import recipeReducer from "./recipeReducer";
import enrolmentReducer from "./enrolmentReducer";

export default combineReducers({ userReducer, searchReducer, recipeReducer, enrolmentReducer });
