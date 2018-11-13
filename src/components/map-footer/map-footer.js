import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import styles from './map-footer-styles.scss';

class MapFooter extends PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    const { title, buckets } = this.props.data;
    const { theme } = this.props;

    return (
      <div className={cx(styles.container, theme.container)}>
        <span className={cx(styles.title, theme.title)}>{title}</span>
        <div>
          {buckets.map(value => (
            <span
              className={cx(styles.bucket, theme.bucket)}
              style={{ backgroundColor: value }}
              key={value}
            />
          ))}
        </div>
      </div>
    );
  }
}

MapFooter.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
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
