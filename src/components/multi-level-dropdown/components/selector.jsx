import React from 'react';
import PropTypes from 'prop-types';

import Icon from 'components/icon';
import cx from 'classnames';
import isArray from 'lodash/isArray';
import arrowDownIcon from '../assets/dropdown-arrow.svg';
import closeIcon from '../assets/close.svg';
import styles from '../multi-level-dropdown-styles.scss';

const Selector = props => {
  const {
    isOpen,
    disabled,
    arrowPosition,
    onSelectorClick,
    clearable,
    activeLabel,
    searchable,
    inputProps,
    handleClearSelection,
    children,
    innerRef,
    placeholder,
    values
  } = props;
  const showCloseIcon = clearable && isArray(values) && values.length > 0;
  const showDownArrow = arrowPosition !== 'left' && !disabled;
  const valuesSelectedLength = values.length;
  const arrowDown = (
    <button
      className={styles.arrowBtn}
      onClick={onSelectorClick}
      type="button"
    >
      <Icon icon={arrowDownIcon} theme={{ icon: cx(styles.arrow, { [styles.isOpen]: isOpen })}} />
    </button>
  );

  return (
    <div
      ref={innerRef}
      className={styles.container}
    >
      <div
        className={cx(styles.selector, {
          [styles.alignLeft]: arrowPosition,
          [styles.disabled]: disabled
        })}
      >
        {arrowPosition === 'left' && arrowDown}
        <span
          className={cx(styles.value, {
            [styles.noValue]: !values || values.length === 0,
            [styles.clearable]: clearable,
            [styles.placeholder]:
              !isOpen && !activeLabel && valuesSelectedLength === 0
          })}
        >
          {(isOpen && !searchable) || !isOpen ? (
            activeLabel ||
            (valuesSelectedLength > 0 && `${valuesSelectedLength} selected`) ||
            placeholder
          ) : (
            ''
          )}
        </span>
        <input {...inputProps()} />
        {showCloseIcon && (
          <button
            className={styles.clearBtn}
            onClick={handleClearSelection}
            type="button"
          >
            <Icon icon={closeIcon} theme={{ icon: styles.clearIcon }} />
          </button>
        )}
        {showDownArrow && arrowDown}
      </div>
      <div className={styles.menuArrow} />
      {children}
    </div>
  );
};

Selector.propTypes = {
  children: PropTypes.node,
  isOpen: PropTypes.bool,
  disabled: PropTypes.bool,
  arrowPosition: PropTypes.string,
  onSelectorClick: PropTypes.func,
  clearable: PropTypes.bool,
  activeLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  searchable: PropTypes.bool,
  inputProps: PropTypes.func,
  handleClearSelection: PropTypes.func,
  placeholder: PropTypes.string,
  innerRef: PropTypes.func,
  values: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};

Selector.defaultProps = {
  children: undefined,
  isOpen: undefined,
  disabled: false,
  arrowPosition: undefined,
  onSelectorClick: undefined,
  clearable: false,
  activeLabel: undefined,
  searchable: false,
  inputProps: undefined,
  handleClearSelection: undefined,
  placeholder: undefined,
  innerRef: undefined,
  values: []
};

export default Selector;
