export const actions = {
  LOGIN: {
    REQUEST: "LOGIN_REQUEST",
    SUCCESS: "LOGIN_SUCCESS",
    FAILED: "LOGIN_FAILED"
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

export function checkIDRequest(userid) {
  return {
    type: actions.IDCHECK.REQUEST,
    payload: {
      userid
    }
  };
}
export function checkIDSuccess(bIDCheck) {
  return {
    type: actions.IDCHECK.SUCCESS,
    payload: {
      IDCheck: bIDCheck
    }
  };
}
