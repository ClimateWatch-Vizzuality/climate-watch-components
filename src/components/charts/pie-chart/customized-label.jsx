import React from 'react';
import PropTypes from 'prop-types';

const RADIAN = Math.PI / 180;
const CustomizedLabel = (
  { cx, cy, midAngle, innerRadius, outerRadius, percent },
  { labelPositionRatio, hideLabel },
  theme
) => {
  const radius =
    innerRadius + (outerRadius - innerRadius) * (labelPositionRatio || 0.6);
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return !hideLabel ? (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
      className={theme.label}
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  ) : null;
};

CustomizedLabel.propTypes = {
  cx: PropTypes.number.isRequired,
  cy: PropTypes.number.isRequired,
  midAngle: PropTypes.number.isRequired,
  innerRadius: PropTypes.number.isRequired,
  outerRadius: PropTypes.number.isRequired,
  percent: PropTypes.number.isRequired
};

export default CustomizedLabel;
