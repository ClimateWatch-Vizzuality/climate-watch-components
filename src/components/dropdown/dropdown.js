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

  renderIconOption = item => {
    const { icons, theme, variant } = this.props;
    return (
      <React.Fragment>
        <Icon
          icon={icons[item.label]}
          theme={{ icon: cx(styles.iconOption, theme.iconOption) }}
        />
        {
          variant === 'icons-labels' && (
          <span className={cx(styles.iconLabel, theme.iconLabel)}>
            {item.label}
          </span>
            )
        }
      </React.Fragment>
    );
  };

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
      icons,
      customTheme
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
          isRequired && (
          <span className={styles.requiredError}>
                This field is required
          </span>
            )
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
                renderOption={this.renderIconOption}
                renderValue={item => (
                  <Icon
                    icon={icons[item.label]}
                    theme={{ icon: cx(styles.iconValue, theme.iconValue) }}
                  />
                )}
                hideResetButton={hideResetButton}
                {...this.props}
                theme={customTheme}
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
    theme={customTheme}
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
  variant: PropTypes.string,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  withDot: PropTypes.bool,
  required: PropTypes.bool,
  optional: PropTypes.bool,
  hideResetButton: PropTypes.bool,
  customTheme: PropTypes.string,
  theme: PropTypes.shape({
    wrapper: PropTypes.string,
    dot: PropTypes.string,
    dropdow: PropTypes.string,
    select: PropTypes.string,
    icon: PropTypes.string,
    iconValue: PropTypes.string,
    iconLabel: PropTypes.string,
    iconOption: PropTypes.string
  }),
  icons: PropTypes.shape(iconsShape),
  value: PropTypes.shape(valueShape),
  options: PropTypes.arrayOf(PropTypes.shape(valueShape)).isRequired
};

Dropdown.defaultProps = {
  label: '',
  info: false,
  infoText: '',
  variant: undefined,
  theme: {},
  loading: false,
  disabled: false,
  hideResetButton: false,
  withDot: false,
  required: false,
  optional: false,
  value: null,
  icons: null,
  customTheme: undefined
};

export default Dropdown;
