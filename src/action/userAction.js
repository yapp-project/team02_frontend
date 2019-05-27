export const actions = {
  COMMUNICATION: {
    REQUEST: "COMMUNICATION_REQUEST",
    ING: "COMMUNICATION_ING",
    END: "COMMUNICATION_END",
    ERROR: "COMMUNICATION_ERROR"
  },
  LOGIN: {
    REQUEST: "LOGIN_REQUEST",
    SUCCESS: "LOGIN_SUCCESS",
    FAILED: "LOGIN_FAILED",
    LOGOUT: "LOGIN_LOGOUT"
  },
  IDCHECK: {
    REQUEST: "IDCHECK_REQUEST",
    SUCCESS: "IDCHECK_SUCCESS",
    FAILED: "IDCHECK_FAILED"
  },
  REGISTER: {
    REQUEST: "REGISTER_REQUEST",
    SUCCESS: "REGISTER_SUCCESS",
    FAILED: "REGISTER_FAILED"
  },
  USEREDIT: {
    REQUEST: "USEREDIT_REQUEST",
    SUCCESS: "USEREDIT_SUCCESS",
    FAILED: "USEREDIT_FAILED"
  },
  USERDELETE: {
    REQUEST: "USERDELETE_REQUEST",
    SUCCESS: "USERDELETE_SUCCESS",
    FAILED: "USERDELETE_FAILED"
  }
};

export function loginRequest(userid, password) {
  return {
    type: actions.LOGIN.REQUEST,
    payload: {
      userid,
      password
    }
  };
}

export function loginSuccess(result) {
  return {
    type: actions.LOGIN.SUCCESS,
    payload: {
      result
    }
  };
}

export function registerRequest(userid, password) {
  return {
    type: actions.REGISTER.REQUEST,
    payload: {
      userid,
      password
    }
  };
}

export function registerSuccess(result) {
  return {
    type: actions.REGISTER.SUCCESS,
    payload: {
      result
    }
  };
}
export function registerFailed(result) {
  return {
    type: actions.REGISTER.FAILED,
    payload: {
      result
    }
  };
}

export function checkIDRequest(userid) {
  return {
    type: actions.IDCHECK.REQUEST,
    payload: {
      userid
    }
  };
}
export function checkIDSuccess(result) {
  return {
    type: actions.IDCHECK.SUCCESS,
    payload: {
      result
    }
  };
}
export function checkIDFailed(result) {
  return {
    type: actions.IDCHECK.FAILED,
    payload: {
      result
    }
  };
}

export function dataRequest({ type, data }) {
  return {
    type: actions.COMMUNICATION.REQUEST,
    payload: {
      type,
      data
    }
  };
}
export function dataError(result) {
  return {
    type: actions.COMMUNICATION.ERROR,
    payload: {
      result
    }
  };
}
export function dataEnd(type, result) {
  return {
    type: actions.COMMUNICATION.END,
    payload: {
      type,
      result
    }
  };
}

export function usereditRequest(type, id) {
  return {
    type: actions.USEREDIT.REQUEST,
    payload: {
      type,
      id
    }
  };
}
export function usereditSuccess(result) {
  return {
    type: actions.USEREDIT.SUCCESS,
    payload: {
      result
    }
  };
}
export function usereditFailed(type, result) {
  return {
    type: actions.USEREDIT.FAILED,
    payload: {
      type,
      result
    }
  };
}

export function userDeleteRequest(type, id) {
  return {
    type: actions.USERDELETE.REQUEST,
    payload: {
      type,
      id
    }
  };
}

export function userDeleteSuccess(result) {
  return {
    type: actions.USERDELETE.SUCCESS,
    payload: {
      result
    }
  };
}
export function userDeleteFailed(type, result) {
  return {
    type: actions.USERDELETE.FAILED,
    payload: {
      type,
      result
    }
  };
}

export function logout() {
  return {
    type: actions.LOGIN.LOGOUT
  };
}
