import React from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';

import Icon from 'components/icon';
import cx from 'classnames';
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
  const showCloseIcon = clearable && values.length > 0;
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
    if (!values || values.length < 2 || !selectedOptionsTooltip) return '';

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
              !isOpen && valuesSelectedLength === 0
          })}
        >
          {(isOpen && !searchable) || !isOpen ? (
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
  searchable: PropTypes.bool,
  inputProps: PropTypes.func,
  handleClearSelection: PropTypes.func,
  placeholder: PropTypes.string,
  innerRef: PropTypes.func,
  defaultText: PropTypes.shape({ selected: PropTypes.string }),
  values: PropTypes.array,
  selectedOptionsTooltip: PropTypes.bool
};

Selector.defaultProps = {
  children: undefined,
  isOpen: undefined,
  disabled: false,
  arrowPosition: undefined,
  onSelectorClick: undefined,
  clearable: false,
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
