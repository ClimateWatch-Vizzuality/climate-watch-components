import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
import isUndefined from 'lodash/isUndefined';
import has from 'lodash/has';
import {
  ComposedChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Label
} from 'recharts';
import TooltipChart from 'components/charts/tooltip-chart';
import { format } from 'd3-format';
import { htmlToSvgSubscript } from 'utils';
import { getData } from './percentage-selectors';
import { CustomXAxisTick, CustomYAxisTick } from './axis-ticks';

class ChartPercentage extends PureComponent {
  constructor() {
    super();
    this.state = {};
  }

  debouncedMouseMove = debounce(
    year => {
      this.props.onMouseMove(year);
    },
    80
  );

  handleMouseMove = e => {
    const activeCoordinateX = e && e.activeCoordinate && e.activeCoordinate.x;
    const chartX = e && e.chartX || 0;
    const tooltipVisibility = activeCoordinateX >= chartX - 30;
    if (this.state.tooltipVisibility !== tooltipVisibility) {
      this.setState({ tooltipVisibility }, () => this.props.onMouseMove(e));
    }
    const year = e && e.activeLabel;
    if (year) {
      this.debouncedMouseMove(year);
    }
  };

  render() {
    const { tooltipVisibility } = this.state;
    const {
      data,
      config,
      height,
      stepped,
      customXAxisTick,
      customYAxisTick,
      customTooltip,
      showUnit
    } = this.props;
    const percentageState = { data, config };
    const percentageData = getData(percentageState);
    const updatedConfig = {
      ...config,
      axes: {
        ...config.axes,
        yLeft: { ...config.axes.yLeft, unit: '', suffix: '' }
      }
    };
    const unit = showUnit && has(config, 'axes.yLeft.unit')
      ? config.axes.yLeft.unit
      : null;
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

    if (!percentageData.length) return null;
    const getTooltipLabelFormat = value => `${format('.2r')(value)}%`;
    return (
      <ResponsiveContainer height={height}>
        <ComposedChart
          data={percentageData}
          margin={{ top: 45, right: 20, left: -10, bottom: 0 }}
          onMouseMove={this.handleMouseMove}
          stackOffset="sign"
        >
          <XAxis
            domain={[ 'dataMin', 'dataMax' ]}
            type="number"
            dataKey="x"
            padding={{ left: 30, right: 40 }}
            tick={customXAxisTick || <CustomXAxisTick customstrokeWidth="0" />}
            tickSize={8}
            allowDecimals={false}
            tickCount={percentageData.length}
          />
          <YAxis
            type="number"
            domain={[ 'dataMin', 100 ]}
            interval="preserveStartEnd"
            axisLine={false}
            padding={{ top: 0, bottom: 0 }}
            tickLine={false}
            tick={customYAxisTick || <CustomYAxisTick customstrokeWidth="0" />}
            ticks={[ 0, 25, 50, 75, 100 ]}
          >
            {yAxisLabel}
          </YAxis>
          <CartesianGrid vertical={false} />
          {
            tooltipVisibility &&
              (
                <Tooltip
                  viewBox={{ x: 0, y: 0, width: 100, height: 100 }}
                  isAnimationActive={false}
                  cursor={{ stroke: '#113750', strokeWidth: 2 }}
                  content={content =>
                    customTooltip &&
                      React.cloneElement(customTooltip, {
                        content,
                        config: updatedConfig
                      }) ||
                      (
                        <TooltipChart
                          content={content}
                          config={updatedConfig}
                          showTotal
                          getCustomYLabelFormat={getTooltipLabelFormat}
                        />
                      )}
                  filterNull={false}
                />
              )
          }
          {
            config.columns &&
              config.columns.y.map(column => (
                <Area
                  key={column.value}
                  dataKey={column.value}
                  dot={false}
                  stackId={1}
                  stroke={'transparent' || ''}
                  strokeWidth={0}
                  isAnimationActive={
                    isUndefined(config.animation) ? true : config.animation
                  }
                  fill={config.theme[column.value].fill || ''}
                  type={stepped ? 'step' : 'linear'}
                />
              ))
          }
        </ComposedChart>
      </ResponsiveContainer>
    );
  }
}

ChartPercentage.propTypes = {
  config: PropTypes.object.isRequired,
  data: PropTypes.array,
  height: PropTypes.oneOfType([
    PropTypes.number,
    // % accepted
    PropTypes.string
  ]),
  onMouseMove: PropTypes.func,
  stepped: PropTypes.bool,
  customYAxisTick: PropTypes.node,
  customXAxisTick: PropTypes.node,
  customTooltip: PropTypes.node,
  showUnit: PropTypes.bool
};

ChartPercentage.defaultProps = {
  height: 500,
  data: [],
  onMouseMove: () => {
  },
  stepped: false,
  customYAxisTick: null,
  customXAxisTick: null,
  customTooltip: null,
  showUnit: false
};

export default ChartPercentage;
