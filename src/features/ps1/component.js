/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useReducer, useRef, useState, useLayoutEffect } from 'react';
import { Editable } from './components/editable-item/component';
import { PageWrapper, BeautifulWrapper, PresentZone, PageWrapperInner, SubduedWrapper, Spacer, EditZone, EditZoneInner, ButtonGetCode } from './styles';
import { AddOne } from './components/add-one/component';
import { ACTION_ADD, reducer, initialState } from './reducer';
import { PresentTextWrapper } from './styles';
import copy from 'copy-to-clipboard';
import { getConvertedPS1, getPreview } from './utils/transform';
import { ButtonWrapper } from './styles';
import { SegmentPicker } from './components/segment-picker/component';
import { Dragged } from './components/dragged/component';

export function PS1Gen() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { segments, draggingSegmentIndex } = state;
  const [isDragging, setIsDragging] = useState(false);
  const referenceMap = useRef([]);
  const [computedPositions, setComputedPositions] = useState(null);
  const [closestIndex, setClosestIndex] = useState(null);

  function addFirst() {
    dispatch({ type: ACTION_ADD, index: 0 });
  }

  function copyCode() {
    copy(getConvertedPS1(segments));
  }

  function reportReference(index, reference) {
    referenceMap.current[index] = reference;
  }

  useLayoutEffect(() => {
    if (isDragging) {
      if (computedPositions === null) {
        setComputedPositions(referenceMap.current.map((childRef) => {
          return childRef.getBoundingClientRect();
        }));
      }
    } else {
      setComputedPositions(null);
    }
  }, [isDragging])

  return (
    <>
      <Dragged
        dispatch={dispatch}
        setIsDragging={setIsDragging}
        computedPositions={computedPositions}
        fromIndex={draggingSegmentIndex}
        reportClosestIndex={setClosestIndex}
      >
        {draggingSegmentIndex !== null &&
          <Editable
            segment={segments[draggingSegmentIndex]}
            dispatch={dispatch}
            index={draggingSegmentIndex}
            isBeingGrabbed={false}
            hideAdd={true}
          />
        }
      </Dragged>
      <PageWrapper>
        <PageWrapperInner>
          <SubduedWrapper>
            <EditZone>
              <EditZoneInner>
                {segments.length === 0 && <AddOne onClick={addFirst} />}
                {segments.map((segment, index) => {
                  return (
                    <Editable
                      key={index}
                      segment={segment}
                      dispatch={dispatch}
                      index={index}
                      isBeingGrabbed={index === state.draggingSegmentIndex}
                      reportReference={reportReference}
                      isClosestIndex={closestIndex - 1 === index}
                      hideAdd={state.draggingSegmentIndex !== null}
                    />
                  )
                })}
              </EditZoneInner>
            </EditZone>
          </SubduedWrapper>
          <Spacer />
          <BeautifulWrapper>
            <PresentZone>
              {segments.map((segment, index) => {
                return (
                  <PresentTextWrapper key={index} hue={segment ? segment.color : 0}>
                    {getPreview(segment)}
                  </PresentTextWrapper>
                )
              })}
            </PresentZone>
          </BeautifulWrapper>
          <Spacer />
          <ButtonWrapper>
            <ButtonGetCode onClick={copyCode}>
              COPY CODE TO CLIPBOARD
            </ButtonGetCode>
          </ButtonWrapper>
        </PageWrapperInner>
      </PageWrapper>
      {state.segmentPickerIndex !== null &&
        <SegmentPicker
          index={state.segmentPickerIndex}
          dispatch={dispatch}
        />
      }
    </>
  );
}