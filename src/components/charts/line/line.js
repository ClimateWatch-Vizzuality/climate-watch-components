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
import { format } from 'd3-format';
import debounce from 'lodash/debounce';
import isUndefined from 'lodash/isUndefined';

const CustomizedXAxisTick = ({ x, y, payload }) => (
  <g transform={`translate(${x},${y})`}>
    <text
      x="15"
      y="0"
      dy="16"
      textAnchor="end"
      stroke="#b1b1c1"
      strokeWidth="0.5"
      fontSize="13px"
    >
      {payload.value}
    </text>
  </g>
);

const getYLabelformat = (unit, precision, value) => {
  let typeValue = unit ? 'r' : 's';
  if (precision) typeValue = 'f';
  const suffix = unit ? '' : 't';
  return `${format(`.${2}${typeValue}`)(value)}${suffix}`;
};

const CustomizedYAxisTick = ({ index, x, y, payload, unit, precision }) => (
  <g transform={`translate(${x},${y})`}>
    <text
      x="0"
      y="0"
      dy="0"
      textAnchor="end"
      stroke="#b1b1c1"
      strokeWidth="0.5"
      fontSize="13px"
    >
      {
        index === 0 &&
          (payload.value === 0 || payload.value < 0 && payload.value > -0.001)
          ? '0'
          : getYLabelformat(unit, precision, payload.value)
      }
    </text>
  </g>
);

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
            tick={<CustomizedXAxisTick />}
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
              <CustomizedYAxisTick precision={config.precision} unit={unit} />
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

CustomizedXAxisTick.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  payload: PropTypes.object
};

CustomizedXAxisTick.defaultProps = { x: null, y: null, payload: {} };

CustomizedYAxisTick.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  index: PropTypes.number,
  payload: PropTypes.object,
  unit: PropTypes.oneOfType([ PropTypes.string, PropTypes.bool ]),
  precision: PropTypes.number
};

CustomizedYAxisTick.defaultProps = {
  x: null,
  y: null,
  index: null,
  payload: {},
  unit: null,
  precision: null
};

CustomizedYAxisTick.defaultProps = { precision: null, unit: false };

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
