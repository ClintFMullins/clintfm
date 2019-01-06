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
    const segmentData = SEGMENT_DATA[segment.id];

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

    newBashSubstring += segmentData.code;

    return bashString + newBashSubstring;
  }, 'export PS1="');

  const colorStop = currentColor === null ? '' : getColorEnd();

  return pre + '\n\n' + PS1 + colorStop + '"';
}