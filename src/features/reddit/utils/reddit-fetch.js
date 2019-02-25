import { useFetchJson } from "../../../utils/fetch";

export function useSubredditData({ subreddit }) {
  return useFetchJson(`https://www.reddit.com/r/${subreddit}/hot.json`, !!subreddit);
}
export function useCommentData({ subreddit, post }) {
  let postId = post && post.data && post.data.id;
  if (!postId) {
    return null;
  }

  const fetchedData = useFetchJson(`https://www.reddit.com/r/${subreddit}/comments/${postId}.json`, !!postId);

  if (!fetchedData) {
    return null;
  }

  return fetchedData[1].data.children;
}