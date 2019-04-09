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

export function logout() {
  return {
    type: actions.LOGIN.LOGOUT
  };
}
