import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ComposedChart
} from 'recharts';
import cx from 'classnames';
import TooltipChart from 'components/charts/tooltip-chart';
import LegendChart from 'components/charts/legend-chart';
import debounce from 'lodash/debounce';
import {
  CustomXAxisTick,
  CustomYAxisTick
} from 'components/charts/line/axis-ticks';
import yAxisLabel from 'components/charts/y-axis-label';
import styles from './chart-composed-styles.scss';

class ChartComposed extends PureComponent {
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
      dataOptions,
      loading,
      onLegendChange,
      model,
      hideRemoveOptions,
      dataSelected,
      height,
      margin,
      domain,
      showUnit,
      forceFixedFormatDecimals,
      theme,
      children,
      areaAsBackgroundForCartesianGrid,
      customXAxisTick,
      customYAxisTick,
      customTooltip,
      getCustomYLabelFormat
    } = this.props;
    const unit = showUnit && get(config, 'axes.yLeft.unit', null);
    const suffix = get(config, 'axes.yLeft.suffix', null);
    const yAxisScale = get(config, 'axes.yLeft.scale', 'auto');
    const hasDataOptions = !loading && dataOptions;

    return (
      <div className={styles.wrapper}>
        <ResponsiveContainer height={height}>
          <ComposedChart
            data={data}
            margin={margin}
            onMouseMove={this.handleMouseMove}
          >
            {areaAsBackgroundForCartesianGrid}
            <XAxis
              dataKey="x"
              scale="time"
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
              scale={yAxisScale}
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
            {children}
          </ComposedChart>
        </ResponsiveContainer>
        {
          hasDataOptions &&
            (
              <LegendChart
                theme={{ wrapper: cx(styles.legend, theme.legend) }}
                config={config}
                dataOptions={dataOptions}
                dataSelected={dataSelected}
                hideRemoveOptions={hideRemoveOptions}
                onChange={onLegendChange}
                model={model}
              />
            )
        }
      </div>
    );
  }
}

ChartComposed.propTypes = {
  config: PropTypes.shape({
    animation: PropTypes.bool,
    columns: PropTypes.object,
    /** Custom icons might be passed with the stroke and fill */
    theme: PropTypes.object,
    axes: PropTypes.shape({
      xBottom: PropTypes.shape({
        name: PropTypes.string,
        unit: PropTypes.string,
        format: PropTypes.string,
        suffix: PropTypes.string
      }),
      yLeft: PropTypes.shape({
        name: PropTypes.string,
        unit: PropTypes.string,
        format: PropTypes.string,
        suffix: PropTypes.string,
        scale: PropTypes.string
      })
    })
  }),
  /** Data for the chart */
  data: PropTypes.array,
  /** Data options for LegendChart */
  dataOptions: PropTypes.array,
  loading: PropTypes.bool,
  onLegendChange: PropTypes.func,
  model: PropTypes.object,
  hideRemoveOptions: PropTypes.bool,
  dataSelected: PropTypes.array,
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
  theme: PropTypes.shape({ legend: PropTypes.string }),
  children: PropTypes.node.isRequired,
  /** Area component used as a background for cartesian grid */
  areaAsBackgroundForCartesianGrid: PropTypes.node,
  /** Custom X Axis Tick component to pass it down to chart */
  customXAxisTick: PropTypes.node,
  /** Custom Y Axis Tick component to pass it down to chart */
  customYAxisTick: PropTypes.node,
  /** Custom tooltip to pass down to chart */
  customTooltip: PropTypes.node,
  /** Function transforming y axis value */
  getCustomYLabelFormat: PropTypes.func
};

ChartComposed.defaultProps = {
  height: '100%',
  config: {},
  data: {},
  showUnit: false,
  onMouseMove: () => {
  },
  dataOptions: [],
  loading: false,
  onLegendChange: () => {
  },
  model: null,
  hideRemoveOptions: false,
  dataSelected: [],
  margin: { top: 10, right: 0, left: -10, bottom: 0 },
  domain: null,
  forceFixedFormatDecimals: null,
  theme: {},
  areaAsBackgroundForCartesianGrid: null,
  customXAxisTick: null,
  customYAxisTick: null,
  customTooltip: null,
  getCustomYLabelFormat: null
};

export default ChartComposed;
