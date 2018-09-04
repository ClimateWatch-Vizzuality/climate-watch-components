import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
import { isMicrosoftBrowser, getCustomTicks } from 'utils';
import isUndefined from 'lodash/isUndefined';

import {
  ComposedChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceDot,
  ReferenceLine,
  Label,
  ResponsiveContainer
} from 'recharts';
import TooltipChart from 'components/charts/tooltip-chart';
import { format } from 'd3-format';

import { getDataWithTotal, getDomain } from './stacked-area-selectors';
import { CustomXAxisTick, CustomYAxisTick } from './axis-ticks';

function getMaxValue(data) {
  const lastData = data[data.length - 1];
  return { x: lastData.x, y: lastData.total };
}

class ChartStackedArea extends PureComponent {
  constructor() {
    super();
    this.state = { showLastPoint: true };
  }

  setLastPoint = showLastPoint => {
    this.setState({ showLastPoint });
  };

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

  renderLastPoint() {
    const { points, data, config } = this.props;
    const stackedAreaState = { points, data, config };
    const lastData = getMaxValue(getDataWithTotal(stackedAreaState));
    const isEdgeOrExplorer = isMicrosoftBrowser();
    return (
      <ReferenceDot
        x={lastData.x}
        y={lastData.y}
        fill="#113750"
        stroke="#fff"
        strokeWidth={2}
        r={6}
      >
        <Label
          value={lastData.x}
          position="top"
          fill="#8f8fa1"
          fontSize="13px"
          offset={25}
          stroke="#fff"
          strokeWidth={isEdgeOrExplorer ? 0 : 8}
          style={{ paintOrder: 'stroke' }}
        />
        <Label
          value={`${format('.3s')(lastData.y)}t`}
          position="top"
          fill="#113750"
          fontSize="18px"
          stroke="#fff"
          strokeWidth={isEdgeOrExplorer ? 0 : 8}
          style={{ paintOrder: 'stroke' }}
        />
      </ReferenceDot>
    );
  }

  render() {
    const { tooltipVisibility, showLastPoint } = this.state;
    const {
      data,
      config,
      height,
      points,
      includeTotalLine,
      stepped,
      customXAxisTick,
      customYAxisTick,
      customTooltip
    } = this.props;
    const stackedAreaState = { points, data, config };
    const dataWithTotal = getDataWithTotal(stackedAreaState);
    const domain = getDomain(stackedAreaState);

    if (!dataWithTotal.length) return null;
    const tickColumns = {
      x: config.columns.x,
      y: config.columns.y.concat({ value: 'y' })
    };
    const tickValues = getCustomTicks(
      tickColumns,
      dataWithTotal.concat(points),
      5
    );
    return (
      <ResponsiveContainer height={height}>
        <ComposedChart
          data={dataWithTotal}
          margin={{ top: 45, right: 20, left: -10, bottom: 0 }}
          onMouseMove={this.handleMouseMove}
          onMouseLeave={() => this.setLastPoint(true)}
          onMouseEnter={() => this.setLastPoint(false)}
          stackOffset="sign"
        >
          <XAxis
            domain={domain.x}
            type="number"
            dataKey="x"
            padding={{ left: 30, right: 40 }}
            tick={customXAxisTick || <CustomXAxisTick customstrokeWidth="0" />}
            tickSize={8}
            allowDecimals={false}
            tickCount={dataWithTotal.length + points.length}
          />
          <YAxis
            type="number"
            domain={domain.y}
            interval={0}
            axisLine={false}
            padding={{ top: 0, bottom: 0 }}
            tickLine={false}
            tick={
              customYAxisTick ||
                <CustomYAxisTick customstrokeWidth="0" unit="t" />
            }
            ticks={tickValues.ticks}
          />
          <CartesianGrid vertical={false} />
          {
            tickValues.min < 0 &&
              <ReferenceLine y={0} strokeWidth="2" stroke="#666" fill="" />
          }
          {
            tooltipVisibility &&
              (
                <Tooltip
                  viewBox={{ x: 0, y: 0, width: 100, height: 100 }}
                  isAnimationActive={false}
                  cursor={{ stroke: '#113750', strokeWidth: 2 }}
                  content={content =>
                    customTooltip &&
                      React.cloneElement(customTooltip, { content, config }) ||
                      (
                        <TooltipChart
                          content={content}
                          config={config}
                          showTotal
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
          {
            includeTotalLine &&
              (
                <Line
                  key="total"
                  dataKey="total"
                  dot={false}
                  stroke="#113750"
                  strokeWidth={2}
                  type={stepped ? 'step' : 'linear'}
                />
              )
          }
          {showLastPoint && this.renderLastPoint()}
        </ComposedChart>
      </ResponsiveContainer>
    );
  }
}

ChartStackedArea.propTypes = {
  config: PropTypes.object.isRequired,
  points: PropTypes.array,
  data: PropTypes.array,
  height: PropTypes.oneOfType([
    PropTypes.number,
    // % accepted
    PropTypes.string
  ]),
  onMouseMove: PropTypes.func,
  includeTotalLine: PropTypes.bool,
  stepped: PropTypes.bool,
  customYAxisTick: PropTypes.node,
  customXAxisTick: PropTypes.node,
  customTooltip: PropTypes.node
};

ChartStackedArea.defaultProps = {
  height: 500,
  data: [],
  points: [],
  onMouseMove: () => {
  },
  includeTotalLine: true,
  stepped: false,
  customYAxisTick: null,
  customXAxisTick: null,
  customTooltip: null
};

export default ChartStackedArea;
