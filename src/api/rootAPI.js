import axios from "axios";

const SERVER_END_POINT = ""; //SERVER URL
const basicRequest = (type, { url, headers, body }) => {
  const config = {
    method: type,
    url: SERVER_END_POINT + url,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...headers
    }
  };

  if (type === "GET") config.params = body;
  else config.data = body;

  return axios(config)
    .then(res => {
      return res;
    })
    .catch(err => {
      throw err.response;
    });
};

export const get = ({ url, headers, body }) => {
  return basicRequest("GET", { url, headers, body });
};

export const post = ({ url, headers, body, data }) => {
  return basicRequest("POST", { url, headers, body, data });
};

export const del = ({ url, headers, body }) => {
  return basicRequest("DELETE", { url, headers, body });
};

export const put = ({ url, headers, body }) => {
  return basicRequest("PUT", { url, headers, body });
};
