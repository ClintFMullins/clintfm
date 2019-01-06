import React from 'react';
import style from 'ansi-styles';
import { SEGMENT_DATA } from './segments';

function getAnsiColorStart(hue) {
  // Must be in sync with color method.
  return style.color.ansi.hsl(hue, 20, 50);
}

function getColorEnd() {
  return style.color.close;
}

export function getConvertedPS1(segments) {
  let pre = '';
  let currentColor = null;

  const PS1 = segments.reduce((bashString, segment) => {
    const segmentData = SEGMENT_DATA[segment.id] || {};

    if (segmentData.pre) {
      pre += segmentData.pre;
    }

    let newBashSubstring = '';

    if (currentColor !== segment.color) {
      currentColor = segment.color;

      if (currentColor !== null)  {
        newBashSubstring += getColorEnd();
      }

      newBashSubstring += getAnsiColorStart(segment.color)
    }

    newBashSubstring += segment.customText || segmentData.code;

    return bashString + newBashSubstring;
  }, 'export PS1="');

  const colorStop = currentColor === null ? '' : getColorEnd();

  return pre + '\n\n' + PS1 + colorStop + '"';
}

export function getPreview(segment) {
  const isSpace = segment.id === 'space';

  let content = segment.customText;
  if (isSpace) {
    content = <span>&nbsp;</span>;
  } else if (!content) {
    content = SEGMENT_DATA[segment.id].example;
  }

  return content;
}