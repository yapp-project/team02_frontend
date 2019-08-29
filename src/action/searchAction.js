export const actions = {
  COMMUNICATION: {
    REQUEST: "COMMUNICATION_REQUEST",
    ING: "COMMUNICATION_ING",
    END: "COMMUNICATION_END",
    ERROR: "COMMUNICATION_ERROR"
  },
  SEARCH: {
    REQUEST: "SEARCH_REQUEST",
    SUCCESS: "SEARCH_SUCCESS",
    FAILED: "SEARCH_FAILED",
    TAG: "SEARCH_TAG",
    MATERIAL: "SEARCH_MATERIAL"
  },
  RECOMMEND: {
    REQUEST: "RECOMMEND_REQUEST",
    SUCCESS: "RECOMMEND_SUCCESS",
    FAILED: "RECOMMEND_FAILED"
  }
};

export function searchRequest(data) {
  return {
    type: actions.SEARCH.REQUEST,
    payload: {
      data
    }
  };
}

export function searchSuccess(data) {
  return {
    type: actions.SEARCH.SUCCESS,
    payload: {
      data
    }
  };
}

export function recommendRequest() {
  return {
    type: actions.RECOMMEND.REQUEST
  };
}
export function recommendSuccess(data) {
  return {
    type: actions.RECOMMEND.SUCCESS,
    payload: {
      data
    }
  };
}

export function recommendFailed(data) {
  return {
    type: actions.RECOMMEND.FAILED,
    payload: {
      data
    }
  };
}
