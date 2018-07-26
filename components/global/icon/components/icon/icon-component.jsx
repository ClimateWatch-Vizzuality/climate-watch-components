import React from 'react';
import PropTypes from 'prop-types';

/**
 * @render react
 * @name Icon
 * Represents an icon
 * @example <Icon icon={icon} />
 */
const Icon = ({ icon, theme, onClick }) => {
  return (
    <img className={theme.icon} src={icon} onClick={onClick} />
  );
};

Icon.propTypes = {
  icon: PropTypes.string,
  theme: PropTypes.shape({
    icon: PropTypes.string
  }),
  onClick: PropTypes.func
};

export default Icon;
