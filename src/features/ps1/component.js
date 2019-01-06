/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useReducer } from 'react';
import { Editable } from './components/editable-item/component';
import { PageWrapper, BeautifulWrapper, PresentZone, PageWrapperInner, SubduedWrapper, Spacer, EditZone, EditZoneInner, ButtonGetCode } from './styles';
import { AddOne } from './components/add-one/component';
import { ACTION_ADD, reducer, initialState } from './reducer';
import { PresentTextWrapper } from './styles';
import { SEGMENT_DATA } from './utils/segments';
import copy from 'copy-to-clipboard';
import { getConvertedPS1 } from './utils/transform';
import { ButtonWrapper } from './styles';
import { SegmentPicker } from './components/segment-picker/component';

export function PS1Gen() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { segments } = state;

  function addFirst() {
    dispatch({ type: ACTION_ADD, index: 0 })
  }

  function copyCode() {
    copy(getConvertedPS1(segments), {
      debug: true,
      message: 'Press #{key} to copy',
    });
  }

  return (
    <>
      <PageWrapper>
        <PageWrapperInner>
          <SubduedWrapper>
            <EditZone>
              <EditZoneInner>
                {segments.length === 0 && <AddOne onClick={addFirst} />}
                {segments.map((segment, index) => {
                  return (
                    <Editable
                      key={Math.random()}
                      color={segment.color}
                      colorPickerOpen={segment.colorPickerOpen}
                      segmentId={segment.id}
                      dispatch={dispatch}
                      index={index}
                    />
                  )
                })}
              </EditZoneInner>
            </EditZone>
          </SubduedWrapper>
          <Spacer />
          <BeautifulWrapper>
            <PresentZone>
              {segments.map((segment) => {
                const isSpace = segment.id === 'space';

                return (
                  <PresentTextWrapper key={Math.random()} hue={segment.color}>
                    {isSpace ? <span>&nbsp;</span> : SEGMENT_DATA[segment.id].example}
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