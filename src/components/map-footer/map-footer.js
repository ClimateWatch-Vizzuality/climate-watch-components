import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import styles from './map-footer-styles.scss';

class MapFooter extends PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    const { legend, buckets } = this.props.data;
    const { theme } = this.props;

    return (
      <div className={cx(styles.container, theme.container)}>
        {
          legend &&
            legend.left &&
            <span className={cx(styles.title, theme.title)}>{legend.left}</span>
        }
        <div className={styles.buckets}>
          {buckets.map(value => (
            <span
              className={cx(styles.bucket, theme.bucket)}
              style={{ backgroundColor: value }}
              key={value}
            />
          ))}
        </div>
        {
          legend && legend.right && (
          <span className={cx(styles.title, theme.title)}>
            {legend.right}
          </span>
            )
        }
      </div>
    );
  }
}

MapFooter.propTypes = {
  /** data consists of colors of buckets to render and legend - left is placed on the left side of the buckets and right on the right side. Both are optional. */
  data: PropTypes.shape({
    legend: PropTypes.shape({
      left: PropTypes.string,
      right: PropTypes.string
    }),
    buckets: PropTypes.array.isRequired
  }),
  theme: PropTypes.shape({
    container: PropTypes.string,
    title: PropTypes.string,
    bucket: PropTypes.string
  })
};

MapFooter.defaultProps = { data: { title: '', buckets: [] }, theme: {} };

export default MapFooter;
