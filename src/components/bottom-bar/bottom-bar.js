import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import styles from './bottom-bar-styles.scss';

function createMarkup(text) {
  return { __html: text };
}

/**
 * Bottom Bar component
 */
const BottomBar = ({ theme, footerText, children }) => (
  <div className={cx(styles.container, theme.bottomBarContainer)}>
    <div className={cx(styles.row, styles.bottomBar, theme.bottomBar)}>
      {children}
      <span
        className={cx(styles.text, styles.align, theme.bottomBarText)}
        dangerouslySetInnerHTML={createMarkup(footerText)}
      />
    </div>
  </div>
);

BottomBar.propTypes = {
  /** Read only text to display */
  footerText: PropTypes.string,
  /** Theming options */
  theme: PropTypes.shape({
    bottomBarContainer: PropTypes.string,
    bottomBarText: PropTypes.string,
    bottomBar: PropTypes.string
  }),
  children: PropTypes.node
};

BottomBar.defaultProps = { children: null, theme: {}, footerText: '' };

export default BottomBar;
