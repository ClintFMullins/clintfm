import React from 'react';
import styled from 'styled-components';
import { useCommentData } from '../../utils/reddit-fetch';
import ReactMarkdown from 'react-markdown';

const CommentsWrapper = styled.div`
  background: lightblue;
  flex-basis: 50%;
  overflow: scroll;
  overflow-y: scroll;
`;

const Comment = styled.div`
  border-left: solid 2px grey;
  margin: 0.5rem;
  padding: 0 0.5rem;
`;

export function PostComments({ subreddit, post }) {
  const comments = useCommentData({ subreddit, post });

  if (!comments) {
    return (
      <CommentsWrapper>
        LOADING
      </CommentsWrapper>
    )
  }

  return (
    <CommentsWrapper>
      {comments.map((commentData) => {
        return (
          <Comment key={commentData.data.id}>
            <ReactMarkdown>
              {commentData.data.body}
            </ReactMarkdown>
          </Comment>
        );
      })}
    </CommentsWrapper>
  )
}
