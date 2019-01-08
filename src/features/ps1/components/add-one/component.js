import React from 'react';
import { AddOneWrapper, AddOneInner } from './styles';

export function AddOne({ onClick, hide }) {
  return (
    <AddOneWrapper hide={hide} onClick={onClick}>
      <AddOneInner>
        ＋
      </AddOneInner>
    </AddOneWrapper>
  );
}