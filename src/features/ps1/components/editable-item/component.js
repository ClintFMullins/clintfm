import React from 'react';
import { MarginBottom, LittleLine, EditableItemBottom, EditableItemBody, EditableItemColorInner, EditableItemColor, EditableItemRight, EditableItemLeft, EditableItemClose, EditableItemTop, EditableItemWrapper, VerticalCenter } from './styles';
import { AddOne } from '../add-one/component';

export function Editable() {
  return (
    <MarginBottom>
      <VerticalCenter>
        <EditableItemWrapper>
          <EditableItemTop>
            <EditableItemClose>✖</EditableItemClose>
            <EditableItemLeft>←</EditableItemLeft>
            <EditableItemRight>→</EditableItemRight>
            <EditableItemColor>
              <EditableItemColorInner>

              </EditableItemColorInner>
            </EditableItemColor>
          </EditableItemTop>
          <EditableItemBody>
            [space]
          </EditableItemBody>
          <EditableItemBottom>
            <LittleLine />
            <LittleLine />
          </EditableItemBottom>
        </EditableItemWrapper>
        <AddOne />
      </VerticalCenter>
    </MarginBottom>
  );
}