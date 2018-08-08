import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
// import ChartStackedArea from 'components/charts/stacked-area';
import LineChart from 'components/charts/line';
import LegendChart from 'components/charts/legend-chart';
import Loading from 'components/loading';
import NoContent from 'components/no-content';
import cx from 'classnames';

import styles from './chart-styles.scss';

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
      customMessage,
      model,
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

    // const ChartComponent = type === 'line' ? LineChart : ChartStackedArea;
    const ChartComponent = LineChart;
    // TODO REMOVE THIS FOR THE ABOVE LINE
    const hasError = !loading && (error || !hasData);
    const hasDataOptions = !loading && dataOptions;
    return (
      <div className={cx(styles.wrapper, theme.wrapper)}>
        {loading && <Loading light className={styles.loader} />}
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
  type: PropTypes.string.isRequired,
  error: PropTypes.bool,
  loading: PropTypes.bool.isRequired,
  hideRemoveOptions: PropTypes.bool,
  dataOptions: PropTypes.array,
  dataSelected: PropTypes.array,
  data: PropTypes.array.isRequired,
  config: PropTypes.object.isRequired,
  height: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
  customMessage: PropTypes.oneOfType([ PropTypes.string, PropTypes.object ]),
  model: PropTypes.object,
  theme: PropTypes.shape({ wrapper: PropTypes.string }),
  onLegendChange: PropTypes.func
};

Chart.defaultProps = {
  height: 300,
  error: false,
  dataOptions: [],
  dataSelected: [],
  hideRemoveOptions: false,
  theme: {},
  model: {},
  customMessage: '',
  onLegendChange: () => {
  }
};

export default Chart;
