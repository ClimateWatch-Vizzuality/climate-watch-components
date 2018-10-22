import React, { PureComponent } from 'react';
import Proptypes from 'prop-types';
import { format } from 'd3-format';
import cx from 'classnames';

import Icon from 'components/icon';
import styles from './tooltip-chart-styles.scss';

class TooltipChart extends PureComponent {
  formatValue(value) {
    const { forceFixedFormatDecimals, getCustomYLabelFormat } = this.props;
    if (getCustomYLabelFormat) return getCustomYLabelFormat(value);
    return format(
      forceFixedFormatDecimals ? `.${forceFixedFormatDecimals}f` : '.2s'
    )(value);
  }

  getTotal = (keys, data, suffix) => {
    if (!keys || !data) return '';
    let total = 0;
    let hasData = false;
    keys.forEach(key => {
      if (data.payload[key.value] || data.payload[key.value] === 0) {
        hasData = true;
        total += data.payload[key.value];
      }
    });
    return hasData ? `${this.formatValue(total)}${suffix || ''}` : 'n/a';
  };

  sortByValue = payload => {
    const yValues = payload[0].payload;
    const compare = (a, b) => {
      if (yValues[b.dataKey] === undefined) return -1;
      if (yValues[a.dataKey] === undefined) return 1;
      return yValues[b.dataKey] - yValues[a.dataKey];
    };
    return payload.sort(compare);
  };

  renderValue = (y, suffix) => {
    if (y.payload && y.payload[y.dataKey] !== undefined) {
      if (Array.isArray(y.payload[y.dataKey])) {
        return `${this.formatValue(
          y.payload[y.dataKey][0]
        )} - ${this.formatValue(y.payload[y.dataKey][1])}${suffix || ''}`;
      }
      return `${this.formatValue(y.payload[y.dataKey])}${suffix || ''}`;
    }
    return 'n/a';
  };

  render() {
    const { config, content, showTotal } = this.props;
    const unit = config &&
      config.axes &&
      config.axes.yLeft &&
      config.axes.yLeft.unit;
    const suffix = config &&
      config.axes &&
      config.axes.yLeft &&
      config.axes.yLeft.suffix;
    const iconColorProp = column => {
      const { fill, stroke } = config.theme[column];
      return { style: { fill: fill || stroke, stroke } };
    };
    return (
      <div className={styles.tooltip}>
        <div className={styles.tooltipHeader}>
          <span className={cx(styles.labelName, styles.labelNameBold)}>
            {content.label}
          </span>
          <span
            className={styles.unit}
            // eslint-disable-next-line
            dangerouslySetInnerHTML={{ __html: unit }}
          />
        </div>
        {
          showTotal && (
          <div className={cx(styles.label, styles.labelTotal)}>
            <p>
                  TOTAL
            </p>
            <p>
              {this.getTotal(config.columns.y, content.payload[0], suffix)}
            </p>
          </div>
            )
        }
        {
          content &&
            content.payload &&
            content.payload.length > 0 &&
            this.sortByValue(content.payload, config).map(
              y =>
                y.payload &&
                  y.dataKey !== 'total' &&
                  config.tooltip[y.dataKey].label
                  ? (
                    <div key={`${y.dataKey}`} className={styles.label}>
                      <div className={styles.legend}>
                        {
                        config.theme[y.dataKey].icon
                          ? (
                            <span className={styles.labelIcon}>
                              <Icon
                                icon={config.theme[y.dataKey].icon}
                                {...iconColorProp(y.dataKey)}
                              />
                            </span>
)
                          : (
                            <span
                              className={styles.labelDot}
                              style={{
                              backgroundColor: config.theme[y.dataKey] &&
                                config.theme[y.dataKey].stroke
                            }}
                            />
)
                      }
                        <p
                          className={cx(styles.labelName, {
                          [styles.notAvailable]: !(y.payload &&
                            y.payload[y.dataKey])
                        })}
                        >
                          {
                          config.theme[y.dataKey] &&
                            config.tooltip[y.dataKey].label
                        }
                        </p>
                      </div>
                      <p className={styles.labelValue}>
                        {this.renderValue(y, suffix)}
                      </p>
                    </div>
)
                  : null
            )
        }
        {
          content && !content.payload && (
          <div>
                No data
          </div>
            )
        }
      </div>
    );
  }
}

TooltipChart.propTypes = {
  content: Proptypes.object.isRequired,
  config: Proptypes.object.isRequired,
  showTotal: Proptypes.bool,
  forceFixedFormatDecimals: Proptypes.number,
  getCustomYLabelFormat: Proptypes.func
};

TooltipChart.defaultProps = {
  showTotal: false,
  forceFixedFormatDecimals: null,
  getCustomYLabelFormat: null
};

export default TooltipChart;
