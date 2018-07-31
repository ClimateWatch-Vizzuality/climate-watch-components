import React from 'react';
import PropTypes from 'prop-types';

/**
 * Icon component for displaying an icon
 */
const Icon = ({ icon, theme, onClick }) => (
  <img className={theme.icon} src={icon} alt="icon" onClick={onClick} />
);

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
