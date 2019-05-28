import { actions } from "../action/recipeAction";
const initialState = {
  state: "fail"
};
//여기 같은 경우에 레시피 관련 모든 api 를 묶어놔서
//어떤 결과냐에 따라 결과 리턴값이 달라서 공통인 state 에 대해서만 일단 만들어뒀어용
//예를들어, ID 를 통해 1개만 검색, 레시피 모두 검색 -> 이 두가지의 경우 배열로 받거나 1개만 받거나 등의 차이가 발생하니까요
//enrolmentReducer도 같구요!

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.ALL.SUCCESS: {
      const { result } = action.payload;
      return {
        bAllRecipeResult: result
      };
    }
    case actions.BYID.SUCCESS: {
      const { result } = action.payload;

      const stuffs = result[0].ingredient;
      const photos = result[0].image;
      // const comments = [
      //   {nick: "닉네임 A", comments: "댓글내용 1", time: "00:00"},
      //   {nick: "닉네임 B", comments: "댓글내용 2", time: "11:11"},
      //   {nick: "닉네임 C", comments: "댓글내용 3", time: "22:22"},
      //   {nick: "닉네임 D", comments: "댓글내용 4", time: "12:44"}
      // ];
      const comments = result[0].comment;
      const recipe_info = {
        cocktail: result[0].name,
        description: result[0].description,
        nick: result[0].owner, 
        like: result[0].scrap, 
        comment: 0,
        view: result[0].view,
        tags: result[0].tag,
        alcohol: result[0].numIngredient,
        glass: result[0].glass
      };

      return {
        ...state,
        state: "success",
        stuffs: stuffs,
        photos: photos,
        comment: comments,
        recipe_info: recipe_info,
      };
    }
    case actions.TAGBYLATEST.SUCCESS: {
      const { result } = action.payload;
      return {
        bIDCheckResult: result
      };
    }
    case actions.TAGBYVIEW.SUCCESS: {
      const { result } = action.payload;
      return {
        bIDCheckResult: result
      };
    }
    case actions.STUFFBYLATEST.SUCCESS: {
      const { result } = action.payload;
      return {
        bIDCheckResult: result
      };
    }
    case actions.STUFFBYVIEW.SUCCESS: {
      const { result } = action.payload;
      return {
        bIDCheckResult: result
      };
    }

    case actions.ADDCOMMENT.SUCCESS: {
      const { result } = action.payload;

      if (result.ok === 1) {
        return {
          ...state,
          state: "success",
        };
      } else return {...state};
      
    }
    default:
      return state;
  }
};

export default reducer;
