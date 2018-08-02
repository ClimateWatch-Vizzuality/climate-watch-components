import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import cx from 'classnames';

import styles from './bottom-bar-styles.scss';

/**
 * Bottom Bar component
 */
const BottomBar = ({ theme, linkRoute, linkTitle, footerText }) => (
  <div className={cx(styles.container, theme.container)}>
    <div
      className={cx(styles.row, styles.bottomBar, theme.row, theme.bottomBar)}
    >
      <Link className={styles.text} to={linkRoute}>
        {linkTitle}
      </Link>
      <span className={cx(styles.text, styles.align, theme.text, theme.align)}>
        {footerText}
      </span>
    </div>
  </div>
);

BottomBar.propTypes = {
  /** Which endpoint should the link point to */
  linkRoute: PropTypes.string.isRequired,
  /** Link's title */
  linkTitle: PropTypes.string.isRequired,
  /** Read only text to display */
  footerText: PropTypes.string.isRequired,
  /** Theming options */
  theme: PropTypes.shape({
    row: PropTypes.string,
    bottomBar: PropTypes.string,
    text: PropTypes.string,
    align: PropTypes.string,
    container: PropTypes.string
  })
};

BottomBar.defaultProps = { theme: {} };

export default BottomBar;
