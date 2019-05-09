import { actions } from "../action/userAction";
const initialState = {
  set_auth: false,
  bRegisterResult: false,
  bIDCheckResult: false,
  bLoginResult: false,
  mymenu: {
    scrap: [],
    recipes: []
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.LOGIN.SUCCESS: {
      const { result } = action.payload;
      return {
        ...state,
        set_auth: true,
        bLoginResult: result
      };
    }
    case actions.IDCHECK.SUCCESS: {
      const { result } = action.payload;
      return {
        ...state,
        bIDCheckResult: result
      };
    }
    case actions.IDCHECK.FAILED: {
      const { result } = action.payload;
      return {
        ...state,
        bIDCheckResult: result
      };
    }
    case actions.REGISTER.SUCCESS: {
      const { result } = action.payload;
      return {
        ...state,
        bRegisterResult: result
      };
    }
    case actions.COMMUNICATION.END: {
      const { type, result } = action.payload;
      if (type === 0) {
        return {
          ...state,
          mymenu: {
            ...state.mymenu,
            scrap: result
          }
        };
      } else if (type === 1) {
        return {
          ...state,
          mymenu: {
            ...state.mymenu,
            recipes: result
          }
        };
      }
      return {
        ...state
      };
    }
    case actions.LOGIN.LOGOUT: {
      return {
        ...state,
        set_auth: false,
        bLoginResult: false
      };
    }
    default:
      return state;
  }
};

export default reducer;
