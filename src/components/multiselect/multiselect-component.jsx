import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ReactSelectize, MultiSelect } from 'react-selectize'; // eslint-disable-line
import { CSSTransitionGroup } from 'react-transition-group'; // eslint-disable-line
import cx from 'classnames';

import dropdownArrow from './assets/dropdown-arrow.svg';
import infoIcon from './assets/info.svg';
import Icon from '../icon';
import Loading from '../loading';
import selectizeStyles from '../../styles/react-selectize.scss';
import styles from './multiselect-styles.scss';

class MultiselectComponent extends Component {
  // eslint-disable-line react/prefer-stateless-function
  constructor() {
    super();
    this.state = {
      search: ''
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const { search } = this.state;
    if (search !== prevState.search) {
      this.selectorElement.highlightFirstSelectableOption();
    }
  }

  getSelectorValue() {
    const { values, options, selectedLabel, children } = this.props;
    if (children) {
      return children;
    }
    const { search } = this.state;
    const hasValues = values && values.length;
    if (selectedLabel && !search) {
      return (
        <span>
          {selectedLabel}
        </span>
      );
    }
    if (hasValues && !search) {
      return values.length === options && options.length ? (
        <span>
          All selected
        </span>
      ) : (
        <span>
          {`${values.length} selected`}
        </span>
      );
    }
    return null;
  }

  render() {
    const { search } = this.state;
    const {
      onValuesChange,
      filterOptions,
      label,
      theme,
      loading,
      children,
      mirrorX,
      hideSelected,
      icon,
      info,
      infoText
    } = this.props;
    return (
      <div className={cx(selectizeStyles.dropdown, styles.multiSelectWrapper, theme.wrapper)}>
        {label && (
          <span className={styles.label}>
            {label}
          </span>
        )}
        {info && (
          <div data-tip={infoText} className={styles.infoContainer}>
            <Icon icon={infoIcon} className={styles.infoIcon} />
          </div>
        )}
        <div
          className={cx(
            theme.dropdown,
            styles.multiSelect,
            children ? styles.hasChildren : '',
            { [styles.mirrorX]: mirrorX },
            { [styles.searchable]: !icon }
          )}
        >
          <div className={cx(styles.values, 'values')}>
            {this.getSelectorValue()}
          </div>
          {loading && <Loading className={styles.loader} mini />}
          <MultiSelect
            ref={el => {
              this.selectorElement = el;
            }}
            filterOptions={filterOptions}
            renderValue={() => <span />}
            renderOption={option => {
              const className = option.isSelected ? cx(styles.selected, theme.selected) : '';
              return (
                (!hideSelected || !option.isSelected) && (
                  <div
                    className={cx(
                      className,
                      option.groupId ? styles.nested : ''
                    )}
                  >
                    {option.label}
                    {option.isSelected && <span className={styles.checked} />}
                  </div>
                )
              );
            }}
            onValuesChange={onValuesChange}
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

MultiselectComponent.propTypes = {
  values: PropTypes.array.isRequired,
  options: PropTypes.array.isRequired,
  theme: PropTypes.object,
  onMultiValueChange: PropTypes.func,
  filterOptions: PropTypes.func,
  onValuesChange: PropTypes.func,
  info: PropTypes.bool,
  infoText: PropTypes.string,
  label: PropTypes.string,
  selectedLabel: PropTypes.string,
  children: PropTypes.node,
  loading: PropTypes.bool,
  hideSelected: PropTypes.bool,
  mirrorX: PropTypes.bool,
  icon: PropTypes.object
};

MultiselectComponent.defaultProps = {
  theme: {
    selected: styles.selected
  },
  info: false,
  infoText: '',
  label: '',
  loading: false
};

export default MultiselectComponent;
