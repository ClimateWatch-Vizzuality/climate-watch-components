import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Label,
  BarChart,
  Bar
} from 'recharts';
import debounce from 'lodash/debounce';
import { htmlToSvgSubscript } from 'utils';
import { CustomXAxisTick, CustomYAxisTick } from './axis-ticks';
import BarTooltipChart from './bar-tooltip-chart';

class SimpleBarChart extends PureComponent {
  debouncedMouseMove = debounce(
    year => {
      const { onMouseMove } = this.props;
      onMouseMove(year);
    },
    80
  );

  handleMouseMove = e => {
    const year = e && e.activeLabel;
    if (year) {
      this.debouncedMouseMove(year);
    }
  };

  render() {
    const {
      config,
      data,
      height,
      margin,
      domain,
      showUnit,
      forceFixedFormatDecimals,
      customXAxisTick,
      customYAxisTick,
      customTooltip,
      getCustomYLabelFormat
    } = this.props;
    const unit = showUnit &&
      config &&
      config.axes &&
      config.axes.yLeft &&
      config.axes.yLeft.unit
      ? config.axes.yLeft.unit
      : null;
    const LineChartMargin = { top: 10, right: 0, left: -10, bottom: 0 };
    const yAxisLabel = (
      <Label
        position="top"
        offset={20}
        content={() => (
          <text x="8" y="20">
            {htmlToSvgSubscript(unit)}
          </text>
        )}
      />
    );

    const dataKeys = Object.keys(config.columns).filter(col => col !== 'x');

    return (
      <div>
        <ResponsiveContainer height={height} margin={margin}>
          <BarChart
            data={data}
            margin={LineChartMargin}
            height={height}
            onMouseMove={this.handleMouseMove}
          >
            <XAxis
              dataKey="x"
              type="category"
              tick={customXAxisTick || <CustomXAxisTick />}
              padding={{ left: 15, right: 20 }}
              tickSize={8}
              domain={domain && domain.x || [ 'auto', 'auto' ]}
              interval="preserveStartEnd"
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              scale="linear"
              type="number"
              tick={
                customYAxisTick ||
                  (
                    <CustomYAxisTick
                      getCustomYLabelFormat={getCustomYLabelFormat}
                    />
                  )
              }
              domain={domain && domain.y || [ 'auto', 'auto' ]}
              interval="preserveStartEnd"
            >
              {yAxisLabel}
            </YAxis>
            <CartesianGrid vertical={false} />
            <Tooltip
              isAnimationActive={false}
              cursor={{ stroke: '#113750', strokeWidth: 2 }}
              filterNull={false}
              content={content =>
                customTooltip &&
                  React.cloneElement(customTooltip, { content, config }) ||
                  (
                    <BarTooltipChart
                      content={content}
                      config={config}
                      forceFixedFormatDecimals={forceFixedFormatDecimals}
                      getCustomYLabelFormat={getCustomYLabelFormat}
                    />
                  )}
            />
            {dataKeys.map(dataKey => (
              <Bar
                key={dataKey}
                dataKey={dataKey}
                fill={config.theme[dataKey] && config.theme[dataKey].fill}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }
}

SimpleBarChart.propTypes = {
  config: PropTypes.shape({ columns: PropTypes.object }),
  data: PropTypes.array,
  showUnit: PropTypes.bool,
  height: PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]),
  onMouseMove: PropTypes.func,
  forceFixedFormatDecimals: PropTypes.number,
  margin: PropTypes.object,
  domain: PropTypes.object,
  customXAxisTick: PropTypes.node,
  customYAxisTick: PropTypes.node,
  customTooltip: PropTypes.node,
  getCustomYLabelFormat: PropTypes.func
};

SimpleBarChart.defaultProps = {
  height: '100%',
  showUnit: false,
  onMouseMove: () => {
  },
  margin: { top: 0, right: 10, left: 10, bottom: 0 },
  domain: null,
  forceFixedFormatDecimals: null,
  config: {},
  data: [],
  customXAxisTick: null,
  customYAxisTick: null,
  customTooltip: null,
  getCustomYLabelFormat: null
};

export default SimpleBarChart;
