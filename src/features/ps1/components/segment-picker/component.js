import React, { useState } from 'react';
import styled from 'styled-components';
import { SEGMENT_DATA } from '../../utils/segments';
import { ACTION_SET_SEGMENT, ACTION_SET_SEGMENT_CUSTOM, ACTION_SET_SEGMENT_PICKER_INDEX } from '../../reducer';
import { useFocusOnLoad } from '../../../../utils/dom';
import { EMOJI_LIST } from '../../../../utils/emoji-list';

const SegmentPickerModalCloser = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 20;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0,0,0,0.2);
  cursor: zoom-out;
`;

const SegmentPickerWrapper = styled.div`
  width: 500px;
  max-width: 96%;
  max-height: 80%;
  overflow: scroll;
  background: #e1e3fbf5;
  border: 7px solid #89528c69;
  padding: 20px;
  border-radius: 5px;
  cursor: auto;
  ${props => (
    props.isPickingEmoji && `
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    `
  )}
`;

const SegmentOption = styled.div`
  margin: 5px;
  box-sizing: content-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  border: solid 1px black;
  border-radius: 3px;
  opacity: 0.65;

  :hover {
    opacity: 1;
  }
`;

const Name = styled.div`
  padding-left: 15px;
`;

const Preview = styled.div`
  background: black;
  color: ghostwhite;
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
  width: 40%;
  text-align: right;
  height: 40px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 15px;
`;

const WriteIn = styled.input`
  height: 40px;
  outline: none;
  background-color: rgba(0,0,0,0);
  font-size: 16px;
  width: 60%;
  padding-left: 15px;
  border: none;
`;

const Emoji = styled.div`
  padding: 2px 5px;
  margin: 0 2px 2px 0;
  display: inline-block;
  border-radius: 3px;
  cursor: pointer;

  :hover {
    background: rgba(0,0,0,.1);
  }
`;

function useInputValue(initialValue = '') {
  const [value, setValue] = useState(initialValue);

  function onChange(event) {
    setValue(event.currentTarget.value)
  }

  return {value, onChange};
}

export function SegmentPicker({ index, dispatch }) {
  const { value: writeInValue, onChange } = useInputValue('custom text...');
  const { ref } = useFocusOnLoad({ select: true });
  const [isPickingEmoji, setIsPickingEmoji] = useState(false);

  let content;

  if (isPickingEmoji) {
    content = EMOJI_LIST.map((emoji, emojiIndex) => {
      function setEmoji() {
        dispatch({ type: ACTION_SET_SEGMENT_CUSTOM, index, customText: emoji })
      }

      return (
        <Emoji key={emojiIndex} onClick={setEmoji}>{emoji}</Emoji>
      );
    });
  } else {
    function setWriteIn() {
      dispatch({ type: ACTION_SET_SEGMENT_CUSTOM, index, customText: writeInValue })
    }

    content = (
      <>
        <SegmentOption onClick={setWriteIn}>
          <WriteIn
            ref={ref}
            onChange={onChange}
            value={writeInValue}
          />
          <Preview>{writeInValue}</Preview>
        </SegmentOption>
        <SegmentOption onClick={() => setIsPickingEmoji(true)}>
          <Name>{'emojiPicker'}</Name>
          <Preview>{"🐑"}</Preview>
        </SegmentOption>

        {Object.keys(SEGMENT_DATA).map((segmentId) => {
          const segment = SEGMENT_DATA[segmentId];

          function selectSegment() {
            dispatch({ type: ACTION_SET_SEGMENT, index, segmentId })
          }
          
          return (
            <SegmentOption key={segmentId} onClick={selectSegment}>
              <Name>{segmentId}</Name>
              <Preview>{segment.example}</Preview>
            </SegmentOption>
          );
        })}
      </>
    );
  }

  return (
    <SegmentPickerModalCloser onClick={() => dispatch({ type: ACTION_SET_SEGMENT_PICKER_INDEX, index: null })}>
      <SegmentPickerWrapper onClick={(event) => event.stopPropagation()} isPickingEmoji={isPickingEmoji}>
        {content}
      </SegmentPickerWrapper>
    </SegmentPickerModalCloser>
  );
}