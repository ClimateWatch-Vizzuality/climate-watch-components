import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './icon-styles.scss';
import infoIcon from './assets/info.svg';

/**
 * Icon component for displaying an icon -
 * The first element inside the svg needs an id
 */
const Icon = ({ icon, theme, onClick, style }) => {
  const classNames = cx(styles.icon, theme.icon, onClick ? styles.cursor : '');

  return (
    <svg
      className={classNames}
      viewBox={icon.viewBox}
      onClick={onClick}
      style={style}
    >
      <use xlinkHref={`#${icon.id}`} />
    </svg>
  );
};

Icon.propTypes = {
  /**
   * The icon itself - The first element inside the svg has to have an id
   */
  icon: PropTypes.object,
  /**
   * Themable options
   */
  theme: PropTypes.shape({ icon: PropTypes.string }),
  /**
   * The onClick action occurring when user clicks on the icon
   */
  onClick: PropTypes.func,
  /**
   * Style prop for the color
   */
  style: PropTypes.oneOfType([ PropTypes.string, PropTypes.object ])
};

Icon.defaultProps = {
  theme: {},
  onClick: () => {
  },
  icon: infoIcon,
  style: null
};

export default Icon;
