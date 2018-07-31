import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import styles from './check-input-styles.scss';

/**
 * Represents a check input
 */
const CheckInput = props => {
  const {
    id,
    label,
    checked,
    onChange,
    theme,
    toggleFirst,
    disabled
  } = props;
  return (
    <div className={cx(styles.checkInput, theme.checkInput)}>
      <label
        className={cx(styles.switch, { [styles.toggleFirst]: toggleFirst })}
        htmlFor={id}
      >
        <input
          className={styles.checkbox}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          id={id}
          disabled={disabled}
        />
        <span className={styles.label}>{label}</span>
        <div className={cx(styles.slider, styles.round)} />
      </label>
    </div>
  );
};

CheckInput.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  label: PropTypes.string,
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  toggleFirst: PropTypes.bool,
  theme: PropTypes.object
};

CheckInput.defaultProps = {
  id: Math.random().toString(36).substring(2, 15),
  theme: {}
}

export default CheckInput;
