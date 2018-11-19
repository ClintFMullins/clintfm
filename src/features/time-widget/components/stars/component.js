import React, { useState } from 'react';
import './styles.css';

function getRandom(max) {
  return Math.random() * max;
}

function addStars(size) {
  let boxShadowValue = '';
  boxShadowValue += `${getRandom(size)}px ${getRandom(size)}px white`
  for (let i = 2; i < size; i++) {
    boxShadowValue += ` , ${getRandom(size)}px ${getRandom(size)}px white`
  }
  return boxShadowValue;
}

export function Stars(props) {
  const [boxShadowValue] = useState(addStars(props.size));

  const style = {
    boxShadow: boxShadowValue,
  }

  return (
    <div className="stars" style={style} />
  );
}