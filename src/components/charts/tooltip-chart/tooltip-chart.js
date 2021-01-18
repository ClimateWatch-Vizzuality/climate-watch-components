import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
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
      if (yValues[b.dataKey] == null) return -1;
      if (yValues[a.dataKey] == null) return 1;
      return yValues[b.dataKey] - yValues[a.dataKey];
    };
    return payload.sort(compare);
  };

  renderValue = (y, labelName, suffix) => {
    if (
      y.payload && (y.payload[labelName] !== null || y.payload.value !== null)
    ) {
      if (Array.isArray(y.payload[labelName])) {
        return `${this.formatValue(
          y.payload[labelName][0]
        )} - ${this.formatValue(y.payload[labelName][1])}${suffix || ''}`;
      }
      let value = y.payload[labelName];
      if (!value && value !== 0) {
        // eslint-disable-next-line prefer-destructuring
        value = y.payload.value;
      }
      if (value || value === 0) {
        return `${this.formatValue(value)}${suffix || ''}`;
      }
    }
    return 'n/a';
  };

  renderTotal(suffix) {
    const { config, content, showTotal } = this.props;
    return showTotal && (
    <div className={cx(styles.label, styles.labelTotal)}>
      <p>
            TOTAL
      </p>
      <p>
        {this.getTotal(config.columns.y, content.payload[0], suffix)}
      </p>
    </div>
      );
  }

  renderIconOrDot(labelName) {
    const { config } = this.props;
    const iconColorProp = column => {
      const { fill, stroke } = config.theme[column];
      return { style: { fill: fill || stroke, stroke } };
    };
    const labelConfig = config.theme[labelName];
    return labelConfig.icon ? (
      <span className={styles.labelIcon}>
        <Icon icon={labelConfig.icon} {...iconColorProp(labelName)} />
      </span>
) : (
  <span
    className={styles.labelDot}
    style={{ backgroundColor: labelConfig && labelConfig.stroke }}
  />
);
  }

  render() {
    const { config, content } = this.props;
    const unit = config &&
      config.axes &&
      config.axes.yLeft &&
      config.axes.yLeft.unit;
    const suffix = config &&
      config.axes &&
      config.axes.yLeft &&
      config.axes.yLeft.suffix;
    const title = config &&
      config.axes &&
      config.axes.yLeft &&
      config.axes.yLeft.label;
    return (
      <div className={styles.tooltip}>
        <div className={styles.tooltipHeader}>
          <span className={cx(styles.labelName, styles.labelNameBold)}>
            {content.label || title}
          </span>
          <span
            className={styles.unit}
            // eslint-disable-next-line
            dangerouslySetInnerHTML={{ __html: unit }}
          />
        </div>
        {this.renderTotal(suffix)}
        {
          content &&
            content.payload &&
            content.payload.length > 0 &&
            this.sortByValue(content.payload).map(y => {
              const hasDataKey = !!y.dataKey;
              const labelName = y.name || y.dataKey;
              return y.payload &&
                y.dataKey !== 'total' &&
                (hasDataKey
                  ? config.tooltip[labelName] && config.tooltip[labelName].label
                  : config.tooltip[labelName])
                ? (
                  <div key={`${labelName}`} className={styles.label}>
                    <div className={styles.legend}>
                      {this.renderIconOrDot(labelName)}
                      <p
                        className={cx(styles.labelName, {
                        [styles.notAvailable]: !(y.payload &&
                          y.payload[labelName])
                      })}
                      >
                        {
                        config.theme[labelName] &&
                          config.tooltip[labelName].label
                      }
                      </p>
                    </div>
                    <p className={styles.labelValue}>
                      {this.renderValue(y, labelName, suffix)}
                    </p>
                  </div>
)
                : null;
            })
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
  content: PropTypes.shape().isRequired,
  config: PropTypes.shape({
    animation: PropTypes.bool,
    columns: PropTypes.object,
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
        suffix: PropTypes.string
      })
    })
  }).isRequired,
  /** Show total or not in the tooltip */
  showTotal: PropTypes.bool,
  /** Number of decimals to force the format to */
  forceFixedFormatDecimals: PropTypes.number,
  /** Function that gets the value and should returns a formatted value for the Y label */
  getCustomYLabelFormat: PropTypes.func
};

TooltipChart.defaultProps = {
  showTotal: false,
  forceFixedFormatDecimals: null,
  getCustomYLabelFormat: null
};

export default TooltipChart;
