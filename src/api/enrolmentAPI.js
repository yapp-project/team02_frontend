import * as webRequestUtil from "./rootAPI";

export async function enrolmentRecipe({ data }) {
  const url = "recipe";
  const body = {
    data
  };
  console.log(body);
  const res = await webRequestUtil.post({ url, body });
  return res.data;
}