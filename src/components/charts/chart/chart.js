import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ChartStackedArea from 'components/charts/stacked-area';
import LineChart from 'components/charts/line';
import SimpleBarChart from 'components/charts/bar-chart';
import LegendChart from 'components/charts/legend-chart';
import Loading from 'components/loading';
import NoContent from 'components/no-content';
import cx from 'classnames';

import styles from './chart-styles.scss';

/**
 * Rechart wrapper for line an area charts
 */
class Chart extends PureComponent {
  render() {
    const {
      theme,
      type,
      error,
      loading,
      dataOptions,
      dataSelected,
      data,
      config,
      height,
      model,
      customMessage,
      hideRemoveOptions,
      onLegendChange
    } = this.props;
    const hasData = data && data.length > 0;
    const getMessage = () => {
      if (error) return 'Something went wrong';
      if (customMessage) return customMessage;
      if (!dataSelected || !dataSelected.length > 0) return 'No data selected';
      return 'No data available';
    };
    const chartType = {
      line: LineChart,
      area: ChartStackedArea,
      bar: SimpleBarChart
    };
    const ChartComponent = chartType[type];

    const hasError = !loading && (error || !hasData);
    const hasDataOptions = !loading && dataOptions;
    return (
      <div className={cx(styles.wrapper, theme.wrapper)}>
        {loading && <Loading height={height} light className={styles.loader} />}
        {
          hasError &&
            (
              <NoContent
                message={getMessage()}
                className={styles.noContent}
                minHeight={height}
              />
            )
        }
        {!loading && hasData && config && <ChartComponent {...this.props} />}
        {
          hasDataOptions &&
            (
              <LegendChart
                theme={{ wrapper: styles.legend }}
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

Chart.propTypes = {
  /** Type of the charts supported so far */
  type: PropTypes.oneOf([ 'line', 'area', 'bar' ]).isRequired,
  /** Custom dot for line visualization */
  // eslint-disable-next-line
  dots: PropTypes.bool,
  /** Shows an error when something unexpected happen */
  error: PropTypes.bool,
  /** Custom message when error */
  customMessage: PropTypes.string,
  /** Shows a spinner while it is loading */
  loading: PropTypes.bool.isRequired,
  /** Options removal available */
  hideRemoveOptions: PropTypes.bool,
  /** Array of options in the legend */
  dataOptions: PropTypes.array,
  /** Array of options active in the legend */
  dataSelected: PropTypes.array,
  /** Callback on legend active values change */
  onLegendChange: PropTypes.func,
  /** Array of chart data */
  data: PropTypes.array.isRequired,
  /** Array of chart data */
  config: PropTypes.object.isRequired,
  /** Initial height of the chart in number or % */
  height: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
  /** Data model url and image */
  model: PropTypes.shape({ url: PropTypes.string, logo: PropTypes.string }),
  /** Customization options */
  theme: PropTypes.shape({ wrapper: PropTypes.string }),
  /** Type of the drawed line if the chart type is line. For example: monotone, linear */
  lineType: PropTypes.string,
  /** Custom X Axis Tick component to pass it down to chart */
  customXAxisTick: PropTypes.node,
  /** Custom Y Axis Tick component to pass it down to chart */
  customYAxisTick: PropTypes.node,
  /** Custom tooltip to pass down to chart */
  customTooltip: PropTypes.node
};

Chart.defaultProps = {
  dots: true,
  height: 300,
  error: false,
  dataOptions: [],
  dataSelected: [],
  hideRemoveOptions: false,
  theme: {},
  model: null,
  customMessage: '',
  onLegendChange: () => {
  },
  lineType: 'monotone',
  customXAxisTick: null,
  customYAxisTick: null,
  customTooltip: null
};

export default Chart;
