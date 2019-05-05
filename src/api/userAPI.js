import * as webRequestUtil from "./rootAPI";

export async function setJoin({ userid, password }) {
  const url = "user/join";

  const body = {
    userid,
    password
  };
  const res = await webRequestUtil.post({ url, body });
  console.log(res);
  return res.data;
}
export async function setLogin({ userid, password }) {
  const url = "user/login";

  const body = {
    userid,
    password
  };
  const res = await webRequestUtil.post({ url, body });
  return res.data;
}

export async function checkID(userid) {
  const url = "user/join/check/id";
  const body = {
    userid
  };
  const res = await webRequestUtil.post({ url, body });
  return res.data;
}
