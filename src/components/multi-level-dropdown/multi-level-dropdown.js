import { createElement, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { deburrUpper } from 'utils/utils';
import groupBy from 'lodash/groupBy';
import castArray from 'lodash/castArray';
import remove from 'lodash/remove';

import Component from './multi-level-dropdown-component';

const EVENT_TYPES = {
  mouseUp: '__autocomplete_mouseup__',
  keyDownEnter: '__autocomplete_keydown_enter__',
  click: '__autocomplete_click_item__'
};

class MultiLevelDropdown extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      isOpen: false,
      showGroup: '',
      highlightedIndex: 0,
      activeLabel: undefined
    };
  }

  onInputClick = () => {
    const { searchable } = this.props;
    const { isOpen } = this.state;
    if (!searchable && isOpen) {
      this.setState({ isOpen: false, showGroup: '' });
    } else {
      this.setState({ isOpen: true, inputValue: '' });
    }
  };

  onSelectorClick = () => {
    const { isOpen } = this.state;
    this.setState({ isOpen: !isOpen, inputValue: '' });
  };

  getGroupedItems = () => {
    const newItems = this.filterItems();
    const groups = remove(Object.keys(newItems), r => r !== 'undefined');
    const orphansList = newItems.undefined || [];
    let listWithGroupsAndItems = orphansList;
    groups.forEach(g => {
      listWithGroupsAndItems = listWithGroupsAndItems.concat(newItems[g]);
    });
    return this.addIsActive(listWithGroupsAndItems);
  };

  addIsActive = itemList => {
    const { values } = this.props;
    const parentsWithActiveChilds = [];
    const valueArray = castArray(values);
    valueArray.forEach(v => {
      if (v.group) parentsWithActiveChilds.push(String(v.group));
    });
    return itemList.map(i => ({
      ...i,
      active: valueArray.includes(i) ||
        valueArray.map(v => v && v.value).includes(i.value),
      hasActiveChild: parentsWithActiveChilds.includes(String(i.value))
    }));
  };

  filterItems = () => {
    const { inputValue } = this.state;
    const { options, groupKey } = this.props;

    return groupBy(
      inputValue
        ? options.filter(
          item => deburrUpper(item.label).indexOf(deburrUpper(inputValue)) > -1
        )
        : options,
      groupKey
    );
  };

  handleMultiselectChange = (changes, downshiftStateAndHelpers) => {
    const { values: selectedItems } = this.props;
    const { onChange } = this.props;
    const itemToRemove = selectedItems.find(
      s => s.label === changes.inputValue
    );
    if (itemToRemove) {
      selectedItems.splice(selectedItems.indexOf(itemToRemove), 1);
    } else {
      selectedItems.push(downshiftStateAndHelpers.selectedItem);
    }
    onChange(selectedItems);
  };

  updateActiveLabel = (selectedItem, clear) => {
    const { values, multiselect } = this.props;
    if (clear) return this.setState({ activeLabel: null });

    const activeLabel = multiselect
      ? values && values.length === 1 && values[0].label || null
      : selectedItem;
    return this.setState({ activeLabel });
  };

  handleStateChange = (changes, downshiftStateAndHelpers) => {
    const { multiselect } = this.props;
    if (changes) {
      if (!downshiftStateAndHelpers.isOpen) {
        this.setState({ inputValue: '' });
      } else if (changes.type === EVENT_TYPES.mouseUp) {
        this.setState({ isOpen: false });
      } else if (changes.inputValue || changes.inputValue === '') {
        if (
          multiselect &&
            (changes.type === EVENT_TYPES.keyDownEnter ||
              changes.type === EVENT_TYPES.click)
        ) {
          this.handleMultiselectChange(changes, downshiftStateAndHelpers);
        }
        this.setState({ inputValue: changes.inputValue });
      }

      if (changes.selectedItem && !multiselect) {
        this.setState({ isOpen: false, inputValue: '' });
      }

      if (Object.keys(changes).indexOf('isOpen') > -1) {
        this.setState({ inputValue: '' });
      }

      if (changes.highlightedIndex || changes.highlightedIndex === 0) {
        this.setState({ highlightedIndex: changes.highlightedIndex });
      }
      if (changes.type === EVENT_TYPES.click) {
        this.updateActiveLabel(changes.inputValue);
      }
    }
  };

  handleClearSelection = () => {
    const { onChange } = this.props;
    onChange([]);
    this.updateActiveLabel('', true);
    this.setState({ isOpen: false, showGroup: '', inputValue: '' });
  };

  handleOnChange = selection => {
    const { multiselect, onChange } = this.props;
    if (!multiselect) return onChange(selection);
    // Multiselect needs to be handled in handleStateChange as the removing changes don't trigger onChange
    return null;
  };

  toggleOpenGroup = item => {
    const { showGroup } = this.state;
    this.setState({
      showGroup: item.groupParent === showGroup ? '' : item.groupParent,
      isOpen: true
    });
  };

  handleKeyEnter = e => {
    const { showGroup, highlightedIndex } = this.state;
    if (e.key === 'Enter') {
      const groupedItems = this.getGroupedItems();
      const selected = groupedItems[highlightedIndex];
      if (selected && selected.groupParent) {
        e.persist();
        e.preventDownshiftDefault = true;
        this.setState({
          showGroup: showGroup === selected.groupParent
            ? ''
            : selected.groupParent
        });
      }
    }
  };

  buildInputProps = getInputProps => {
    const { isOpen } = this.state;
    const { searchable, placeholder } = this.props;
    return getInputProps({
      placeholder: isOpen && searchable ? placeholder : '',
      onClick: this.onInputClick,
      readOnly: !isOpen || !searchable,
      onKeyDown: e => this.handleKeyEnter(e)
    });
  };

  render() {
    const {
      isOpen,
      showGroup,
      inputValue,
      highlightedIndex,
      activeLabel
    } = this.state;
    return createElement(Component, {
      ...this.props,
      isOpen,
      showGroup,
      inputValue,
      highlightedIndex,
      handleStateChange: this.handleStateChange,
      onInputClick: this.onInputClick,
      onSelectorClick: this.onSelectorClick,
      handleClearSelection: this.handleClearSelection,
      buildInputProps: this.buildInputProps,
      toggleOpenGroup: this.toggleOpenGroup,
      handleOnChange: this.handleOnChange,
      items: this.getGroupedItems(),
      activeLabel
    });
  }
}

MultiLevelDropdown.propTypes = {
  searchable: PropTypes.bool,
  multiselect: PropTypes.bool,
  options: PropTypes.array,
  /** Name of the attribute in the values for the group name */
  groupKey: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  /** Must be an array for multiselect */
  values: PropTypes.oneOfType([ PropTypes.object, PropTypes.array ])
};

MultiLevelDropdown.defaultProps = {
  searchable: false,
  multiselect: false,
  options: [],
  values: [],
  groupKey: 'group',
  placeholder: undefined
};

export default MultiLevelDropdown;
