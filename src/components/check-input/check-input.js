import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import styles from './check-input-styles.scss';

/**
 * Represents a check input
 */
const CheckInput = props => {
  const { id, label, checked, onChange, theme, toggleFirst, disabled } = props;
  return (
    <div className={cx(styles.checkInput, theme.checkInput)}>
      <label
        className={cx(
          styles.switch,
          { [styles.toggleFirst]: toggleFirst },
          theme.switch
        )}
        htmlFor={id}
      >
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className={styles.checkbox}
          disabled={disabled}
        />
        <span className={cx(styles.label, theme.label)}>
          {label}
        </span>
        <div className={cx(styles.slider, styles.round, theme.slider)} />
      </label>
    </div>
  );
};

CheckInput.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  toggleFirst: PropTypes.bool,
  theme: PropTypes.object
};

CheckInput.defaultProps = {
  id: Math.random().toString(36).substring(2, 15),
  theme: {},
  label: '',
  checked: false,
  disabled: false,
  toggleFirst: false
};

export default CheckInput;
