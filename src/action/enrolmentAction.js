export const actions = {
  ENROLMENT: {
    REQUEST: "ENROLMENT_REQUEST",
    SUCCESS: "ENROLMENT_SUCCESS",
    FAILED: "ENROLMENT_FAILED"
  }
};

export function enrolmentRequest(data) {
  return {
    type: actions.ENROLMENT.REQUEST,
    payload: {
      data
    }
  };
}

export function enrolmentSuccess(result) {
  return {
    type: actions.ENROLMENT.SUCCESS,
    payload: {
      result
    }
  };
}