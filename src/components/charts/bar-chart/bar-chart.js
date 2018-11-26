import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';
import debounce from 'lodash/debounce';
import yAxisLabel from 'components/charts/y-axis-label';
import cx from 'classnames';
import styles from 'components/charts/y-axis-label/y-axis-label-styles.scss';
import has from 'lodash/has';
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
      getCustomYLabelFormat,
      barSize
    } = this.props;

    const yUnit = showUnit && has(config, 'axes.yLeft.unit')
      ? config.axes.yLeft.unit
      : null;

    const xUnit = showUnit && has(config, 'axes.xBottom.unit')
      ? config.axes.xBottom.unit
      : null;

    const xLabel = has(config, 'axes.xBottom.label')
      ? config.axes.xBottom.label
      : null;

    const yLabel = has(config, 'axes.yLeft.label')
      ? config.axes.yLeft.label
      : null;

    const LineChartMargin = { top: 10, right: 0, left: -10, bottom: 0 };
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
              label={{
                value: xUnit,
                dx: xLabel.dx,
                dy: xLabel.dy,
                className: cx(styles.yAxisLabel, xLabel.className),
                position: 'insideBottomRight'
              }}
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
              {yAxisLabel(yUnit, yLabel.dx, yLabel.dy, yLabel.className)}
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
                barSize={barSize}
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
  getCustomYLabelFormat: PropTypes.func,
  barSize: PropTypes.number
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
  getCustomYLabelFormat: null,
  barSize: undefined
};

export default SimpleBarChart;
