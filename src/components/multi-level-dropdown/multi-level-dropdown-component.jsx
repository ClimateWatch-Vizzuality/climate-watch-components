import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import castArray from 'lodash/castArray';

import Downshift from 'downshift';
import cx from 'classnames';

import Selector from './components/selector';
import Menu from './components/menu';
import styles from './multi-level-dropdown-styles.scss';

const nullifyGroupParentsWithoutElements = (items) =>
  items.map((item) => ({
    ...item,
    groupParent: items.some(i => i.group === item.groupParent) ? item.groupParent : null
  }));

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
      optGroups,
      highlightedIndex,
      noParentSelection,
      placeholder,
      disabled,
      handleOnChange,
      defaultText,
      values,
      selectedOptionsTooltip
    } = this.props;
    const arrayValues = castArray(values).filter(x => x);
    const menuItems = nullifyGroupParentsWithoutElements(items);
    const dropdown = (
      <Downshift
        itemToString={(i) => i && i.label}
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
            searchable={searchable}
            inputProps={() => buildInputProps(getInputProps)}
            handleClearSelection={() => handleClearSelection()}
            disabled={disabled}
            placeholder={placeholder}
            values={arrayValues}
            defaultText={defaultText}
            selectedOptionsTooltip={selectedOptionsTooltip}
            {...getRootProps({ refKey: "innerRef" })}
          >
            <Menu
              isOpen={isOpen}
              items={menuItems}
              optGroups={optGroups}
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
      <div className={cx(theme.container)}>
        <div
          className={cx(theme.wrapperContainer, {
            [theme.openWrapperContainer]: isOpen
          })}
        >
          <div
            className={cx(
              styles.dropdown,
              theme.wrapper,
              { [theme.openWrapper]: isOpen },
              className
            )}
          >
            {label && <div className={cx(styles.label)}>{label}</div>}
            {dropdown}
          </div>
        </div>
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
  optGroups: PropTypes.array,
  highlightedIndex: PropTypes.number,
  defaultText: PropTypes.shape({ selected: PropTypes.string}),
  selectedOptionsTooltip: PropTypes.bool
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
  optGroups: undefined,
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
  highlightedIndex: undefined,
  defaultText: { selected: 'selected' },
  values: [],
  selectedOptionsTooltip: true
};

export default Dropdown;
