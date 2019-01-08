import styled from 'styled-components';
import { getHSLColor } from '../../utils/color';

export const PageWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #DFD9E2;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const PageWrapperInner = styled.div`
  width: 1200px;
  max-width: 94%;
`;

export const EditZone = styled.div`
  min-height: 300px;
  width: 100%;
  background-color: ghostwhite;
  border-radius: 3px;
  padding: 20px;
`;

export const EditZoneInner = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
`;

export const PresentZone = styled.div`
  min-height: 100px;
  width: 100%;
  background-color: black;
  border-radius: 3px;
  color: ghostwhite;
  padding: 10px 16px;
`;

export const BeautifulWrapper = styled.div`
  padding: 5px;
  border-radius: 3px;
  background: -webkit-linear-gradient(to right, #FF8235, #30E8BF);
  background: linear-gradient(to right, #FF8235, #30E8BF);
`;

export const SubduedWrapper = styled.div`
  padding: 5px;
  border-radius: 3px;
  background: -webkit-linear-gradient(to right, #ffdde1, #ee9ca770);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #ffdde1, #ee9ca770);
`;

export const Spacer = styled.div`
  width: 100%;
  height: 30px;
`;

export const PresentTextWrapper = styled.div`
  display: inline-block;
  color: ${props => getHSLColor(props.hue)};
`;

export const ButtonGetCode = styled.button`
  background: #757ecb;
  padding: 10px 15px;
  color: #fffdd7c4;
  font-family: monospace;
  font-size: 20px;
  font-weight: 600;
  cursor: pointer;
  border-radius: 6px;
  transform: scale(0.8);
  transition: transform ease-out 200ms;

  :hover {
    transform: scale(1);
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export const GrabbedItem = styled.div`
  position: fixed;
  z-index: 30;
`;