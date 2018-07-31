import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './icon-styles.scss';

/**
 * Icon component for displaying an icon
 */
const Icon = ({ icon, theme, onClick }) => {
  const classNames = cx(styles.icon, onClick ? styles.cursor : '', theme.icon);

  return <img className={classNames} src={icon} alt="icon" onClick={onClick} />;
};

Icon.propTypes = {
  /**
   * The icon itself
   */
  icon: PropTypes.string,
  /**
   * Themable options
   */
  theme: PropTypes.shape({ icon: PropTypes.string }),
  /**
   * The onClick action occurring when user clicks on the icon
   */
  onClick: PropTypes.func
};

Icon.defaultProps = {
  theme: {},
  onClick: () => {
  },
  icon: ''
};

export default Icon;
