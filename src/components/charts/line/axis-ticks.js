import React from 'react';
import PropTypes from 'prop-types';
import { format } from 'd3-format';

export const CustomXAxisTick = ({ x, y, payload }) => (
  <g transform={`translate(${x},${y})`}>
    <text
      x="15"
      y="0"
      dy="16"
      textAnchor="end"
      stroke="#b1b1c1"
      strokeWidth="0.5"
      fontSize="13px"
    >
      {payload.value}
    </text>
  </g>
);

const getYLabelformat = (unit, precision, value) => {
  let typeValue = unit ? 'r' : 's';
  if (precision) typeValue = 'f';
  return `${format(`.${2}${typeValue}`)(value)}`;
};

export const CustomYAxisTick = (
  { index, x, y, payload, unit, precision, getCustomYLabelFormat, suffix }
) =>
  {
    const yLabelFormat = (_unit, _precision, value) =>
      getCustomYLabelFormat
        ? getCustomYLabelFormat(value)
        : getYLabelformat(_unit, _precision, value);
    return (
      <g transform={`translate(${x},${y})`}>
        <text
          x="0"
          y="0"
          dy="0"
          textAnchor="end"
          stroke="#b1b1c1"
          strokeWidth="0.5"
          fontSize="13px"
        >
          {
            index === 0 &&
              (payload.value === 0 ||
                payload.value < 0 && payload.value > -0.001)
              ? '0'
              : `${yLabelFormat(unit, precision, payload.value)}${suffix || ''}`
          }
        </text>
      </g>
    );
  };

CustomXAxisTick.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  payload: PropTypes.object
};

CustomXAxisTick.defaultProps = { x: null, y: null, payload: {} };

CustomYAxisTick.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  index: PropTypes.number,
  payload: PropTypes.object,
  unit: PropTypes.oneOfType([ PropTypes.string, PropTypes.bool ]),
  suffix: PropTypes.string,
  precision: PropTypes.number,
  getCustomYLabelFormat: PropTypes.func
};

CustomYAxisTick.defaultProps = {
  x: null,
  y: null,
  index: null,
  payload: {},
  unit: null,
  suffix: null,
  precision: null,
  getCustomYLabelFormat: null
};

CustomYAxisTick.defaultProps = { precision: null, unit: false };
