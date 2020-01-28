import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {
  Sector
} from 'recharts';
import styles from './pie-chart-styles.scss';

const CustomizedActiveShape = props => {
  const {
    cx,
    cy,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    percent,
    theme,
    customInnerHoverLabel
  } = props;
  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius - 3}
        outerRadius={outerRadius + 3}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      {customInnerHoverLabel ?
        customInnerHoverLabel({ x: cx, y: cy, value: percent }) :
        (
          <text
            x={cx}
            y={cy}
            dy={10}
            dx={2}
            textAnchor="middle"
            className={classnames(styles.innerHoverLabel, theme.innerHoverLabel)}
          >
          (
            {`${(percent * 100).toFixed(0)}%`}
          </text>
        )
      }
    </g>
  );
};

CustomizedActiveShape.propTypes = {
  cx: PropTypes.number.isRequired,
  cy: PropTypes.number.isRequired,
  percent: PropTypes.number.isRequired,
  innerRadius: PropTypes.number.isRequired,
  outerRadius: PropTypes.number.isRequired,
  startAngle: PropTypes.number.isRequired,
  endAngle: PropTypes.number.isRequired,
  fill: PropTypes.string.isRequired,
  theme: PropTypes.shape(),
  customInnerHoverLabel: PropTypes.node
};

CustomizedActiveShape.defaultProps = {
  theme: undefined,
  customInnerHoverLabel: undefined
};

export default CustomizedActiveShape;
