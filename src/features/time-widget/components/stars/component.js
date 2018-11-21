import React, { useState } from 'react';
import './styles.css';

function getRandom(max) {
  return Math.random() * max;
}

let starsCache = {};
function addStars(width, height) {
  const cacheKey = `${width}${height}`;

  if (starsCache[cacheKey]) {
    return starsCache[cacheKey];
  }

  let boxShadowValue = '';
  boxShadowValue += `${getRandom(width)}px ${getRandom(height)}px white`
  for (let i = 2; i < width; i++) {
    boxShadowValue += ` , ${getRandom(width)}px ${getRandom(height)}px white`
  }

  starsCache[cacheKey] = boxShadowValue;

  return boxShadowValue;
}

export function Stars(props) {
  return (
    <div className="stars" style={{ boxShadow: addStars(props.width * 2, props.height * 2) }} />
  );
}