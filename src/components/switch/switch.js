import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './switch-styles.scss';

class Switch extends Component {
  constructor(props) {
    super(props);
    this.handleOnClick = this.handleOnClick.bind(this);
    this.state = { selectedOption: props.selectedOption };
  }

  handleOnClick(option) {
    const { onClick } = this.props;
    this.setState({ selectedOption: option.value });
    onClick(option);
  }

  render() {
    const { options, theme, name } = this.props;
    const { selectedOption } = this.state;
    const hasOptions = options && options.length > 1;
    const checkedStyle = cx(styles.checkedOption, theme.checkedOption);

    return (
      <ul className={cx(styles.wrapper, theme.wrapper)}>
        {
          hasOptions && options.map(option => (
            <label
              htmlFor={option.value}
              className={cx(styles.option, theme.option, styles.cursor, {
                  [checkedStyle]: selectedOption === option.value
                })}
            >
              <input
                type="radio"
                id={option.value}
                name={name}
                className={cx(styles.radioInput, theme.radioInput)}
                onClick={() => this.handleOnClick(option)}
              />
              {option.name}
            </label>
            ))
        }
      </ul>
    );
  }
}

Switch.propTypes = {
  /** Name for the input radio group */
  name: PropTypes.string,
  /** Switch options */
  options: PropTypes.arrayOf(
    PropTypes.shape({ name: PropTypes.string, value: PropTypes.string })
  ),
  /** Themable styles */
  theme: PropTypes.shape({
    checkedOption: PropTypes.string,
    option: PropTypes.string,
    wrapper: PropTypes.string,
    radioInput: PropTypes.string
  }),
  /** The onClick action occurring when user clicks on the option */
  onClick: PropTypes.func,
  /** Initially selected option */
  selectedOption: PropTypes.string
};

Switch.defaultProps = {
  name: Math.random().toString(36).substring(2, 15),
  theme: {},
  onClick: () => {
  },
  options: {},
  selectedOption: ''
};

export default Switch;
