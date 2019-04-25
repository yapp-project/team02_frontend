export const actions = {
  ALL: {
    REQUEST: "VIEW_ALL",
    SUCCESS: "ALL_READ_SUCCESS",
    FAILED: "ALL_READ_FAILED"
  },
  BYID: {
    REQUEST: "VIEW_BY_ID",
    SUCCESS: "BY_ID_READ_SUCCESS",
    FAILED: "BY_ID_READ_FAILED"
  },
  TAGBYLATEST: {
    REQUEST: "VIEW_BY_TAG_LATEST",
    SUCCESS: "BY_TAG_LATEST_READ_SUCCESS",
    FAILED: "BY_TAG_LATEST_READ_FAILED"
  },
  TAGBYVIEW: {
    REQUEST: "VIEW_BY_TAG_VIEW",
    SUCCESS: "BY_TAG_VIEW_READ_SUCCESS",
    FAILED: "BY_TAG_VIEW_READ_FAILED"
  },
  STUFFBYLATEST: {
    REQUEST: "VIEW_BY_STUFF_LATEST",
    SUCCESS: "BY_STUFF_LATEST_READ_SUCCESS",
    FAILED: "BY_STUFF_LATEST_READ_FAILED"
  },
  STUFFBYVIEW: {
    REQUEST: "VIEW_BY_STUFF_VIEW",
    SUCCESS: "BY_STUFF_VIEWREAD_SUCCESS",
    FAILED: "BY_STUFF_VIEW_READ_FAILED"
  }
};

export function recipeAllRequest() {
  return {
    type: actions.ALL.REQUEST
  };
}

export function recipeAllSuccess(result) {
  return {
    type: actions.ALL.SUCCESS,
    payload: {
      result
    }
  };
}

export function recipeIDRequest(_id) {
  return {
    type: actions.BYID.REQUEST,
    payload: {
      _id
    }
  };
}

export function recipeIDSuccess(result) {
  return {
    type: actions.BYID.SUCCESS,
    payload: {
      result
    }
  };
}

export function recipeTagLatestRequest(tag) {
  return {
    type: actions.TAGBYLATEST.REQUEST,
    payload: {
      tag
    }
  };
}

export function recipeTagLatestSuccess(result) {
  return {
    type: actions.TAGBYLATEST.SUCCESS,
    payload: {
      result
    }
  };
}

export function recipeTagViewRequest(tag) {
  return {
    type: actions.TAGBYVIEW.REQUEST,
    payload: {
      tag
    }
  };
}

export function recipeTagViewSuccess(result) {
  return {
    type: actions.TAGBYVIEW.SUCCESS,
    payload: {
      result
    }
  };
}

export function recipeStuffLatestRequest(ingredient) {
  return {
    type: actions.STUFFBYLATEST.REQUEST,
    payload: {
      ingredient
    }
  };
}

export function recipeStuffLatestSuccess(result) {
  return {
    type: actions.STUFFBYLATEST.SUCCESS,
    payload: {
      result
    }
  };
}

export function recipeStuffViewRequest(ingredient) {
  return {
    type: actions.STUFFBYVIEW.REQUEST,
    payload: {
      ingredient
    }
  };
}

export function recipeStuffViewSuccess(result) {
  return {
    type: actions.STUFFBYVIEW.SUCCESS,
    payload: {
      result
    }
  };
}