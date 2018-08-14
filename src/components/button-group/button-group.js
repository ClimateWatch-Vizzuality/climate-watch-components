import React, { Children } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './button-group-styles.scss';

/**
 * Group of buttons component
 */
const ButtonGroup = props => {
  const { children, theme } = props;
  return (
    <div className={cx(styles.wrapper, theme.wrapper)}>
      {Children.map(children, (child, i) => (
        <child.type
          key={i}
          {...child.props}
          theme={{ button: cx(styles.button, theme.button) }}
        >
          {child.props.children}
        </child.type>
      ))}
    </div>
  );
};

ButtonGroup.propTypes = {
  /** Buttons to render */
  children: PropTypes.node,
  /** Theming button with customized styles */
  theme: PropTypes.shape({
    wrapper: PropTypes.string,
    button: PropTypes.string
  })
};

ButtonGroup.defaultProps = { theme: {}, children: null };

export default ButtonGroup;
