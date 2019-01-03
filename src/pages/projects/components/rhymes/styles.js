import styled from 'styled-components';

export const PageContainer = styled.div`
  background: #CECECE;
  padding-top: 45px;
`

export const Paper = styled.div`
  position: relative;
  margin: 0 auto;
  box-shadow: 1px 1px 10px black;
  padding-top: 100px;
  width: 800px;
  max-width: 98%;
  min-height: 90vh;
  overflow: hidden;
  background: rgb(252, 252, 252);
  border-radius: 2px;
  box-sizing: content-box;
`

export const PaperRedLine = styled.div`
  position: absolute;
  z-index: 10;
  top: 0;
  left: 50px;
  width: 2px;
  height: 100%;
  background-color: lightcoral;
`

export const RapTitle = styled.div`
  position: absolute;
  width: 100%;
  top: 44px;
  text-align: center;
  font-size: 17px;
  text-decoration: underline;
  font-family: cursive;
  color: hsl(204, 2%, 26%);
`

export const RhymeWordWrapper = styled.div`
  overflow-x: hidden;
  padding-bottom: 0;
  white-space: nowrap;
  position: relative;
  z-index: ${props => props.isBackground ? 0 : 2};
  font-size: 25px;
  padding-left: 60px;
  border-bottom: 2px solid rgb(159, 211, 228);
  border-top: ${props => props.isTop ? "2px solid rgb(159, 211, 228)" : "none"};
  height: 47px;
  box-sizing: content-box;
`

export const RhymeWordInputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 60px;
  position: relative;
  z-index: 3;
`

export const RhymeWord = styled.span`
  font-size: 40px;
  display: inline-block;
  margin-right: 2%;
  color: hsl(195, 3%, 71%);
`

export const RhymeWordTyping = styled.input`
  font-size: 40px;
  display: inline-block;
  margin-right: 2%;
  color: hsl(195, 3%, 71%);
  outline: none;
  border: none;
  margin: 0 !important;
  padding: 0 !important;
  -moz-appearance: none;
  background-color: rgb(252,252,252,0);
`

export const OneOfManyRhymes = styled.span`
  color: hsl(204, 2%, 39%);
  cursor: pointer;

  :hover {
    color: hsl(204, 2%, 15%);
  }
`

export const BackgroundLayer = styled.div`
  position: absolute;
  top: 98px;
  left: 0;
  width: 100%;
  height: 100%;
`

export const FadeOutDetail = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  z-index: 3;
  height: 100%;
  width: 30%;
  background: linear-gradient(to right, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0) 20%, rgb(255, 255, 255) 100%);
  pointer-events: none;
`

export const RecordButton = styled.span`
  color: rgba(255, 0, 0, 0.7);
  font-size: 14px;
  cursor: pointer;

  :hover {
    color: rgba(255, 0, 0, 1);
  }
`

export const ResetButton = styled.span`
  color: hsl(195, 3%, 71%);
  font-size: 14px;
  cursor: pointer;
  margin-right: 10px;

  :hover {
    color: hsl(195, 3%, 41%);
  }
`