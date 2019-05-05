import * as webRequestUtil from "./rootAPI";

export async function enrolmentRecipe({ data }) {
  const url = "recipe";
  const body = {
    data
  };
  const res = await webRequestUtil.post({ url, body });
  return res.data;
}
