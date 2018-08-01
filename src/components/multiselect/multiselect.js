import { PureComponent, createElement } from 'react';
import PropTypes from 'prop-types';
import remove from 'lodash/remove';
import deburr from 'lodash/deburr';
import toUpper from 'lodash/toUpper';

import MultiSelectComponent from './multiselect-component';

export { default as component } from './multiselect-component';
export { default as styles } from './multiselect-styles.scss';

class MultiSelect extends PureComponent {
  filterOptions = (options, something, search) => {
    const optionsParsed = [];
    const { values, hideSelected } = this.props;
    options.forEach(o => {
      const isSelected = values &&
        values.some(filter => o.value === filter.value);
      if (!hideSelected || !isSelected) {
        optionsParsed.push({ ...o, isSelected });
      }
    });
    if (!search) return optionsParsed;
    const parsedSearch = toUpper(deburr(search));
    return optionsParsed.filter(
      d => toUpper(deburr(d.label)).indexOf(parsedSearch) > -1
    );
  };

  handleChange = values => {
    const { onValueChange } = this.props;
    const selectedValues = values.map(d => d.value);
    const duplicateValue = this.findDuplicateInArray(selectedValues);
    if (duplicateValue) {
      remove(selectedValues, value => duplicateValue === value);
    }
    const selected = values.filter(
      value => selectedValues.indexOf(value.value) > -1
    );
    onValueChange(selected);
  };

  findDuplicateInArray = array => {
    let repeatedValue = null;
    array.forEach((value, index) => {
      if (array.indexOf(value) !== index && array.indexOf(value) > -1) {
        repeatedValue = value;
      }
    });
    return repeatedValue;
  };

  render() {
    return createElement(MultiSelectComponent, {
      ...this.props,
      filterOptions: this.filterOptions,
      onValuesChange: this.handleChange
    });
  }
}

MultiSelect.propTypes = {
  onValueChange: PropTypes.func.isRequired,
  values: PropTypes.arrayOf(
    PropTypes.shape({ label: PropTypes.string, value: PropTypes.string })
  ).isRequired,
  hideSelected: PropTypes.bool
};

MultiSelect.defaultProps = { hideSelected: false };

export default MultiSelect;
