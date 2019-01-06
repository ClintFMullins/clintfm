import React, { useRef } from 'react';
import styled from 'styled-components';
// TODO: find a better way to share this
import { EditableSelection } from '../editable-item/styles';
import { getHSLColor } from '../../../../utils/color';

const BoxWrapper = styled.div`
  position: absolute;
  top: -22px;
  left: -36px;
  z-index: 10;
  width: 100px;
  height: 25px;
  background: -webkit-linear-gradient(left, ${getHSLColor(0)} 0%, ${getHSLColor(60)} 16.66%, ${getHSLColor(120)} 33.33%, ${getHSLColor(180)} 50%, ${getHSLColor(240)} 66.66%, ${getHSLColor(300)} 83.33%, ${getHSLColor(360)} 100%);
  border: 5px ${props => getHSLColor(props.hue)} solid;
  border-radius: 3px;
  cursor: pointer;
`;

const EditableItemColor = styled(EditableSelection)`
  background-color: black;
  color: white;
  padding: 3px;
`;

const EditableItemColorInner = styled.div`
  background-color: ${props => getHSLColor(props.color)};
  width: 100%;
  height: 100%;
  border-radius: 1px;
`;

const RelativeContainer = styled.div`
  position: relative;
`;


export function ColorPicker({ color, onColorSelection, isOpen, setIsOpen }) {
  const ref = useRef();

  function selectColor(event) {
    const { left, width } = ref.current.getBoundingClientRect();
    const newHue = (event.pageX - left) * 360 / width;

    onColorSelection(newHue);
  }

  return (
    <RelativeContainer>
      <EditableItemColor onClick={() => setIsOpen(true)}>
        <EditableItemColorInner color={color} />
      </EditableItemColor>
      {isOpen &&
        <BoxWrapper
          ref={ref}
          onClick={selectColor}
          hue={color}
          onMouseOut={() => setIsOpen(false)}
        />
      }
    </RelativeContainer>
  );
}