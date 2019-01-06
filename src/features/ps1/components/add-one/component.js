import React from 'react';
import { AddOneWrapper, AddOneInner } from './styles';

export function AddOne({ onClick }) {
  return (
    <AddOneWrapper onClick={onClick}>
      <AddOneInner>
        ＋
      </AddOneInner>
    </AddOneWrapper>
  );
}