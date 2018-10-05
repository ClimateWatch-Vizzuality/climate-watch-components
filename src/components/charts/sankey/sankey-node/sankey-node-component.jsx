import React from 'react';
import { Rectangle, Layer } from 'recharts';
import { PropTypes } from 'prop-types';
import { format } from 'd3-format';
import styles from './sankey-node-styles.scss';

function SankeyNode({ x, y, width, height, index, payload, config }) {
  const padding = 20;
  const isOut = x > width;
  const unit = config.unit ? `${config.unit} ` : '';
  const suffix = config.suffix ? ` ${config.suffix}` : '';
  const scale = config.scale || 1;
  const valueFormat = config.format || '~r';
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
        {`${payload.name}: ${unit}${format(valueFormat)(payload.value * scale)}${suffix}`}
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
  payload: PropTypes.shape({
    color: PropTypes.string,
    depth: PropTypes.number,
    dx: PropTypes.number,
    dy: PropTypes.number,
    name: PropTypes.string,
    SourceLinks: PropTypes.array,
    SourceNodes: PropTypes.array,
    targetLinks: PropTypes.array,
    targetNodes: PropTypes.array,
    value: PropTypes.number,
    x: PropTypes.number,
    y: PropTypes.number
  }),
  config: PropTypes.shape({
    unit: PropTypes.string,
    suffix: PropTypes.string
  })
};

SankeyNode.defaultProps = {
  x: 0,
  y: 0,
  width: 20,
  height: 20,
  index: 0,
  payload: {},
  config: {}
};

export default SankeyNode;
