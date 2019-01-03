import styled from 'styled-components';

const color = '#00000075';
const textColor = '#000001a3';

export const AddOneWrapper = styled.div`
  display: inline-block;
  border: ${color} 2px solid;
  border-radius: 3px;
  height: 20px;
  width: 20px;
  margin-right: 8px;
  color: ${textColor};
  cursor: pointer;
  opacity: 0.6;
  box-sizing: content-box;
  
  :hover {
    opacity: 1;
  }
`;

export const AddOneInner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 1px;
`;