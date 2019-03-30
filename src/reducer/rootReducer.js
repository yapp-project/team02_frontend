/**
 * @author AnGwangHo
 * @description similar to index.js, combine Reducer
 */
import { combineReducers } from "redux";
import userReducer from "./userReducer";

export default combineReducers({ userReducer });
