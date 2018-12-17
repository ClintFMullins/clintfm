import styled from 'styled-components';

export const RhymesPreview = styled.div`
  background: ghostwhite;
  width: 100%;
  height: 100%;
  border-radius: 100%;
  overflow: hidden;
`

export const RhymeLine = styled.div`
  width: 100%;
  height: 2.5%;
  background-color: #B3B6B7;
  margin-bottom: 8px;
  opacity: 0.5;
  transition: opacity ease-out 10ms;

  :hover {
    opacity: 1;
  }
`