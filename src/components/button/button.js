import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './button-styles.scss';

/**
 * Button component
 */
const Button = props => {
  const {
    href,
    children,
    className,
    square,
    disabled,
    onClick,
    noBox,
    noSpace,
    theme
  } = props;
  const notActionable = disabled || !onClick && !href && !children;
  const classNames = cx(className, styles.button, theme.button, {
    [styles.square]: square,
    [styles.noBox]: noBox,
    [styles.disabled]: notActionable,
    [styles.noSpace]: noSpace
  });
  if (href) {
    return (
      <a className={classNames} href={href}>
        {children}
      </a>
    );
  }
  return (
    <button
      type="button"
      title={disabled ? 'Coming soon' : ''}
      disabled={disabled}
      className={classNames}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  /** Any data structure to render */
  children: PropTypes.node,
  /** Link to which button click will redirect */
  href: PropTypes.string,
  /** Class names for styling */
  className: PropTypes.oneOfType([ PropTypes.string, PropTypes.array ]),
  /** Theming button with customized styles */
  theme: PropTypes.shape({ button: PropTypes.string }),
  /** Option to render button as a square */
  square: PropTypes.bool,
  /** Option to render button without space  */
  noSpace: PropTypes.bool,
  /** Option to render button without box */
  noBox: PropTypes.bool,
  /** Option to disable clicking button */
  disabled: PropTypes.bool,
  /** Function called on clicking button */
  onClick: PropTypes.func
};

Button.defaultProps = {
  noSpace: false,
  disabled: false,
  href: null,
  children: null,
  className: '',
  square: false,
  noBox: false,
  onClick: () => {
  },
  theme: {}
};

export default Button;
