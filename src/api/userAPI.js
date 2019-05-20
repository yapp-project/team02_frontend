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

export async function getMyScrap(userid) {
  const url = ""; //서버 작업후 추가
  const body = {
    userid
  };
  const res = await webRequestUtil.post({ url, body });
  return res.data;
}

export async function getMyRecipes(userid) {
  const url = ""; //서버 작업후 추가
  const body = {
    userid
  };
  const res = await webRequestUtil.post({ url, body });
  return res.data;
}

export async function setUserEdit(userid, password, newpasswd) {
  const url = "update/password";
  const body = {
    userid,
    password,
    newpassword: newpasswd
  };
  const res = await webRequestUtil.post({ url, body });
  return res.data;
}

export async function setUserDelete(userid, password) {
  const url = "delete/account";
  const body = {
    userid,
    password
  };
  const res = await webRequestUtil.post({ url, body });
  return res.data;
}
