import React from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';

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
    defaultText,
    selectedOptionsTooltip,
    values
  } = props;
  const showCloseIcon = clearable && isArray(values) && values.length > 0;
  const showDownArrow = arrowPosition !== 'left' && !disabled;
  const valuesSelectedLength = values.length;
  const valuesSelectedLabel = valuesSelectedLength === 1
                           ? values[0].label
                           : valuesSelectedLength && `${valuesSelectedLength} ${defaultText.selected}`;
  const arrowDown = (
    <button
      className={styles.arrowBtn}
      onClick={onSelectorClick}
      type="button"
    >
      <Icon icon={arrowDownIcon} theme={{ icon: cx(styles.arrow, { [styles.isOpen]: isOpen })}} />
    </button>
  );

  const getSelectedOptionsTooltipText = () => {
    if (!values || !isArray(values) || values.length < 2 || !selectedOptionsTooltip) return '';

    return values.map(o => o.label).join(', ');
  };

  return (
    <div
      ref={innerRef}
      className={styles.container}
    >
      <div
        data-tip={getSelectedOptionsTooltipText()}
        data-for="multiLevelDropdownOptionsTooltip"
        className={cx(styles.selector, {
          [styles.alignLeft]: arrowPosition,
          [styles.disabled]: disabled
        })}
      >
        {arrowPosition === 'left' && arrowDown}
        <span
          className={cx(styles.value, {
              [styles.noValue]: !values || values.length === 0,
              [styles.placeholder]:
              !isOpen && !activeLabel && valuesSelectedLength === 0
          })}
        >
          {(isOpen && !searchable) || !isOpen ? (
             activeLabel ||
             valuesSelectedLabel ||
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
      {selectedOptionsTooltip && (
         <ReactTooltip
           id="multiLevelDropdownOptionsTooltip"
           effect="solid"
         />
      )}
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
  defaultText: PropTypes.shape({ selected: PropTypes.string }),
  values: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  selectedOptionsTooltip: PropTypes.bool
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
  defaultText: { selected: 'selected' },
  values: [],
  selectedOptionsTooltip: true
};

export default Selector;
