import React, { PureComponent } from 'react';
import Proptypes from 'prop-types';
import { format } from 'd3-format';
import cx from 'classnames';

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
    const unit = config &&
      config.axes &&
      config.axes.yLeft &&
      config.axes.yLeft.unit;
    return (
      <div className={styles.tooltip}>
        <div className={styles.tooltipHeader}>
          <span className={cx(styles.labelName)}>
            {content.label}
          </span>
          <span
            className={styles.unit}
            /* eslint-disable-line*/
            dangerouslySetInnerHTML={{ __html: unit }}
          />
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
                    <div key={`${y.dataKey}`} className={styles.label}>
                      <p className={styles.labelValue}>
                        {this.renderValue(y)}
                      </p>
                    </div>
)
                  : null
            )
        }
        {content && !content.payload && <div>No data fool</div>}
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
