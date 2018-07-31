import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './icon-styles.scss';
import infoIcon from './assets/info.svg';

/**
 * Icon component for displaying an icon
 */
const Icon = ({ icon, theme, onClick }) => {
  const classNames = cx(styles.icon, onClick ? styles.cursor : '', theme.icon);

  return (
    <svg className={classNames} viewBox={icon.viewBox} onClick={onClick}>
      <use xlinkHref={`#${icon.id}`} />
    </svg>
  );
};

Icon.propTypes = {
  /**
   * The icon itself
   */
  icon: PropTypes.object,
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
  icon: infoIcon
};

export default Icon;
