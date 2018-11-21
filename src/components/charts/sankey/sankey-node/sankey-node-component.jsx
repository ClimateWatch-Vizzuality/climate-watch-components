import React from 'react';
import { Rectangle, Layer } from 'recharts';
import { PropTypes } from 'prop-types';
import { splitSVGText } from 'utils/utils';
import styles from './sankey-node-styles.scss';

function SankeyNode({ x, y, width, height, index, payload, config }) {
  const isOut = x > width;
  const padding = config.padding || 20;
  const rectangleStart = config.titlePadding || 140;
  const minHeight = 2;

  const tSpans = (text) => {
    const fontSize = config.fontSize || 13;
    const lineHeight = config.lineHeigth || 1.2;
    const textHeight = config.textHeight || 20;
    const tspanLineHeight = config.tspanLineHeight || 10;
    const startX = isOut ? x - rectangleStart + padding : x + width + rectangleStart - padding / 2;
    const startY = y + (height / 2) - fontSize || 0;
    const charactersPerLine = (rectangleStart / 6) - 3; // -3 for the ellipsis
    const maxLines = 2;
    const splittedSVGText = splitSVGText(text, textHeight, tspanLineHeight, charactersPerLine, maxLines);
    return splittedSVGText.map((t, i) => (
      `<tspan
        x="${startX}"
        y="${startY + fontSize * lineHeight + i * fontSize * lineHeight - (0.5 * (splittedSVGText.length - 1)) * fontSize}"
      >
        ${t}
      </tspan>`
    )).join('\n');
  }

  return payload && payload.value && (
    <Layer key={`CustomNode${index}`}>
      <text
        textAnchor={isOut ? 'start' : 'end'}
        textLength={rectangleStart}
        className={styles.nodeText}
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: tSpans(payload.name) }}
      />
      <Rectangle
        x={isOut ? x - rectangleStart : x + width + rectangleStart}
        y={y}
        width={width}
        height={height < minHeight ? minHeight : height}
        fill={payload.color}
        fillOpacity="1"
      />
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
    suffix: PropTypes.string,
    // Padding for the titles, before and after the chart
    titlePadding: PropTypes.number
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
