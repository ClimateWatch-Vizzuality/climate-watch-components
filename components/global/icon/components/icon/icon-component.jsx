import React from 'react';
import PropTypes from 'prop-types';
import { themr } from 'react-css-themr';
import cx from 'classnames';

import styles from './icon-styles.scss';

/**
 * @render react
 * @name Icon
 * Represents an icon
 * @example <Icon icon={icon} />
 */
const Icon = ({ icon, theme, className = '', onClick }) => {
  const classNames = cx(className, theme.icon);
  return (
    <img className={classNames} src={icon} />
  );
};

Icon.propTypes = {
  icon: PropTypes.string,
  className: PropTypes.string,
  theme: PropTypes.shape({
    icon: PropTypes.string
  }),
  onClick: PropTypes.func
};

export default themr('Icon', styles)(Icon);
