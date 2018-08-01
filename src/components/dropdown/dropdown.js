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

  render() {
    const {
      loading,
      white,
      label,
      transparent,
      plain,
      dark,
      blueBorder,
      theme,
      disabled,
      colorDot,
      info,
      infoText,
      required,
      optional,
      value
    } = this.props;
    const themeIcon = white ? { icon: styles.white } : {};
    const hasNotValue = value && !value.value;
    const isRequired = hasNotValue && required;
    return (
      <div
        className={cx(
          selectize.dropdown,
          styles.dropdownWrapper,
          {
            [styles.flex]: colorDot,
            [styles.requiredError]: required && hasNotValue
          },
          theme.wrapper
        )}
      >
        {
          colorDot &&
            (
              <span
                className={styles.dot}
                style={{ backgroundColor: colorDot }}
              />
            )
        }
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
        <div
          className={cx(
            styles.dropdown,
            transparent ? styles.transparent : '',
            white ? styles.white : '',
            plain ? styles.plain : '',
            dark ? styles.dark : '',
            blueBorder ? styles.blueBorder : ''
          )}
        >
          {loading && <Loading className={styles.loader} mini />}
          <SimpleSelect
            ref={el => {
              this.selectorElement = el;
            }}
            className={cx(theme.select, disabled, {
              [styles.withDot]: colorDot
            })}
            renderToggleButton={() => (
              <Icon icon={dropdownArrow} theme={themeIcon} />
            )}
            {...this.props}
          />
        </div>
      </div>
    );
  }
}

Dropdown.propTypes = {
  label: PropTypes.string,
  openUp: PropTypes.bool,
  transparent: PropTypes.bool,
  white: PropTypes.bool,
  plain: PropTypes.bool,
  dark: PropTypes.bool,
  info: PropTypes.bool,
  infoText: PropTypes.string,
  theme: PropTypes.object,
  hasSearch: PropTypes.bool,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  blueBorder: PropTypes.bool,
  colorDot: PropTypes.string,
  required: PropTypes.bool,
  optional: PropTypes.bool,
  value: PropTypes.object,
  options: PropTypes.arrayOf(
    PropTypes.shape({ label: PropTypes.string, value: PropTypes.string })
  ).isRequired
};

Dropdown.defaultProps = {
  label: '',
  openUp: false,
  transparent: false,
  white: false,
  plain: false,
  dark: false,
  info: false,
  infoText: '',
  theme: {},
  hasSearch: false,
  loading: false,
  disabled: false,
  blueBorder: false,
  colorDot: '',
  required: false,
  optional: false,
  value: null
};

export default Dropdown;
