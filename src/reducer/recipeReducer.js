import { actions } from "../action/recipeAction";
const initialState = {
  state: "fail"
};

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
      // const photos = result[0].
      const photos = ["테스트 1", "테스트 2", "테스트 3", "테스트 4"];
      // const comments = result[0].
      const comments = [
        {nick: "닉네임 A", comments: "댓글내용 1", time: "00:00"},
        {nick: "닉네임 B", comments: "댓글내용 2", time: "11:11"},
        {nick: "닉네임 C", comments: "댓글내용 3", time: "22:22"},
        {nick: "닉네임 D", comments: "댓글내용 4", time: "12:44"}
      ];
      const recipe_info = {
        cocktail: result[0].name,
        description: result[0].description,
        nick: result[0].owner, 
        like: result[0].scrap, 
        comment: 0,
        view: result[0].view,
        tags: result[0].tag
      };

      return {
        ...state,
        state: "success",
        stuffs: stuffs,
        photos: photos,
        comments: comments,
        recipe_info: recipe_info
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
    default:
      return state;
  }
};

export default reducer;
