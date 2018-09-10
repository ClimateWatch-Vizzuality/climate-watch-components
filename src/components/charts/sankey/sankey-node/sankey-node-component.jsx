import React from 'react';
import { Rectangle, Layer } from 'recharts';
import { PropTypes } from 'prop-types';
import styles from './sankey-node-styles.scss';

function SankeyNode({ x, y, width, height, index, payload, config, containerWidth }) {
  const padding = 20;
  const isOut = x + width + padding > containerWidth;
  const unit = config.unit ? `${config.unit} ` : '';
  const suffix = config.suffix ? ` ${config.suffix}` : '';
  return (
    <Layer key={`CustomNode${index}`}>
      <Rectangle
        x={x}
        y={y}
        width={width}
        height={height}
        fill={payload.color}
        fillOpacity="1"
      />
      <text
        textAnchor={isOut ? 'end' : 'start'}
        x={isOut ? x - padding : x + width + padding}
        y={y + height / 2}
        className={styles.nodeText}
      >
        {`${payload.name}: ${unit}${payload.value}${suffix}`}
      </text>
    </Layer>
  );
}

SankeyNode.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  index: PropTypes.number,
  payload: PropTypes.object,
  config: PropTypes.shape({
    unit: PropTypes.string,
    suffix: PropTypes.string
  }),
  containerWidth: PropTypes.number
};

SankeyNode.defaultProps = {
  x: 0,
  y: 0,
  width: 20,
  height: 20,
  index: 0,
  payload: {},
  config: {},
  containerWidth: 100
};

export default SankeyNode;
