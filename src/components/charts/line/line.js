import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Label
} from 'recharts';
import TooltipChart from 'components/charts/tooltip-chart';
import debounce from 'lodash/debounce';
import isUndefined from 'lodash/isUndefined';
import { CustomXAxisTick, CustomYAxisTick } from './axis-ticks';

class ChartLine extends PureComponent {
  debouncedMouseMove = debounce(
    year => {
      this.props.onMouseMove(year);
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
      forceFixedFormatDecimals
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
            {unit}
          </text>
        )}
      />
    );
    return (
      <ResponsiveContainer height={height} margin={margin}>
        <LineChart
          data={data}
          margin={LineChartMargin}
          onMouseMove={this.handleMouseMove}
        >
          <XAxis
            dataKey="x"
            scale="time"
            type="number"
            tick={<CustomXAxisTick />}
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
            tick={<CustomYAxisTick precision={config.precision} unit={unit} />}
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
            content={content => (
              <TooltipChart
                content={content}
                config={config}
                forceFixedFormatDecimals={forceFixedFormatDecimals}
              />
            )}
          />
          {
            config.columns && config.columns.y.map(column => {
                const color = config.theme[column.value].stroke || '';
                return (
                  <Line
                    key={column.value}
                    isAnimationActive={
                      isUndefined(config.animation) ? true : config.animation
                    }
                    dot={{ strokeWidth: 0, fill: color, radius: 0.5 }}
                    dataKey={column.value}
                    stroke={color}
                    strokeWidth={2}
                    type="monotone"
                  />
                );
              })
          }
        </LineChart>
      </ResponsiveContainer>
    );
  }
}

ChartLine.propTypes = {
  config: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
  showUnit: PropTypes.bool,
  height: PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]),
  onMouseMove: PropTypes.func,
  forceFixedFormatDecimals: PropTypes.number,
  margin: PropTypes.object,
  domain: PropTypes.object.isRequired
};

ChartLine.defaultProps = {
  height: '100%',
  showUnit: false,
  onMouseMove: () => {
  },
  margin: { top: 0, right: 10, left: 10, bottom: 0 },
  forceFixedFormatDecimals: null
};

export default ChartLine;
