/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react';
import { Editable } from './components/editable-item/component';
import { PageWrapper, BeautifulWrapper, PresentZone, PageWrapperInner, SubduedWrapper, Spacer, EditZone, EditZoneInner } from './styles';

export function PS1Gen() {
  return (
    <PageWrapper>
      <PageWrapperInner>
        <SubduedWrapper>
          <EditZone>
            <EditZoneInner>
              <Editable />
              <Editable />
              <Editable />
              <Editable />
            </EditZoneInner>
          </EditZone>
        </SubduedWrapper>
        <Spacer />
        <BeautifulWrapper>
          <PresentZone>
            clint [Wed Jan 02 20:21:30] [master ?] 👉
          </PresentZone>
        </BeautifulWrapper>
      </PageWrapperInner>
    </PageWrapper>
  );
}