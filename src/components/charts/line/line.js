import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceArea,
  ReferenceLine
} from 'recharts';
import { getMaxValue, getCustomTicks } from 'utils';
import TooltipChart from 'components/charts/tooltip-chart';
import debounce from 'lodash/debounce';
import isUndefined from 'lodash/isUndefined';
import yAxisLabel from 'components/charts/y-axis-label';
import DividerLine from '../projected-data/divider-line';
import ProjectedData from '../projected-data';
import { CustomXAxisTick, CustomYAxisTick } from './axis-ticks';
import {
  getDataMaxMin,
  getDataWithTotal,
  getDomain,
  getDiscontinousScale
} from '../selectors/chart-selectors';

class ChartLine extends PureComponent {
  constructor() {
    super();
    this.state = { activePoint: null };
    this.handleProjectedDataHover = this.handleProjectedDataHover.bind(this);
  }

  handleProjectedDataHover(activePoint) {
    this.setState({ activePoint });
  }

  debouncedMouseMove = debounce(
    year => {
      this.props.onMouseMove(year);
    },
    80
  );

  handleMouseMove = e => {
    const { tooltipVisibility: currentTooltipVisibility } = this.state;
    const { onMouseMove } = this.props;
    const activeCoordinateX = e && e.activeCoordinate && e.activeCoordinate.x;
    const chartX = e && e.chartX || 0;
    const tooltipVisibility = activeCoordinateX >= chartX - 30;
    if (currentTooltipVisibility !== tooltipVisibility) {
      this.setState({ tooltipVisibility }, () => onMouseMove(e));
    }
    const year = e && e.activeLabel;
    if (year) {
      this.debouncedMouseMove(year);
    }
  };

  render() {
    const {
      dots,
      config,
      data,
      height,
      margin,
      domain: customDomain,
      showUnit,
      forceFixedFormatDecimals,
      lineType,
      customXAxisTick,
      customYAxisTick,
      customTooltip,
      getCustomYLabelFormat,
      projectedData
    } = this.props;
    const { activePoint, tooltipVisibility } = this.state;
    const unit = showUnit && get(config, 'axes.yLeft.unit', null);
    const suffix = get(config, 'axes.yLeft.suffix', null);
    const lineState = { projectedData, data, config };
    const dataMaxMin = getDataMaxMin(lineState);
    const domain = projectedData ? getDomain(lineState) : customDomain;
    const dataWithTotal = getDataWithTotal(lineState);
    const lastData = getMaxValue(getDataWithTotal(lineState));
    const xAxisScale = getDiscontinousScale(lineState) || 'time';

    const tickColumns = {
      x: config.columns.x,
      y: config.columns.y.concat({ value: 'y' })
    };

    const tickValues = getCustomTicks(
      tickColumns,
      dataWithTotal.concat(projectedData),
      5
    );

    return (
      <ResponsiveContainer height={height}>
        <LineChart
          data={data}
          margin={margin}
          onMouseMove={this.handleMouseMove}
        >
          <XAxis
            dataKey="x"
            scale={xAxisScale}
            type="number"
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
                    precision={config.precision}
                    suffix={suffix}
                    getCustomYLabelFormat={getCustomYLabelFormat}
                  />
                )
            }
            domain={domain && domain.y || [ 'auto', 'auto' ]}
            interval="preserveStartEnd"
          >
            {yAxisLabel(unit)}
          </YAxis>
          <CartesianGrid vertical={false} />
          {
            tickValues.min < 0 &&
              <ReferenceLine y={0} strokeWidth="2" stroke="#666" fill="" />
          }
          {
            tooltipVisibility &&
              (
                <Tooltip
                  isAnimationActive={false}
                  cursor={{ stroke: '#113750', strokeWidth: 2 }}
                  filterNull={false}
                  content={content =>
                    customTooltip &&
                      React.cloneElement(customTooltip, { content, config }) ||
                      (
                        <TooltipChart
                          content={content}
                          config={config}
                          forceFixedFormatDecimals={forceFixedFormatDecimals}
                          getCustomYLabelFormat={getCustomYLabelFormat}
                        />
                      )}
                />
              )
          }
          {
            config.columns && config.columns.y.map(column => {
                const color = config.theme[column.value].stroke || '';
                return (
                  <Line
                    key={column.value}
                    isAnimationActive={
                      isUndefined(config.animation) ? true : config.animation
                    }
                    dot={
                      dots &&
                        !column.hideData &&
                        { strokeWidth: 0, fill: color, radius: 0.5 }
                    }
                    dataKey={column.value}
                    stroke={column.hideData ? 'transparent' : color}
                    strokeWidth={column.hideData ? 0 : 2}
                    type={lineType}
                  />
                );
              })
          }
          {
            projectedData &&
              projectedData.length &&
              DividerLine({ x: lastData.x, labels: config.dividerLine })
          }
          <ReferenceArea
            x1={150}
            x2={180}
            y1={200}
            y2={300}
            stroke="red"
            strokeOpacity={0.3}
          />
          {
            projectedData &&
              projectedData.length &&
              ProjectedData({
                data: projectedData,
                dataMaxMin,
                activePoint,
                handleProjectedDataHover: this.handleProjectedDataHover,
                config
              })
          }
        </LineChart>
      </ResponsiveContainer>
    );
  }
}

ChartLine.propTypes = {
  dots: PropTypes.bool,
  config: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
  projectedData: PropTypes.array,
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
  lineType: PropTypes.string,
  customYAxisTick: PropTypes.node,
  customXAxisTick: PropTypes.node,
  customTooltip: PropTypes.node,
  getCustomYLabelFormat: PropTypes.func
};

ChartLine.defaultProps = {
  projectedData: [],
  dots: true,
  height: '100%',
  showUnit: false,
  onMouseMove: () => {
  },
  margin: { top: 45, right: 0, left: -10, bottom: 0 },
  domain: null,
  forceFixedFormatDecimals: null,
  lineType: 'monotone',
  customYAxisTick: null,
  customXAxisTick: null,
  customTooltip: null,
  getCustomYLabelFormat: null
};

export default ChartLine;
