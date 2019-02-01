import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Downshift from 'downshift';
import cx from 'classnames';

import Selector from './components/selector';
import Menu from './components/menu';
import styles from './multi-level-dropdown-styles.scss';

class Dropdown extends PureComponent {
  render() {
    const {
      className,
      theme,
      label,
      searchable,
      clearable,
      noItemsFound,
      optionsAction,
      optionsActionKey,
      arrowPosition,
      checkModalClosing,
      handleStateChange,
      handleClearSelection,
      toggleOpenGroup,
      buildInputProps,
      onSelectorClick,
      isOpen,
      showGroup,
      items,
      activeLabel,
      highlightedIndex,
      noParentSelection,
      placeholder,
      disabled,
      handleOnChange,
      defaultText,
      values
    } = this.props;
    const dropdown = (
      <Downshift
        itemToString={i => i && i.label}
        onStateChange={handleStateChange}
        onOuterClick={checkModalClosing}
        {...this.props}
        onChange={handleOnChange}
      >
        {({ getInputProps, getItemProps, getRootProps }) => (
          <Selector
            isOpen={isOpen}
            arrowPosition={arrowPosition}
            onSelectorClick={onSelectorClick}
            clearable={clearable}
            activeLabel={activeLabel}
            searchable={searchable}
            inputProps={() => buildInputProps(getInputProps)}
            handleClearSelection={() => handleClearSelection()}
            disabled={disabled}
            placeholder={placeholder}
            values={values}
            defaultText={defaultText}
            {...getRootProps({ refKey: 'innerRef' })}
          >
            <Menu
              isOpen={isOpen}
              activeLabel={activeLabel}
              items={items}
              showGroup={showGroup}
              getItemProps={getItemProps}
              highlightedIndex={highlightedIndex}
              optionsAction={optionsAction}
              optionsActionKey={optionsActionKey}
              noItemsFound={noItemsFound}
              toggleOpenGroup={toggleOpenGroup}
              noParentSelection={noParentSelection}
              theme={theme}
            />
          </Selector>
        )}
      </Downshift>
    );

    return (
      <div className={cx(styles.dropdown, theme.wrapper, className)}>
        {label && (
          <div className={cx(styles.label, theme.wrapper)}>
            {label}
          </div>
        )}
        {dropdown}
      </div>
    );
  }
}

Dropdown.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  theme: PropTypes.object,
  options: PropTypes.array,
  modalOpen: PropTypes.bool,
  modalClosing: PropTypes.bool,
  values: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  placeholder: PropTypes.string,
  searchable: PropTypes.bool,
  noItemsFound: PropTypes.string,
  handleOnChange: PropTypes.func.isRequired,
  optionsAction: PropTypes.func,
  optionsActionKey: PropTypes.string,
  arrowPosition: PropTypes.string,
  noParentSelection: PropTypes.bool,
  clearable: PropTypes.bool,
  groupKey: PropTypes.string,
  handleStateChange: PropTypes.func,
  handleClearSelection: PropTypes.func,
  onInputClick: PropTypes.func,
  onSelectorClick: PropTypes.func,
  inputValue: PropTypes.string,
  isOpen: PropTypes.bool,
  disabled: PropTypes.bool,
  showGroup: PropTypes.string,
  toggleOpenGroup: PropTypes.func,
  buildInputProps: PropTypes.func,
  checkModalClosing: PropTypes.func,
  items: PropTypes.array,
  activeLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  highlightedIndex: PropTypes.number,
  defaultText: PropTypes.shape({ selected: PropTypes.string})
};

Dropdown.defaultProps = {
  className: undefined,
  label: undefined,
  theme: {},
  options: undefined,
  modalOpen: undefined,
  modalClosing: undefined,
  placeholder: undefined,
  searchable: undefined,
  noItemsFound: undefined,
  optionsAction: undefined,
  optionsActionKey: undefined,
  arrowPosition: undefined,
  noParentSelection: undefined,
  clearable: undefined,
  groupKey: undefined,
  handleStateChange: undefined,
  handleClearSelection: undefined,
  onInputClick: undefined,
  onSelectorClick: undefined,
  inputValue: undefined,
  isOpen: undefined,
  disabled: undefined,
  showGroup: undefined,
  toggleOpenGroup: undefined,
  buildInputProps: undefined,
  checkModalClosing: undefined,
  items: undefined,
  activeLabel: undefined,
  highlightedIndex: undefined,
  defaultText: { selected: 'selected' },
  values: []
};

export default Dropdown;
