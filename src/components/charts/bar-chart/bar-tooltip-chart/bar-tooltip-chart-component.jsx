import React, { PureComponent } from 'react';
import Proptypes from 'prop-types';
import { format } from 'd3-format';
import styles from './bar-tooltip-chart-styles.scss';

class BarTooltipChart extends PureComponent {
  sortByValue = payload => {
    const yValues = payload[0].payload;
    const compare = (a, b) => {
      if (yValues[b.dataKey] === undefined) return -1;
      if (yValues[a.dataKey] === undefined) return 1;
      return yValues[b.dataKey] - yValues[a.dataKey];
    };
    return payload.sort(compare);
  };

  renderValue = y => {
    if (y.payload && y.payload[y.dataKey] !== undefined) {
      return format(',')(y.payload[y.dataKey]);
    }
    return 'n/a';
  };

  render() {
    const { config, content } = this.props;
    const yUnit = config &&
      config.axes &&
      config.axes.yLeft &&
      config.axes.yLeft.unit;
    const xUnit = config &&
      config.axes &&
      config.axes.xBottom &&
      config.axes.xBottom.unit;

    return (
      <div className={styles.tooltip}>
        <div className={styles.tooltipHeader}>
          {xUnit && (
            <span
              className={styles.unit}
              /* eslint-disable-line*/
              dangerouslySetInnerHTML={{ __html: xUnit }}
            />
          )}
          <span>
            {content.label}
          </span>
        </div>
        {
          content &&
            content.payload &&
            content.payload.length > 0 &&
            content.payload.map(
              y =>
                y.payload &&
                  y.dataKey !== 'total' &&
                  config.tooltip[y.dataKey] && 
                  config.tooltip[y.dataKey].label
                  ? (
                    <div key={`${y.dataKey}`} className={styles.tooltipHeader}>
                      {yUnit && (
                        <span
                          className={styles.unit}
                          /* eslint-disable-line*/
                          dangerouslySetInnerHTML={{ __html: config.tooltip[y.dataKey].label }}
                        />
                      )}
                      <span>
                        {this.renderValue(y)}
                      </span>
                    </div>
                  )
                  : null
            )
        }
        {content && !content.payload && <div>No data available</div>}
      </div>
    );
  }
}

BarTooltipChart.propTypes = {
  content: Proptypes.object,
  config: Proptypes.object
};

BarTooltipChart.defaultProps = { content: {}, config: {} };

export default BarTooltipChart;
