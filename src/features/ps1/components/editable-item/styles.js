import styled from 'styled-components';

const color = '#00000075';
const textColor = '#000001a3';
const backgroundColor = '#f8f8ff14';

export const EditableItemWrapper = styled.div`
  display: inline-block;
  margin-right: 8px;
`;

export const EditableItemTop = styled.div`
  border: ${color} 2px solid;
  border-bottom: none;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  display: flex;
  justify-content: flex-start;
  background-color: ${backgroundColor};
`;

export const EditableSelection = styled.div`
  width: 20px;
  height: 20px;
  margin: 4px;
  border-radius: 3px;
  cursor: pointer;
  opacity: 0.6;
  
  :hover {
    opacity: 1;
  }
`;

export const EditableItemClose = styled(EditableSelection)`
  background-color: #de3030eb;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const EditableItemLeft = styled(EditableSelection)`
  background-color: grey;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const EditableItemRight = styled(EditableSelection)`
  background-color: grey;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const EditableItemBody = styled.div`
  padding: 10px 20px;
  border: ${color} 2px solid;
  border-top: ${color} 1px solid;
  border-bottom: ${color} 2px solid;
  color: ${textColor};
  cursor: zoom-in;
  text-align: center;
`;

export const EditableItemBottom = styled.div`
  background-color: ${backgroundColor};
  border: ${color} 2px solid;
  border-top: none;
  height: 8px;
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;
  cursor: grab;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  user-select: none;

  :active {
    cursor: grabbing;
  }
`;

export const LittleLine = styled.div`
  height: 1px;
  width: 25px;
  background-color: ${color};
`;

export const VerticalCenter = styled.div`
  display: flex;
  align-items: center;
`;

export const MarginBottom = styled.div`
  margin-bottom: 20px;
`;