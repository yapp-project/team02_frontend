import { actions } from "../action/searchAction";
const initialState = {
  searchword: [], //검색한 word
  type: 0, //검색 type
  filter: 0, //검색 필터
  searchresult: {
    index: 0, //현재 자세히 보고 있는 게시물의 위치
    page: 0, //사용자에게 보여지고 있는 칵테일 page 위치
    pages: 0, //총 검색 결과(서버에 스크롤링 시 계속 요청)
    cocktails: [] //서버로 부터 불러온 칵테일 정보
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.SEARCH.SUCCESS: {
      const { data } = action.payload;
      return {
        ...state,
        searchword: data.word,
        type: data.type,
        filter: data.filter,
        searchresult: {
          cocktails: data.cocktailArray
        }
      };
    }
    default:
      return state;
  }
};

export default reducer;
