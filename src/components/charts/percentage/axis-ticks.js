import React from 'react';
import PropTypes from 'prop-types';

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

export const CustomYAxisTick = ({ x, y, payload, customStrokeWidth }) => (
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
      {`${payload.value}%`}
    </text>
  </g>
);

CustomXAxisTick.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  payload: PropTypes.shape({
    coordinate: PropTypes.number,
    isShow: PropTypes.bool,
    offset: PropTypes.number,
    tickCoord: PropTypes.number,
    value: PropTypes.number
  }),
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
  payload: PropTypes.shape({
    coordinate: PropTypes.number,
    isShow: PropTypes.bool,
    offset: PropTypes.number,
    tickCoord: PropTypes.number,
    value: PropTypes.number
  }),
  customStrokeWidth: PropTypes.string
};

CustomYAxisTick.defaultProps = {
  x: null,
  y: null,
  payload: {},
  customStrokeWidth: null
};
