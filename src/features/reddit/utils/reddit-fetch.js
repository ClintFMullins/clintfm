import { useFetchJson } from "../../../utils/fetch";

export function useSubredditData({ subreddit }) {
  return useFetchJson(`https://www.reddit.com/r/${subreddit}/hot.json`, !!subreddit);
}
export function useCommentData({ post }) {
  let url = null;

  if (post && post.data && post.data.url) {
    url = post.data.url;
  }

  const fetchedData = useFetchJson(`${url}.json`, !!url);

  if (!fetchedData) {
    return null;
  }

  return fetchedData[1].data.children;
}