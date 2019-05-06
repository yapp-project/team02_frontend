import { actions } from "../action/enrolmentAction";
const initialState = {
  state: "fail"
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.ENROLMENT.SUCCESS: {
      const { result } = action.payload;
      
      return {
        ...state,
        result,
        state: "success"
      };
    }
    default:
      return state;
  }
};

export default reducer;
