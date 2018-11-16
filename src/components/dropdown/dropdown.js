import React, { PureComponent } from 'react';
// eslint-disable-next-line
import { ReactSelectize, SimpleSelect } from 'react-selectize';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Icon from '../icon';
import Loading from '../loading';

import dropdownArrow from './assets/dropdown-arrow.svg';
import infoIcon from './assets/info.svg';

import selectize from '../../styles/react-selectize.scss';
import styles from './dropdown-styles.scss';

class Dropdown extends PureComponent {
  componentDidUpdate() {
    this.selectorElement.highlightFirstSelectableOption();
  }

  renderOptionIcon = (item, icons) => <Icon icon={icons[item.label]} />;

  render() {
    const {
      loading,
      label,
      theme,
      disabled,
      withDot,
      info,
      infoText,
      required,
      optional,
      hideResetButton,
      value,
      options,
      icons
    } = this.props;
    const hasNoValue = value && !value.value;
    const isRequired = hasNoValue && required;

    return (
      <div
        className={cx(
          selectize.dropdown,
          styles.dropdownWrapper,
          {
            [styles.flex]: withDot,
            [styles.iconDropdown]: icons,
            [styles.requiredError]: required && hasNoValue
          },
          theme.wrapper
        )}
      >
        {withDot && <span className={cx(styles.dot, theme.dot)} />}
        {label && <span className={styles.label}>{label}</span>}
        {
          isRequired &&
            <span className={styles.requiredError}>This field is required</span>
        }
        {optional && <span className={styles.optional}>(optional)</span>}
        {
          info && (
          <div data-tip={infoText} className={styles.infoContainer}>
            <Icon icon={infoIcon} className={styles.infoIcon} />
          </div>
            )
        }
        <div className={cx(styles.dropdown, theme.dropdown)}>
          {loading && <Loading className={styles.loader} mini />}
          {
            icons ? (
              <SimpleSelect
                ref={el => {
                  this.selectorElement = el;
                }}
                className={cx(
                  disabled,
                  { [styles.withDot]: withDot },
                  theme.select
                )}
                renderToggleButton={() => (
                  <Icon icon={dropdownArrow} theme={{ icon: theme.icon }} />
                )}
                options={options}
                renderOption={item => (
                  <Icon
                    icon={icons[item.label]}
                    theme={{ icon: styles.iconOption }}
                  />
                )}
                renderValue={item => (
                  <Icon
                    icon={icons[item.label]}
                    theme={{ icon: styles.iconValue }}
                  />
                )}
                hideResetButton={hideResetButton}
                {...this.props}
              />
) : (
  <SimpleSelect
    ref={el => {
                  this.selectorElement = el;
                }}
    className={cx(
                  disabled,
                  { [styles.withDot]: withDot },
                  theme.select
                )}
    renderToggleButton={() => (
      <Icon icon={dropdownArrow} theme={{ icon: theme.icon }} />
                )}
    {...this.props}
  />
)
          }
        </div>
      </div>
    );
  }
}

const valueShape = { label: PropTypes.string, value: PropTypes.string };
const iconsShape = { valueLabel: PropTypes.node };

Dropdown.propTypes = {
  label: PropTypes.string,
  info: PropTypes.bool,
  infoText: PropTypes.string,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  withDot: PropTypes.bool,
  required: PropTypes.bool,
  optional: PropTypes.bool,
  hideResetButton: PropTypes.bool,
  theme: PropTypes.shape({
    wrapper: PropTypes.string,
    dot: PropTypes.string,
    dropdow: PropTypes.string,
    select: PropTypes.string,
    icon: PropTypes.string
  }),
  icons: PropTypes.shape(iconsShape),
  value: PropTypes.shape(valueShape),
  options: PropTypes.arrayOf(PropTypes.shape(valueShape)).isRequired
};

Dropdown.defaultProps = {
  label: '',
  info: false,
  infoText: '',
  theme: {},
  loading: false,
  disabled: false,
  hideResetButton: false,
  withDot: false,
  required: false,
  optional: false,
  value: null,
  icons: null
};

export default Dropdown;
