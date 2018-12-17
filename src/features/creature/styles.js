import styled from 'styled-components';

export const CreatureBodyWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
`

export const CreatureBody = styled.div`
  border: 2px solid black;
  background: lightskyblue;
  position: relative;
`

export const CreatureEyeLeft = styled.div`
  border: solid 2px black;
  background-color: ghostwhite;
  position: absolute;
`

export const CreatureEyeRight = styled.div`
  border: solid 2px black;
  background-color: ghostwhite;
  position: absolute;
`

export const CreatureEyePupilWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`

export const CreatureEyePupil = styled.div`
  position: absolute;
  background-color: black;
`

export const CreatureMouth = styled.div`
  background-color: black;
  position: absolute;
  border-top-left-radius: 50%;
  border-bottom-right-radius: 50%;
`