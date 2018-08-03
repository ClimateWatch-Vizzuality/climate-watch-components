import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Icon from 'components/icon';
import debounce from 'lodash/debounce';
import cx from 'classnames';

import searchIcon from './assets/search.svg';
import styles from './input-styles.scss';

/**
 * Input text component with optional icon
 */
class Input extends Component {
  constructor(props) {
    super(props);
    this.state = { value: props.value };
  }

  componentDidMount() {
    const { autofocus } = this.props;
    if (autofocus) {
      this.inputRef.focus();
    }
  }

  componentWillReceiveProps(nextProps) {
    const { value } = this.props;
    if (nextProps.value !== value) {
      this.setState({ value: nextProps.value });
    }
  }

  componentDidUpdate(prevProps) {
    const { autofocus } = this.props;
    if (autofocus && autofocus !== prevProps.autofocus) {
      this.inputRef.focus();
    }
  }

  handleChange = value => {
    this.setState({ value });
    this.debouncedChange();
  };

  debouncedChange = debounce(
    () => {
      const { onChange } = this.props;
      const { search } = this.state;
      if (onChange) {
        onChange(search);
      }
    },
    300
  );

  render() {
    const { value } = this.state;
    const { icon, theme, placeholder, onKeyUp, disabled } = this.props;
    return (
      <div className={cx(styles.wrapper, theme.wrapper)}>
        <input
          ref={el => {
            this.inputRef = el;
          }}
          type="text"
          className={cx(styles.input, theme.input)}
          placeholder={placeholder}
          onChange={e => this.handleChange(e.target.value)}
          onKeyUp={onKeyUp}
          value={value}
          disabled={disabled}
        />
        {
          icon &&
            <Icon icon={icon} theme={{ icon: cx(styles.icon, theme.icon) }} />
        }
      </div>
    );
  }
}

Input.propTypes = {
  /** Icon to use, also accepts false to remove it */
  icon: PropTypes.oneOfType([ PropTypes.bool, PropTypes.object ]),
  /** Initial value of it */
  value: PropTypes.string,
  /** Text by default in case no value */
  placeholder: PropTypes.string,
  /** Focus on it when mounted */
  autofocus: PropTypes.bool,
  /** Callback that returns the input value */
  onChange: PropTypes.func.isRequired,
  /** Callback on keyUp event that returns the event */
  onKeyUp: PropTypes.func,
  /** Not editable option */
  disabled: PropTypes.bool,
  /** Theme configuration object */
  theme: PropTypes.shape({
    wrapper: PropTypes.string,
    input: PropTypes.string,
    icon: PropTypes.string
  })
};

Input.defaultProps = {
  icon: searchIcon,
  placeholder: '',
  autofocus: false,
  theme: {},
  value: '',
  onKeyUp: () => {
  },
  disabled: false
};

export default Input;
