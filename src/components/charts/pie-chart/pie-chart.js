import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import {
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Tooltip
} from 'recharts';

class PieChart extends PureComponent {
  render() {
    const { config, data, height, margin } = this.props;
    return (
      <div>
        <ResponsiveContainer height={height} margin={margin}>
          <RechartsPieChart>
            <Tooltip
              isAnimationActive={false}
              // content={content =>
              //   customTooltip &&
              //     React.cloneElement(customTooltip, { content, config }) ||
              //     (
              //       <PieTooltipChart
              //         content={content}
              //         config={config}
              //       />
              //     )}
              filterNull={false}
            />
            <Pie
              data={data}
              fill={config.theme && config.theme.fill}
              isAnimationActive={config.animation || false}
            />
          </RechartsPieChart>
        </ResponsiveContainer>
      </div>
    );
  }
}

PieChart.propTypes = {
  config: PropTypes.shape({ columns: PropTypes.object }),
  data: PropTypes.array,
  height: PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]),
  margin: PropTypes.object
};

PieChart.defaultProps = {
  height: '100%',
  margin: { top: 0, right: 10, left: 10, bottom: 0 },
  config: {},
  data: []
};

export default PieChart;
