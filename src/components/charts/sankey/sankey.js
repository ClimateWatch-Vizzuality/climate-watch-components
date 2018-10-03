import React from 'react';
import { PropTypes } from 'prop-types';
import { Sankey, Tooltip, ResponsiveContainer } from 'recharts';
import SankeyTooltip from './sankey-tooltip';
import SankeyNode from './sankey-node';

function SankeyChart(
  {
    width,
    height,
    nodeWidth,
    nodePadding,
    containerWidth,
    data,
    config,
    customTooltip,
    tooltipChildren
  }
) {
  return (
    <ResponsiveContainer width="100%" aspect={config.aspect || 16 / 9}>
      <Sankey
        width={width}
        height={height}
        data={data}
        nodeWidth={nodeWidth}
        nodePadding={nodePadding}
        node={
          <SankeyNode containerWidth={containerWidth} config={config.node} />
        }
      >
        {
          customTooltip ||
            (
              <Tooltip
                content={content => (
                  <SankeyTooltip
                    content={content}
                    config={config.tooltip}
                    tooltipChildren={tooltipChildren}
                  />
                )}
              />
            )
        }
      </Sankey>
    </ResponsiveContainer>
  );
}

SankeyChart.propTypes = {
  /** Width of the chart */
  width: PropTypes.number,
  /** Height of the chart */
  height: PropTypes.number,
  /** Data of the chart */
  data: PropTypes.shape({ nodes: PropTypes.array, links: PropTypes.array }),
  /** Width of every node */
  nodeWidth: PropTypes.number,
  /** Padding of every node */
  nodePadding: PropTypes.number,
  /** Width of the sankey container */
  containerWidth: PropTypes.number,
  /** Custom tooltip component. Will replace the default */
  customTooltip: PropTypes.node,
  /** Function that takes the node info and returns the components to add at the bottom of the tooltip */
  tooltipChildren: PropTypes.func,
  /** Configuration */
  config: PropTypes.shape({
    /** Configuration for the tooltip */
    tooltip: PropTypes.object,
    /** Configuration for each node */
    node: PropTypes.object,
    /** Configuration for the aspect of the responsive container */
    aspect: PropTypes.number
  })
};

SankeyChart.defaultProps = {
  width: 960,
  height: 500,
  data: {},
  nodeWidth: 10,
  nodePadding: 60,
  containerWidth: 800,
  config: {},
  customTooltip: null,
  tooltipChildren: null
};

export default SankeyChart;
