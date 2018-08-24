import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Label,
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

import styles from './chart-composed-styles.scss';

class ChartComposed extends PureComponent {
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
      children
    } = this.props;
    const unit = showUnit &&
      config &&
      config.axes &&
      config.axes.yLeft &&
      config.axes.yLeft.unit
      ? config.axes.yLeft.unit
      : null;
    const LineChartMargin = { top: 10, right: 0, left: -10, bottom: 0 };
    const hasDataOptions = !loading && dataOptions;
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
      <div>
        <ResponsiveContainer height={height} margin={margin}>
          <ComposedChart
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
              tick={
                <CustomYAxisTick precision={config.precision} unit={unit} />
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
  config: PropTypes.shape({ columns: PropTypes.object }).isRequired,
  /** Data for the chart */
  data: PropTypes.array.isRequired,
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
  margin: PropTypes.object,
  domain: PropTypes.object,
  theme: PropTypes.shape({ legend: PropTypes.string }),
  children: PropTypes.node.isRequired
};

ChartComposed.defaultProps = {
  height: '100%',
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
  margin: { top: 0, right: 10, left: 10, bottom: 0 },
  domain: null,
  forceFixedFormatDecimals: null,
  theme: {}
};

export default ChartComposed;
