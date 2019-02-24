import React from 'react';
import styled from 'styled-components';
import { useCommentData } from '../../utils/reddit-fetch';
import ReactMarkdown from 'react-markdown';
import { DARK_BACKGROUND, FOREGROUND } from '../../utils/color-themes';

const CommentsWrapper = styled.div`
  background: ${DARK_BACKGROUND};
  flex-basis: 40%;
  overflow: scroll;
  overflow-y: scroll;
  color: ${FOREGROUND};
  padding: 1rem;
`;

const Comment = styled.div`
  position: relative;
  border-left: solid 3px #202531;
  border-bottom: ${props => props.isLast ? 'none' : 'solid 2px #182135'};
  margin: 1rem 0rem ${props => props.marginBottom}rem -0.3rem;
  padding: 0.5rem 0 0 0.5rem;
  border-radius: 4px;
  background: rgba(4, 6, 21, 0.4);
  font-size: 0.9rem;
  border-bottom-left-radius: ${props => props.isLast ? 0 : 4}px;
`;

const CommentInner = styled.div`
  padding-bottom: 0.5rem;
`;

const CommentAuthor = styled.div`
  position: absolute;
  top: -8px;
  left: 8px;
  font-size: 11px;
`;

const Title = styled.div`
  font-size: 1.6rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

export function PostComments({ subreddit, post }) {
  const comments = useCommentData({ subreddit, post });

  if (!comments) {
    return (
      <CommentsWrapper>
        <Title>Comments</Title>
        LOADING
      </CommentsWrapper>
    )
  }

  return (
    <CommentsWrapper>
      <Title>Comments</Title>
      {comments.map((commentData) => {
        return <CommentComponent data={commentData.data} isTop={true} />
      })}
    </CommentsWrapper>
  )
}

function CommentComponent({ data, isTop, isLast }) {
  const { id, body, author, replies } = data;
  const moreComments = replies && replies.data && replies.data.children;
  const filteredComments = moreComments && moreComments.filter((comment) => comment.kind === 't1');
  const commentMargin = (isTop) ? 1.5 : 0;

  return (
    <Comment key={id} marginBottom={commentMargin} isLast={isLast}>
      <CommentAuthor>{author}</CommentAuthor>
      <CommentInner>
        <ReactMarkdown>
          {body}
        </ReactMarkdown>
      </CommentInner>
      {filteredComments && 
        filteredComments.map((comment, index) => {
          const isLast = index === filteredComments.length - 1;

          return <CommentComponent data={comment.data} isLast={isLast} />
        })
      }
    </Comment>
  );
}
