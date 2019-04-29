import * as webRequestUtil from "./rootAPI";

//검색 시 get방식인데 body로 data req가아닌 params 방식으로 해야함
export async function searchCocktails(word, type) {
  let url, body;
  if (type === 0) {
    url = "recipe/tag/view";
    body = JSON.stringify({
      tag: word
    });
  } else {
    url = "recipe/ingredient/view";
  }

  const res = await webRequestUtil.get({ url, body });
  return res.data;
}