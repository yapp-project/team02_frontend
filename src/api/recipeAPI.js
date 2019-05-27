import * as webRequestUtil from "./rootAPI";

export async function getRecipe() {
  const url = "recipe";
  const res = await webRequestUtil.get({ url });
  return res.data;
}

export async function getRecipeByID({id}) {
  const url = "recipe/details";
  const body = {
    id
  };
  
  const res = await webRequestUtil.get({ url, body });
  return res.data;
}

export async function getTagByLatest({tag}) {
  const url = "recipe/tag/new";
  const body = {
    tag
  };
  const res = await webRequestUtil.get({ url, body });
  return res.data;
}

export async function getTagByView({tag}) {
  const url = "recipe/tag/view";
  const body = {
    tag
  };
  const res = await webRequestUtil.get({ url, body });
  return res.data;
}

export async function getStuffByLatest({ingredient}) {
  const url = "recipe/ingredient/new";
  const body = {
    ingredient
  };
  const res = await webRequestUtil.get({ url, body });
  return res.data;
}

export async function getStuffByView({ingredient}) {
  const url = "recipe/ingredient/view";
  const body = {
    ingredient
  };
  const res = await webRequestUtil.get({ url, body });
  return res.data;
}

export async function addComment({ data }) {
  const url = "recipe/comment";
  const body = {
    data
  };
  const res = await webRequestUtil.post({ url, body });
  return res.data;
}