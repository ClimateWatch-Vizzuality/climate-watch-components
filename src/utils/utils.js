import isArray from 'lodash/isArray';
import isString from 'lodash/isString';
import isFinite from 'lodash/isFinite';
import minBy from 'lodash/minBy';
import maxBy from 'lodash/maxBy';
import { getNiceTickValues } from 'recharts-scale';

export const sanitize = data => {
  if (isArray(data)) {
    return data.join(', ');
  }
  if (data && !isString(data)) {
    if (isFinite(data)) return data.toString();
    return data.name || data.full_name || '';
  }
  return data;
};

// Detects if user browser is Edge or Explorer 11
export const isMicrosoftBrowser = () => {
  const ua = window && window.navigator ? window.navigator.userAgent : '';
  return ua.indexOf('Edge') !== -1 || ua.indexOf('Trident/') !== -1;
};

export function getCustomTicks(
  columns,
  data = [],
  tickNumber = 8,
  decimals = false
) {
  const totalValues = [];
  const yValues = columns.y.map(c => data.map(d => d[[ c.value ]]));
  for (let index = 0; index < yValues[0].length; index++) {
    const total = { positive: 0, negative: 0 };
    for (let e = 0; e < yValues.length; e++) {
      if (yValues[e][index] > 0) {
        total.positive += yValues[e][index] || 0;
      } else {
        total.negative += yValues[e][index] || 0;
      }
    }
    totalValues.push(total);
  }

  const minValue = minBy(totalValues, 'negative').negative;
  const maxValue = maxBy(totalValues, 'positive').positive;
  return {
    min: minValue,
    max: maxValue,
    ticks: getNiceTickValues([ minValue, maxValue ], tickNumber, decimals)
  };
}

// formats/create ellipsis nodes text using # of lines available, node width, etc
export const splitSVGText = (
  text,
  height,
  _labelCharHeight,
  _labelCharsPerLine,
  _labelMaxLines
) =>
  {
    if (height < _labelCharHeight - 6) return '';
    const maxLinesForNode = Math.max(
      1,
      Math.min(_labelMaxLines, Math.floor(height / _labelCharHeight))
    );
    const words = text.split(' ');
    const lines = [];
    let currentLine = '';

    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      let line = word;
      if (currentLine.trim() !== '') {
        line = `${currentLine} ${line} `;
      }
      // line is too long
      if (line.length > _labelCharsPerLine) {
        // last allowed line: show max length possible with ellipsis
        if (lines.length === maxLinesForNode - 1) {
          currentLine = `${line.substr(0, _labelCharsPerLine - 1)} …`;
          break;
        } else if (word.length > _labelCharsPerLine) {
          // word longer than allowed line length: split word in two with a dash
          const wordStart = line.substr(0, _labelCharsPerLine - 1);
          currentLine = line.substr(_labelCharsPerLine - 1);
          lines.push(`${wordStart} -`);
        } else {
          lines.push(currentLine);
          currentLine = word;
        }
      } else {
        currentLine = line;
      }
    }

    lines.push(currentLine);
    return lines;
  };
