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
  },
  recommend: {
    tags: [], //MainPage 추천 태그
    result: [] //태그 검색 결과
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.SEARCH.SUCCESS: {
      const { data } = action.payload;
      if (data.recommend) {
        return {
          ...state,
          recommend: {
            ...state.recommend,
            result: data.cocktailArray
          }
        };
      } else {
        return {
          ...state,
          searchword: data.word,
          type: data.type,
          filter: data.filter,
          searchresult: {
            ...state.searchresult,
            cocktails: data.cocktailArray,
            page: data.page,
            pages: data.pages
          }
        };
      }
    }
    case actions.RECOMMEND.SUCCESS: {
      const { data } = action.payload;
      return {
        ...state,
        recommend: {
          ...state.recommend,
          tags: data
        }
      };
    }
    default:
      return state;
  }
};

export default reducer;
