import React from 'react';
import PropTypes from 'prop-types';
import { format } from 'd3-format';

export const CustomXAxisTick = ({ x, y, payload, customStrokeWidth }) => (
  <g transform={`translate(${x},${y})`}>
    <text
      x="15"
      y="0"
      dy="16"
      textAnchor="end"
      stroke="#b1b1c1"
      strokeWidth={customStrokeWidth || '0.5'}
      fontSize="13px"
    >
      {payload.value}
    </text>
  </g>
);

const getYLabelformat = value => `${format('.2s')(value)}`;

export const CustomYAxisTick = (
  { x, y, payload, customStrokeWidth, getCustomYLabelFormat, suffix }
) =>
  {
    const yLabelFormat = value =>
      getCustomYLabelFormat
        ? getCustomYLabelFormat(value)
        : getYLabelformat(value);
    return (
      <g transform={`translate(${x},${y})`}>
        <text
          x="5"
          y="4"
          dy="0"
          textAnchor="end"
          stroke="#b1b1c1"
          strokeWidth={customStrokeWidth || '0.5'}
          fontSize="13px"
        >
          {
            payload.value === 0
              ? '0'
              : `${yLabelFormat(payload.value)}${suffix || ''}`
          }
        </text>
      </g>
    );
  };

CustomXAxisTick.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  payload: PropTypes.object,
  customStrokeWidth: PropTypes.string
};

CustomXAxisTick.defaultProps = {
  x: null,
  y: null,
  payload: {},
  customStrokeWidth: null
};

CustomYAxisTick.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  payload: PropTypes.object,
  customStrokeWidth: PropTypes.string,
  suffix: PropTypes.string,
  getCustomYLabelFormat: PropTypes.func
};

CustomYAxisTick.defaultProps = {
  x: null,
  y: null,
  payload: {},
  suffix: null,
  customStrokeWidth: null,
  getCustomYLabelFormat: null
};
