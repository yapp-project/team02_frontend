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
