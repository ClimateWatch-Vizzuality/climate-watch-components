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

const getYLabelformat = (precision, value) => {
  const typeValue = precision ? 'f' : 's';
  return `${format(`.${2}${typeValue}`)(value)}`;
};

export const CustomYAxisTick = (
  { index, x, y, payload, precision, getCustomYLabelFormat, suffix }
) =>
  {
    const yLabelFormat = (_precision, value) =>
      getCustomYLabelFormat
        ? getCustomYLabelFormat(value)
        : getYLabelformat(_precision, value);
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
              : `${yLabelFormat(precision, payload.value)}${suffix || ''}`
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
  suffix: PropTypes.string,
  precision: PropTypes.number,
  getCustomYLabelFormat: PropTypes.func
};

CustomYAxisTick.defaultProps = {
  x: null,
  y: null,
  index: null,
  payload: {},
  suffix: null,
  precision: null,
  getCustomYLabelFormat: null
};

CustomYAxisTick.defaultProps = { precision: null };
