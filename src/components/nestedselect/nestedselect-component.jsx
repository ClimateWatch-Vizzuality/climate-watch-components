import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Downshift from 'downshift';
import cx from 'classnames';

import Selector from './components/selector';
import Menu from './components/menu';
import styles from './nestedselect-styles.scss';

class Nestedselect extends PureComponent {
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
      activeValue,
      activeLabel,
      highlightedIndex,
      noParentSelection,
      placeholder,
      disabled
    } = this.props;
    const dropdown = (
      <Downshift
        itemToString={i => i && i.label}
        onStateChange={handleStateChange}
        onOuterClick={checkModalClosing}
        {...this.props}
      >
        {({ getInputProps, getItemProps, getRootProps }) => (
          <Selector
            isOpen={isOpen}
            arrowPosition={arrowPosition}
            onSelectorClick={onSelectorClick}
            clearable={clearable}
            activeValue={activeValue}
            activeLabel={activeLabel}
            searchable={searchable}
            inputProps={() => buildInputProps(getInputProps)}
            handleClearSelection={() => handleClearSelection()}
            disabled={disabled}
            placeholder={placeholder}
            {...getRootProps({ refKey: 'innerRef' })}
          >
            <Menu
              isOpen={isOpen}
              activeValue={activeValue}
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
            />
          </Selector>
        )}
      </Downshift>
    );

    return (
      <div className={cx(styles.cropdown, theme, className)}>
        {label && (
          <div className={styles.label}>
            {label}
          </div>
        )}
        {dropdown}
      </div>
    );
  }
}

Nestedselect.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  theme: PropTypes.string,
  options: PropTypes.array,
  modalOpen: PropTypes.bool,
  modalClosing: PropTypes.bool,
  value: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.number
  ]),
  placeholder: PropTypes.string,
  searchable: PropTypes.bool,
  noItemsFound: PropTypes.string,
  optionsAction: PropTypes.func.isRequired,
  optionsActionKey: PropTypes.string,
  arrowPosition: PropTypes.string,
  noSelectedValue: PropTypes.string,
  noParentSelection: PropTypes.bool,
  clearable: PropTypes.bool,
  groupKey: PropTypes.string,
  handleStateChange: PropTypes.func.isRequired,
  handleClearSelection: PropTypes.func.isRequired,
  onInputClick: PropTypes.func.isRequired,
  onSelectorClick: PropTypes.func.isRequired,
  inputValue: PropTypes.string,
  isOpen: PropTypes.bool,
  disabled: PropTypes.bool,
  showGroup: PropTypes.string,
  toggleOpenGroup: PropTypes.func.isRequired,
  buildInputProps: PropTypes.func.isRequired,
  checkModalClosing: PropTypes.func.isRequired,
  items: PropTypes.array,
  activeValue: PropTypes.object,
  activeLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  highlightedIndex: PropTypes.number
};

Nestedselect.defaultProps = {
  className: null,
  label: '',
  theme: null,
  options: [],
  modalOpen: null,
  modalClosing: null,
  value: '',
  placeholder: '',
  searchable: null,
  noItemsFound: null,
  optionsActionKey: '',
  arrowPosition: '',
  noSelectedValue: null,
  noParentSelection: null,
  clearable: null,
  groupKey: '',
  inputValue: null,
  isOpen: null,
  disabled: null,
  showGroup: null,
  items: [],
  activeValue: null,
  activeLabel: null,
  highlightedIndex: 0
};

export default Nestedselect;
