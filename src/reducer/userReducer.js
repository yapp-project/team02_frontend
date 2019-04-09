import { actions } from "../action/userAction";
const initialState = {
  set_auth: false,
  bRegisterResult: false,
  bIDCheckResult: false,
  bLoginResult: false
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
