import React from 'react';
import style from 'ansi-styles';
import { SEGMENT_DATA } from './segments';

function getAnsiColorStart(hue) {
  // Must be in sync with color method.
  const styleFromLibrary = style.color.ansi.hsl(hue, 20, 50);
  const colorNumber = styleFromLibrary.match(/\d+/)[0];
  return `\\[\\e[${colorNumber}m\\]`;
}

function getColorEnd() {
  return '\\[\\e[m\\]';
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

    if (!segment.customText && currentColor !== segment.color) {
      if (currentColor !== null)  {
        newBashSubstring += getColorEnd();
      }

      currentColor = segment.color;

      newBashSubstring += getAnsiColorStart(segment.color);
    }

    newBashSubstring += segment.customText || segmentData.code;

    if (segment.customText) {
      console.log(newBashSubstring)
    }

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