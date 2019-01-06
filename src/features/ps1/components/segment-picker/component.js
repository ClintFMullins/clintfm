import React from 'react';
import styled from 'styled-components';
import { SEGMENT_DATA } from '../../utils/segments';
import { ACTION_SET_SEGMENT } from '../../reducer';

const SegmentPickerWrapper = styled.div`
    position: fixed;
    z-index: 20;
    width: 500px;
    max-width: 96%;
    max-height: 80%;
    overflow: scroll;
    margin: 0 auto;
    background: #e1e3fbab;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    border: 5px solid #809cf0;
    border-radius: 3px;
    padding: 20px;
`;

const SegmentPreview = styled.div`
  background: black;
  color: ghostwhite;
  padding: 10px 15px;
  margin: 5px;
  box-sizing: content-box;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
`;

export function SegmentPicker({ index, dispatch }) {
  return (
    <SegmentPickerWrapper>
      {Object.keys(SEGMENT_DATA).map((segmentId) => {
        const segment = SEGMENT_DATA[segmentId];

        function selectSegment() {
          dispatch({ type: ACTION_SET_SEGMENT, index, segmentId })
        }
        
        return (
          <SegmentPreview onClick={selectSegment}>
            <div>{segmentId}</div>
            <div>{segment.example}</div>
          </SegmentPreview>
        );
      })}
    </SegmentPickerWrapper>
  );
}