import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import styles from './bottom-bar-styles.scss';

/**
 * Bottom Bar component
 */
const BottomBar = ({ theme, footerText, children }) => (
  <div className={cx(styles.container, theme.container)}>
    <div
      className={cx(styles.row, styles.bottomBar, theme.row, theme.bottomBar)}
    >
      {children}
      <span className={cx(styles.text, styles.align, theme.text, theme.align)}>
        {footerText}
      </span>
    </div>
  </div>
);

BottomBar.propTypes = {
  /** Read only text to display */
  footerText: PropTypes.string.isRequired,
  /** Theming options */
  theme: PropTypes.shape({
    row: PropTypes.string,
    bottomBar: PropTypes.string,
    text: PropTypes.string,
    align: PropTypes.string,
    container: PropTypes.string
  }),
  children: PropTypes.node
};

BottomBar.defaultProps = { children: null, theme: {} };

export default BottomBar;
