import { actions } from "../action/userAction";
const initialState = {
  me: null,
  bRegisterResult: false,
  bLoginResult: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.LOGIN.SUCCESS: {
      const { result } = action.payload;
      return {
        ...state,
        bLoginResult: result
      };
    }
    case actions.IDCHECK.SUCCESS: {
      const { userid } = action.payload;
      return {
        ...state,
        userid
      };
    }
    case actions.REGISTER.SUCCESS: {
      const { result } = action.payload;
      return {
        ...state,
        bRegisterResult: result
      };
    }
    default:
      return state;
  }
};

export default reducer;
