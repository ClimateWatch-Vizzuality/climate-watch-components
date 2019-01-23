import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
import { isMicrosoftBrowser, getCustomTicks, getMaxValue } from 'utils';
import isUndefined from 'lodash/isUndefined';
import has from 'lodash/has';
import { format } from 'd3-format';
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
import yAxisLabel from 'components/charts/y-axis-label';
import DividerLine from '../projected-data/divider-line';
import ProjectedData from '../projected-data';
import {
  getDataWithTotal,
  getDomain,
  getDataMaxMin
} from '../selectors/chart-selectors';
import { CustomXAxisTick, CustomYAxisTick } from './axis-ticks';

const renderLastPoint = lastData => {
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
};

class ChartStackedArea extends PureComponent {
  constructor() {
    super();
    this.state = { activePoint: null, showLastPoint: true };
    this.handleProjectedDataHover = this.handleProjectedDataHover.bind(this);
  }

  handleProjectedDataHover(activePoint) {
    this.setState({ activePoint });
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

  addHiddenColumns = content => {
    const { data, config } = this.props;
    const hiddenColumns = config.columns.y.filter(c => c.hideData);
    if (!hiddenColumns || !data || content.payload.length === 0) return content;
    const updatedContent = { ...content };
    const extraContent = hiddenColumns.map(c => ({ ...c, name: c.value }));
    const year = updatedContent.payload[0].payload.x;
    const payload = updatedContent.payload.concat(extraContent).map(c => {
      const updatedC = { ...c };
      if (!c.payload && !hiddenColumns.map(col => col.value).includes(c.name))
        return c;
      updatedC.payload = data.find(t => year === t.x);
      return updatedC;
    });
    const d = { ...updatedContent, payload };
    return d;
  };

  render() {
    const { tooltipVisibility, showLastPoint, activePoint } = this.state;
    const {
      data,
      config,
      height,
      projectedData,
      includeTotalLine,
      stepped,
      customXAxisTick,
      customYAxisTick,
      customTooltip,
      getCustomYLabelFormat,
      showUnit,
      chartMargin
    } = this.props;

    const stackedAreaState = { projectedData, data, config };
    const dataWithTotal = getDataWithTotal(stackedAreaState);
    const domain = getDomain(stackedAreaState);
    const lastData = getMaxValue(getDataWithTotal(stackedAreaState));
    const dataMaxMin = getDataMaxMin(stackedAreaState);

    if (!dataWithTotal.length) return null;
    const tickColumns = {
      x: config.columns.x,
      y: config.columns.y.concat({ value: 'y' })
    };
    const tickValues = getCustomTicks(
      tickColumns,
      dataWithTotal.concat(projectedData),
      5
    );
    const suffix = has(config, 'axes.yLeft.suffix')
      ? config.axes.yLeft.suffix
      : null;
    const unit = showUnit && has(config, 'axes.yLeft.unit')
      ? config.axes.yLeft.unit
      : null;

    return (
      <ResponsiveContainer height={height}>
        <ComposedChart
          data={dataWithTotal}
          margin={chartMargin}
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
            tickCount={
              projectedData
                ? dataWithTotal.length + projectedData.length
                : dataWithTotal.length
            }
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
                (
                  <CustomYAxisTick
                    customstrokeWidth="0"
                    suffix={suffix}
                    getCustomYLabelFormat={getCustomYLabelFormat}
                  />
                )
            }
            ticks={tickValues.ticks}
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
                  viewBox={{ x: 0, y: 0, width: 100, height: 100 }}
                  isAnimationActive={false}
                  cursor={{ stroke: '#113750', strokeWidth: 2 }}
                  content={content =>
                    customTooltip &&
                      React.cloneElement(customTooltip, { content, config }) ||
                      (
                        <TooltipChart
                          content={this.addHiddenColumns(content)}
                          config={config}
                          showTotal
                          getCustomYLabelFormat={getCustomYLabelFormat}
                        />
                      )}
                  filterNull={false}
                />
              )
          }
          {
            config.columns && config.columns.y
                .filter(c => !c.hideData)
                .map(column => (
                  <Area
                    key={column.value}
                    dataKey={column.value}
                    dot={false}
                    stackId={1}
                    stroke="transparent"
                    strokeWidth={0}
                    isAnimationActive={
                      isUndefined(config.animation) ? true : config.animation
                    }
                    fill={
                      !column.hideData && config.theme[column.value].fill ||
                        'transparent'
                    }
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
          {showLastPoint && renderLastPoint(lastData)}
          {
            projectedData &&
              projectedData.length &&
              DividerLine({ x: lastData.x, labels: config.dividerLine })
          }
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
        </ComposedChart>
      </ResponsiveContainer>
    );
  }
}

ChartStackedArea.propTypes = {
  config: PropTypes.object.isRequired,
  projectedData: PropTypes.array,
  data: PropTypes.array,
  height: PropTypes.oneOfType([
    PropTypes.number,
    // % accepted
    PropTypes.string
  ]),
  onMouseMove: PropTypes.func,
  /** Margin of the chart */
  chartMargin: PropTypes.shape({
    top: PropTypes.number,
    bottom: PropTypes.number,
    left: PropTypes.number,
    right: PropTypes.number
  }),
  includeTotalLine: PropTypes.bool,
  stepped: PropTypes.bool,
  customYAxisTick: PropTypes.node,
  customXAxisTick: PropTypes.node,
  customTooltip: PropTypes.node,
  getCustomYLabelFormat: PropTypes.func,
  showUnit: PropTypes.bool
};

ChartStackedArea.defaultProps = {
  height: 500,
  data: [],
  projectedData: [],
  onMouseMove: () => {
  },
  chartMargin: { top: 45, right: 20, left: -10, bottom: 0 },
  includeTotalLine: true,
  stepped: false,
  customYAxisTick: null,
  customXAxisTick: null,
  customTooltip: null,
  getCustomYLabelFormat: null,
  showUnit: false
};

export default ChartStackedArea;
