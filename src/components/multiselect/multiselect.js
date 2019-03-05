import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  // eslint-disable-next-line
  ReactSelectize,
  MultiSelect as SelectizeMultiSelect
} from 'react-selectize';
// eslint-disable-next-line
import { CSSTransitionGroup } from 'react-transition-group';
import cx from 'classnames';
import remove from 'lodash/remove';
import deburr from 'lodash/deburr';
import toUpper from 'lodash/toUpper';
import Truncate from 'react-truncate';

import dropdownArrow from './assets/dropdown-arrow.svg';
import infoIcon from './assets/info.svg';
import Icon from '../icon';
import Loading from '../loading';
import selectizeStyles from '../../styles/react-selectize.scss';
import styles from './multiselect-styles.scss';

class Multiselect extends Component {
  constructor() {
    super();
    this.state = { search: '' };
  }

  componentDidUpdate(prevProps, prevState) {
    const { search } = this.state;
    if (search !== prevState.search) {
      this.selectorElement.highlightFirstSelectableOption();
    }
  }

  getSelectorValue() {
    const { values, options, children, defaultText } = this.props;
    if (children) {
      return children;
    }
    const { search } = this.state;
    const hasValues = values && values.length;
    if (hasValues && !search) {
      if (values.length > 1 && values.length === (options && options.length))
        return <span>{defaultText.allSelected}</span>;
      return values.length === 1
        ? <Truncate lines={1}>{values[0].label}</Truncate>
        : <span>{`${values.length} ${defaultText.selected}`}</span>;
    }
    return null;
  }

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
    if (onValueChange) {
      const selectedValues = values.map(d => d.value);
      const duplicateValue = this.findDuplicateInArray(selectedValues);
      if (duplicateValue) {
        remove(selectedValues, value => duplicateValue === value);
      }
      const selected = values.filter(
        value => selectedValues.indexOf(value.value) > -1
      );
      onValueChange(selected);
    }
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
    const { search } = this.state;
    const {
      label,
      theme,
      loading,
      children,
      mirrorX,
      hideSelected,
      icon,
      info,
      infoText,
      truncateWidth
    } = this.props;
    return (
      <div
        className={cx(
          selectizeStyles.dropdown,
          styles.multiSelectWrapper,
          theme.wrapper
        )}
      >
        {label && <span className={styles.label}>{label}</span>}
        {
          info && (
          <div data-tip={infoText} className={styles.infoContainer}>
            <Icon icon={infoIcon} className={styles.infoIcon} />
          </div>
            )
        }
        <div
          className={cx(
            theme.dropdown,
            styles.multiSelect,
            children ? styles.hasChildren : '',
            { [styles.mirrorX]: mirrorX },
            { [styles.searchable]: !icon }
          )}
        >
          {
            !icon &&
              (
                <div className={cx(styles.values, 'values')}>
                  {this.getSelectorValue()}
                </div>
              )
          }
          {loading && <Loading className={styles.loader} mini />}
          <SelectizeMultiSelect
            ref={el => {
              this.selectorElement = el;
            }}
            filterOptions={this.filterOptions}
            renderValue={() => <span />}
            renderOption={option => {
              const className = option.isSelected
                ? cx(styles.selected, theme.selected)
                : '';
              return (!hideSelected || !option.isSelected) && (
              <div
                className={cx(
                      className,
                      option.groupId ? styles.nested : ''
                    )}
              >
                <Truncate width={truncateWidth} lines={6}>
                  {option.label}
                </Truncate>
                {option.isSelected && <span className={styles.checked} />}
              </div>
                );
            }}
            onValuesChange={this.handleChange}
            renderToggleButton={({ open }) => (
              <Icon
                className={open ? styles.isOpen : ''}
                icon={icon || dropdownArrow}
              />
            )}
            onSearchChange={s => this.setState({ search: s })}
            search={search}
            {...this.props}
          />
        </div>
      </div>
    );
  }
}

const valueShape = {
  label: PropTypes.string,
  value: PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]).isRequired
};
Multiselect.propTypes = {
  theme: PropTypes.shape({
    wrapper: PropTypes.string,
    dropdown: PropTypes.string,
    selected: PropTypes.string
  }),
  /** For translations */
  defaultText: PropTypes.shape({
    selected: PropTypes.string,
    allSelected: PropTypes.string
  }),
  onValueChange: PropTypes.func.isRequired,
  info: PropTypes.bool,
  infoText: PropTypes.string,
  label: PropTypes.string,
  children: PropTypes.node,
  loading: PropTypes.bool,
  mirrorX: PropTypes.bool,
  icon: PropTypes.object,
  options: PropTypes.arrayOf(PropTypes.shape(valueShape)).isRequired,
  values: PropTypes.arrayOf(PropTypes.shape(valueShape)).isRequired,
  hideSelected: PropTypes.bool,
  /** Number of pixels before truncating a single line while options */
  truncateWidth: PropTypes.number
};

Multiselect.defaultProps = {
  theme: { selected: styles.selected },
  defaultText: { selected: 'selected', allSelected: 'All selected' },
  info: false,
  icon: null,
  infoText: '',
  children: null,
  label: '',
  mirrorX: false,
  loading: false,
  hideSelected: false,
  truncateWidth: 180
};

export default Multiselect;
