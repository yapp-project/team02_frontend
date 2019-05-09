import { all, takeLatest, call, put } from "redux-saga/effects";
import {
  actions,
  loginSuccess,
  checkIDSuccess,
  registerSuccess,
  registerFailed,
  checkIDFailed,
  dataEnd,
  dataError
} from "../action/userAction";
import {
  setJoin,
  checkID,
  setLogin,
  getMyScrap,
  getMyRecipes
} from "../api/userAPI";

const dumy_data = [
  {
    view: 0,
    scrap: 0,
    tag: ["seoul", "gangnam", "johnmat"],
    image: [],
    _id: "5c9f8336ee0dbe0d1e35418a",
    name: "jasoaaaan",
    glass: 4,
    percent: 50,
    description: "This is so delicious",
    ingredient: [
      {
        _id: "5c9f8336ee0dbe0d1e35418c",
        name: "water",
        color: "blue",
        ml: 20
      },
      {
        _id: "5c9f8336ee0dbe0d1e35418b",
        name: "hongcho",
        color: "red",
        ml: 10
      }
    ],
    owner: "maga40",
    created_date: "2019-03-30T14:54:46.795Z"
  },
  {
    view: 0,
    scrap: 0,
    tag: ["seoul", "gangnam", "johnmat", "good"],
    image: [],
    _id: "5c9f602507a46908481d23ba",
    name: "jason",
    glass: 4,
    percent: 50,
    description: "This is so delicious",
    ingredient: [
      {
        _id: "5c9f602507a46908481d23bc",
        name: "water",
        color: "blue",
        ml: 20
      },
      {
        _id: "5c9f602507a46908481d23bb",
        name: "hongcho",
        color: "red",
        ml: 10
      }
    ],
    owner: "maga40",
    created_date: "2019-03-30T12:25:09.034Z"
  },
  {
    view: 0,
    scrap: 0,
    tag: ["seoul", "gangnam", "johnmat", "good"],
    image: [],
    _id: "5c9f5b8a9cd3ae0828663875",
    name: "jason",
    glass: 4,
    percent: 50,
    description: "This is so delicious",
    ingredient: [
      {
        _id: "5c9f5b8a9cd3ae0828663877",
        name: "water",
        color: "blue",
        ml: 20
      },
      {
        _id: "5c9f5b8a9cd3ae0828663876",
        name: "hongcho",
        color: "red",
        ml: 10
      }
    ],
    owner: "maga40",
    created_date: "2019-03-30T12:05:30.337Z"
  },
  {
    view: 0,
    scrap: 0,
    tag: ["seoul", "gangnam", "johnmat"],
    image: [],
    _id: "5c9f5a5c9cd3ae082866386f",
    name: "jason",
    glass: 4,
    percent: 50,
    description: "This is so delicious",
    ingredient: [
      {
        _id: "5c9f5a5c9cd3ae0828663871",
        name: "water",
        color: "blue",
        ml: 20
      },
      {
        _id: "5c9f5a5c9cd3ae0828663870",
        name: "hongcho",
        color: "red",
        ml: 10
      }
    ],
    owner: "maga40",
    created_date: "2019-03-30T12:00:28.549Z"
  },
  {
    view: 0,
    scrap: 0,
    tag: ["seoul", "gangnam", "johnmat"],
    image: [],
    _id: "5c9f5a599cd3ae0828663869",
    name: "jason",
    glass: 4,
    percent: 50,
    description: "This is so delicious",
    ingredient: [
      {
        _id: "5c9f5a599cd3ae082866386b",
        name: "water",
        color: "blue",
        ml: 20
      },
      {
        _id: "5c9f5a599cd3ae082866386a",
        name: "hongcho",
        color: "red",
        ml: 10
      }
    ],
    owner: "maga40",
    created_date: "2019-03-30T12:00:25.082Z"
  },
  {
    view: 0,
    scrap: 0,
    tag: ["seoul", "gangnam", "johnmat"],
    image: [],
    _id: "5c9f59db01eefe08013ffa2a",
    name: "jason",
    glass: 4,
    percent: 50,
    description: "This is so delicious",
    ingredient: [
      {
        _id: "5c9f59db01eefe08013ffa2c",
        name: "water",
        color: "blue",
        ml: 20
      },
      {
        _id: "5c9f59db01eefe08013ffa2b",
        name: "hongcho",
        color: "red",
        ml: 10
      }
    ],
    owner: "maga40",
    created_date: "2019-03-30T11:58:19.440Z"
  },
  {
    view: 0,
    scrap: 0,
    tag: ["seoul", "gangnam", "johnmat"],
    image: [],
    _id: "5c9f59d401eefe08013ffa24",
    name: "jason",
    glass: 4,
    percent: 50,
    description: "This is so delicious",
    ingredient: [
      {
        _id: "5c9f59d401eefe08013ffa26",
        name: "water",
        color: "blue",
        ml: 20
      },
      {
        _id: "5c9f59d401eefe08013ffa25",
        name: "hongcho",
        color: "red",
        ml: 10
      }
    ],
    owner: "maga40",
    created_date: "2019-03-30T11:58:12.933Z"
  },
  {
    view: 0,
    scrap: 0,
    tag: ["seoul", "gangnam", "johnmat"],
    image: [],
    _id: "5c9cee751cf26064e57b5a79",
    name: "jason",
    glass: 4,
    percent: 50,
    description: "This is so delicious",
    ingredient: [
      {
        _id: "5c9cee751cf26064e57b5a7b",
        name: "water",
        color: "blue",
        ml: 20
      },
      {
        _id: "5c9cee751cf26064e57b5a7a",
        name: "hongcho",
        color: "red",
        ml: 10
      }
    ],
    owner: "maga40",
    created_date: "2019-03-28T15:55:33.325Z"
  },
  {
    view: 0,
    scrap: 0,
    tag: ["seoul", "gangnam", "johnmat"],
    image: [],
    _id: "5c9ceddba2e76464d70a9df7",
    name: "jason",
    glass: 4,
    percent: 50,
    description: "This is so delicious",
    ingredient: [
      {
        _id: "5c9ceddba2e76464d70a9df9",
        name: "water",
        color: "blue",
        ml: 20
      },
      {
        _id: "5c9ceddba2e76464d70a9df8",
        name: "hongcho",
        color: "red",
        ml: 10
      }
    ],
    owner: "maga40",
    created_date: "2019-03-28T15:52:59.166Z"
  },
  {
    view: 0,
    scrap: 0,
    tag: ["seoul", "gangnam", "johnmat"],
    image: [],
    _id: "5c9cedc3a2ae5764cbb6dcd0",
    name: "jason",
    glass: 4,
    percent: 50,
    description: "This is so delicious",
    ingredient: [
      {
        _id: "5c9cedc3a2ae5764cbb6dcd2",
        name: "water",
        color: "blue",
        ml: 20
      },
      {
        _id: "5c9cedc3a2ae5764cbb6dcd1",
        name: "hongcho",
        color: "red",
        ml: 10
      }
    ],
    owner: "maga40",
    created_date: "2019-03-28T15:52:35.797Z"
  }
];

function* requestLogin(action) {
  try {
    const { userid, password } = action.payload;
    const result = yield call(setLogin, { userid, password });
    const localData = { userid: userid, password: password };
    localStorage.setItem("myData", JSON.stringify(localData));
    yield put(loginSuccess(result));
  } catch (error) {}
}

function* requestRegister(action) {
  const { userid, password } = action.payload;
  let result;
  try {
    result = yield call(checkID, userid);
    yield put(checkIDSuccess(result));
  } catch (error) {
    yield put(checkIDFailed(false));
  }

  if (result) {
    try {
      const result = yield call(setJoin, { userid, password });
      yield put(registerSuccess(result));
    } catch (error) {
      yield put(registerFailed(false));
    }
  }
}

function* getUserData(action) {
  const { type, id } = action.payload;
  try {
    var result = [];
    if (type === 0) {
      // result = yield call(getMyScrap, id);
      result = dumy_data;
    } else if (type === 1) {
      // result = yield call(getMyRecipes, id);
      result = [];
    }
    yield put(dataEnd(type, result));
  } catch (error) {
    yield put(dataError(false));
  }
}

function logout() {
  localStorage.removeItem("myData");
}

export default function* saga() {
  yield all([
    takeLatest(actions.LOGIN.REQUEST, requestLogin),
    takeLatest(actions.REGISTER.REQUEST, requestRegister),
    takeLatest(actions.LOGIN.LOGOUT, logout),
    takeLatest(actions.COMMUNICATION.REQUEST, getUserData)
  ]);
}
