import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import styles from './loading-styles.scss';

class Loading extends PureComponent {
  render() {
    const { theme, height, mini } = this.props;
    return (
      <div className={cx(styles.container, theme.wrapper)} style={{ height }}>
        <div
          className={cx(
            styles.loader,
            { [styles.loaderMini]: mini },
            theme.loader
          )}
        >
          <span className={cx(styles.loaderTrack, theme.loaderTrack)} />
          <span className={cx(styles.loaderLight, theme.loaderLight)} />
        </div>
      </div>
    );
  }
}

Loading.propTypes = {
  theme: PropTypes.shape({
    wrapper: PropTypes.string,
    loader: PropTypes.string,
    loaderTrack: PropTypes.string,
    loaderLight: PropTypes.string
  }),
  height: PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]),
  mini: PropTypes.bool
};

Loading.defaultProps = { theme: {}, height: 'auto', mini: false };

export default Loading;
