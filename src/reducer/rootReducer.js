/**
 * @author AnGwangHo
 * @description similar to index.js, combine Reducer
 */
import { combineReducers } from "redux";
import userReducer from "./userReducer";
import searchReducer from "./searchReducer";

export default combineReducers({ userReducer, searchReducer });
