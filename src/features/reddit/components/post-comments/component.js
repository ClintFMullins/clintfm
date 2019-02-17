import React from 'react';
import styled from 'styled-components';
import { useCommentData } from '../../utils/reddit-fetch';

const CommentsWrapper = styled.div`
  background: lightblue;
  flex-basis: 50%;
  overflow: scroll;
`;

export function PostComments({ post }) {
  const comments = useCommentData({ post });

  if (!comments) {
    return (
      <CommentsWrapper>
        LOADING
      </CommentsWrapper>
    )
  }

  console.log(comments)

  return (
    <CommentsWrapper>
      {comments.map((commentData) => {
        return <div style={{ margin: '1rem' }}>{commentData.data.body}</div>;
      })}
    </CommentsWrapper>
  )
}

// http://www.reddit.com/r/" + sub + "/comments/" + id + ".json?"