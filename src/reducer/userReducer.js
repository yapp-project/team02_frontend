import { actions } from "../action/userAction";
const initialState = {
  set_auth: false,
  bRegisterResult: false,
  bIDCheckResult: false,
  bLoginResult: false,
  mymenu: {
    scrap: [],
    recipes: [],
    bRecipeDelete: false
  },
  user: {
    state: "none",
    checkID: false
  },
  bModifyUser: false,
  bUserDelete: false,
  scrap: { status: "", result: false }
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
    case actions.IDCHECK.REQUEST: {
      return {
        ...state,
        user: {
          ...state.user,
          state: action.type
        }
      };
    }
    case actions.IDCHECK.SUCCESS: {
      const { result } = action.payload;
      return {
        ...state,
        bIDCheckResult: result,
        user: {
          state: action.type,
          checkID: result
        }
      };
    }
    case actions.IDCHECK.FAILED: {
      const { result } = action.payload;
      return {
        ...state,
        bIDCheckResult: result,
        user: {
          ...state.user,
          state: action.type
        }
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
      } else if (type === 2) {
        return {
          ...state,
          mymenu: {
            ...state.mymenu,
            bRecipeDelete: result
          }
        };
      } else if (type === 3) {
        return {
          ...state,
          scrap: { result: result.result, status: result.status }
        };
      }
      return {
        ...state
      };
    }
    case actions.COMMUNICATION.ERROR: {
      const { type, result } = action.payload;
      if (type === 0) {
        return {
          ...state,
          mymenu: {
            ...state.mymenu,
            scrap: []
          }
        };
      } else if (type === 1) {
        return {
          ...state,
          mymenu: {
            ...state.mymenu,
            recipes: []
          }
        };
      } else if (type === 2) {
        return {
          ...state,
          mymenu: {
            ...state.mymenu,
            bRecipeDelete: result
          }
        };
      } else if (type === 3) {
        return {
          ...state,
          scrap: { result: result.result, status: result.status }
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
    case actions.USEREDIT.SUCCESS: {
      return {
        ...state,
        bModifyUser: true
      };
    }
    case actions.USEREDIT.FAILED: {
      return {
        ...state,
        bModifyUser: false
      };
    }
    case actions.USERDELETE.SUCCESS: {
      return {
        ...state,
        bUserDelete: true,
        set_auth: false,
        bLoginResult: false
      };
    }
    default:
      return state;
  }
};

export default reducer;
