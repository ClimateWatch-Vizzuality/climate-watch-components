import { createElement, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { deburrUpper } from 'utils/utils';
import groupBy from 'lodash/groupBy';
import remove from 'lodash/remove';

import Component from './nestedselect-component';

class Nestedselect extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      isOpen: false,
      showGroup: '',
      highlightedIndex: 0,
      activeValue: this.getValue(props.value)
    };
  }

  getValue = value => {
    const { options } = this.props;
    return typeof value === 'string' || typeof value === 'number'
      ? options.find(o => o.value === value)
      : value;
  };

  getActiveLabel = () => {
    const { noSelectedValue } = this.props;
    const { activeValue } = this.state;
    return activeValue && activeValue.label || noSelectedValue;
  };

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
    return listWithGroupsAndItems;
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
      groupKey || 'group'
    );
  };

  handleStateChange = (changes, downshiftStateAndHelpers) => {
    if (!downshiftStateAndHelpers.isOpen) {
      this.setState({ inputValue: '' });
    } else if (changes && changes.inputValue || changes.inputValue === '') {
      this.setState({ inputValue: changes.inputValue, highlightedIndex: 0 });
    }
    if (changes && changes.selectedItem) {
      this.setState({ isOpen: false, inputValue: '' });
    }
    if (Object.keys(changes).indexOf('isOpen') > -1) {
      this.setState({ inputValue: '' });
    }
    if (changes && changes.highlightedIndex || changes.highlightedIndex === 0) {
      this.setState({ highlightedIndex: changes.highlightedIndex });
    }
  };

  handleClearSelection = () => {
    const { onChange } = this.props;
    onChange();
    this.setState({ isOpen: false, showGroup: '', inputValue: '' });
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
    const { isOpen, showGroup, inputValue, highlightedIndex } = this.state;

    return createElement(Component, {
      ...this.props,
      isOpen,
      showGroup,
      inputValue,
      highlightedIndex,
      checkModalClosing: this.checkModalClosing,
      handleStateChange: this.handleStateChange,
      onInputClick: this.onInputClick,
      onSelectorClick: this.onSelectorClick,
      handleClearSelection: this.handleClearSelection,
      buildInputProps: this.buildInputProps,
      toggleOpenGroup: this.toggleOpenGroup,
      items: this.getGroupedItems()
    });
  }
}

Nestedselect.propTypes = {
  searchable: PropTypes.bool,
  options: PropTypes.arrayOf(PropTypes.object),
  groupKey: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  noSelectedValue: PropTypes.string,
  value: PropTypes.string
};

Nestedselect.defaultProps = {
  searchable: false,
  options: [],
  groupKey: 'groupId',
  placeholder: null,
  noSelectedValue: '',
  value: ''
};

export default Nestedselect;
