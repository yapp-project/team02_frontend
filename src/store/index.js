/**
 * @author AnGwangHo
 * @description set Reducer, redux-saga, redux-logger
 */
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga"; //middleware

import { createLogger } from "redux-logger"; // redux log
import rootReducer from "../reducer/rootReducer"; //redux index.js
import rootSaga from "../saga/rootSaga"; //saga index.js

const loggerMiddleware = createLogger();
const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware, loggerMiddleware)
);
sagaMiddleware.run(rootSaga);

export default store;
