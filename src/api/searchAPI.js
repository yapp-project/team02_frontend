import * as webRequestUtil from "./rootAPI";

//검색 시 get방식인데 body로 data req가아닌 params 방식으로 해야함
export async function searchCocktails(word, type, filter, page, number) {
  let url, body;
  if (type === 0) {
    // fillter : true-1(스크랩순), false-0(최신순)
    if (filter) {
      url = "recipe/tag/view";
    } else {
      url = "recipe/tag/new";
    }
    body = {
      tag: word,
      page: page
    };
  } else {
    if (filter) {
      url = "recipe/ingredient/view";
    } else {
      url = "recipe/ingredient/new";
    }
    const start = parseInt(number.start);
    const end = parseInt(number.end);
    body = {
      ingredient: word,
      page: page,
      start,
      end
    };
  }

  const res = await webRequestUtil.get({ url, body });
  return res.data;
}

export async function getRecommendTags() {
  const url = "recipe/random";
  const res = await webRequestUtil.get({ url });
  return res.data;
}
