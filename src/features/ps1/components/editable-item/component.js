import React, { useRef, useLayoutEffect } from 'react';
import { MarginBottom, LittleLine, EditableItemBottom, EditableItemBody, EditableItemRight, EditableItemLeft, EditableItemClose, EditableItemTop, EditableItemWrapper, VerticalCenter } from './styles';
import { AddOne } from '../add-one/component';
import { ColorPicker } from '../color-picker/component';
import { ACTION_ADD, ACTION_REMOVE, ACTION_MOVE, ACTION_SET_COLOR, ACTION_SET_COLOR_PICKER_OPEN, ACTION_SET_SEGMENT_PICKER_INDEX, ACTION_SET_SEGMENT_DRAGGING_INDEX } from '../../reducer';
import { getPreview } from '../../utils/transform';

export function Editable({ segment, dispatch, index, isBeingGrabbed, hideAdd, reportReference, isClosestIndex, isAfterIndex }) {
  const name = segment.id === 'space' ? '[space]' : getPreview(segment);
  const wrapperElementRef = useRef();

  const { colorPickerOpen, color } = segment;

  function onAddClick() {
    dispatch({ type: ACTION_ADD, index: index + 1 });
  }
  function onRemoveClick() {
    dispatch({ type: ACTION_REMOVE, index });
  }

  function onMoveLeft() {
    dispatch({ type: ACTION_MOVE, fromIndex: index, toIndex: index - 1 })
  }

  function onMoveRight() {
    dispatch({ type: ACTION_MOVE, fromIndex: index, toIndex: index + 1 })
  }

  function setItemColor(hue) {
    dispatch({ type: ACTION_SET_COLOR, index, color: hue });
  }
  
  function setColorPickerOpen(isOpen) {
    dispatch({ type: ACTION_SET_COLOR_PICKER_OPEN, index, isOpen });
  }

  function openSegmentPicker() {
    dispatch({ type: ACTION_SET_SEGMENT_PICKER_INDEX, index });
  }

  useLayoutEffect(() => {
    if (reportReference && wrapperElementRef.current) {
      reportReference(index, wrapperElementRef.current);
    }
  });

  return (
    <MarginBottom>
      <VerticalCenter>
        <EditableItemWrapper
          isBeingGrabbed={isBeingGrabbed}
          ref={wrapperElementRef}
          isClosestIndex={isClosestIndex}
          isAfterIndex={isAfterIndex}
        >
          <EditableItemTop>
            <EditableItemClose onClick={onRemoveClick}>✖</EditableItemClose>
            <EditableItemLeft onClick={onMoveLeft}>←</EditableItemLeft>
            <EditableItemRight onClick={onMoveRight}>→</EditableItemRight>
            <ColorPicker
              color={color}
              onColorSelection={setItemColor}
              setIsOpen={setColorPickerOpen}
              isOpen={colorPickerOpen}
            />
          </EditableItemTop>
          <EditableItemBody onClick={openSegmentPicker}>
            {name}
          </EditableItemBody>
          <EditableItemBottom
            onMouseDown={() => dispatch({ type: ACTION_SET_SEGMENT_DRAGGING_INDEX, index })}
          >
            <LittleLine />
            <LittleLine />
          </EditableItemBottom>
        </EditableItemWrapper>
        <AddOne hide={hideAdd} onClick={onAddClick} />
      </VerticalCenter>
    </MarginBottom>
  );
}