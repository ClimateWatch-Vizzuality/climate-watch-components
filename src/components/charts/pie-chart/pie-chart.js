import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import TooltipChart from 'components/charts/tooltip-chart';
import {
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Tooltip
} from 'recharts';

class PieChart extends PureComponent {
  render() {
    const { config, data, height, margin, customTooltip } = this.props;
    return (
      <div>
        <ResponsiveContainer height={height} margin={margin}>
          <RechartsPieChart>
            <Tooltip
              isAnimationActive={false}
              content={content =>
                customTooltip &&
                  React.cloneElement(customTooltip, { content, config }) ||
                  <TooltipChart content={content} config={config} />}
              filterNull={false}
            />
            <Pie
              data={data}
              dataKey="value"
              fill={config.theme && config.theme.fill}
              isAnimationActive={config.animation || false}
            >
              {data.map(d => <Cell fill={d.fill} />)}
            </Pie>
          </RechartsPieChart>
        </ResponsiveContainer>
      </div>
    );
  }
}

PieChart.propTypes = {
  config: PropTypes.shape({
    columns: PropTypes.object,
    /** Optional fill attribute - Only if the pie is monochrome */
    theme: PropTypes.shape({ fill: PropTypes.string })
  }),
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
      fill: PropTypes.string.isRequired
    })
  ),
  height: PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]),
  margin: PropTypes.shape({
    top: PropTypes.number,
    right: PropTypes.number,
    left: PropTypes.number,
    bottom: PropTypes.number
  }),
  customTooltip: PropTypes.node
};

PieChart.defaultProps = {
  height: '100%',
  margin: { top: 0, right: 10, left: 10, bottom: 0 },
  config: {},
  data: [],
  customTooltip: null
};

export default PieChart;
