import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import TooltipChart from 'components/charts/tooltip-chart';
import { Tooltip } from 'recharts';
import Sunburst from '@latticejs/recharts-sunburst';

class SunburstChart extends PureComponent {
  render() {
    const { data, width, height, colors, customTooltip, config } = this.props;
    return (
      <Sunburst
        width={width}
        height={height}
        data={data}
        colors={colors}
        dataKey="size"
        ratio={4 / 3}
      >
        <Tooltip
          isAnimationActive={false}
          content={content =>
            customTooltip &&
              React.cloneElement(customTooltip, { content, config }) ||
              <TooltipChart content={content} config={config} />}
          filterNull={false}
        />
      </Sunburst>
    );
  }
}

SunburstChart.propTypes = {
  data: PropTypes.array,
  width: PropTypes.number,
  height: PropTypes.number,
  colors: PropTypes.object,
  customTooltip: PropTypes.node,
  config: PropTypes.object
};

SunburstChart.defaultProps = {
  data: [],
  width: 500,
  height: 500,
  colors: {},
  customTooltip: null,
  config: {}
};

export default SunburstChart;
