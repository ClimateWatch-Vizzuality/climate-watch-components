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
      barSize,
      barGap,
      stackOffset
    } = this.props;

    const yUnit = showUnit && has(config, 'axes.yLeft.unit')
      ? config.axes.yLeft.unit
      : null;

    const xUnit = showUnit && has(config, 'axes.xBottom.unit')
      ? config.axes.xBottom.unit
      : null;

    const xLabel = has(config, 'axes.xBottom.label')
      ? config.axes.xBottom.label
      : undefined;

    const yLabel = has(config, 'axes.yLeft.label')
      ? config.axes.yLeft.label
      : undefined;

    const dataKeys = config.columns.y.map(o => o.value);

    return (
      <div>
        <ResponsiveContainer height={height}>
          <BarChart
            barGap={barGap}
            data={data}
            margin={margin}
            height={height}
            onMouseMove={this.handleMouseMove}
            stackOffset={stackOffset}
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
                dx: xLabel && xLabel.dx,
                dy: xLabel && xLabel.dy,
                className: cx(styles.yAxisLabel, xLabel && xLabel.className),
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
              {yAxisLabel(yUnit, yLabel)}
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
            {dataKeys.map((dataKey, i) => (
              <Bar
                key={dataKey}
                dataKey={dataKey}
                barSize={barSize}
                fill={config.theme[dataKey] && config.theme[dataKey].fill}
                stackId={config.columns.y[i].stackId}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }
}

SimpleBarChart.propTypes = {
  /** Add same stackedId attribute to each column object that you want to stack */
  config: PropTypes.shape({ columns: PropTypes.object }),
  data: PropTypes.array,
  showUnit: PropTypes.bool,
  height: PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]),
  onMouseMove: PropTypes.func,
  forceFixedFormatDecimals: PropTypes.number,
  /** Margin of the chart */
  margin: PropTypes.shape({
    top: PropTypes.number,
    bottom: PropTypes.number,
    left: PropTypes.number,
    right: PropTypes.number
  }),
  domain: PropTypes.object,
  customXAxisTick: PropTypes.node,
  customYAxisTick: PropTypes.node,
  customTooltip: PropTypes.node,
  getCustomYLabelFormat: PropTypes.func,
  barSize: PropTypes.number,
  /** Bar gap between bars if there are multiple bars per one x value */
  barGap: PropTypes.number,
  /** Type of offset function used to generate the lower and upper values in the series array
   * documentation: http://recharts.org/en-US/api/BarChart#stackOffset
   */
  stackOffset: PropTypes.string
};

SimpleBarChart.defaultProps = {
  height: '100%',
  showUnit: false,
  onMouseMove: () => {
  },
  margin: { top: 10, right: 0, left: -10, bottom: 0 },
  domain: null,
  forceFixedFormatDecimals: null,
  config: {},
  data: [],
  customXAxisTick: null,
  customYAxisTick: null,
  customTooltip: null,
  getCustomYLabelFormat: null,
  barSize: undefined,
  barGap: undefined,
  stackOffset: 'sign'
};

export default SimpleBarChart;
