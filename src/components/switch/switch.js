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
    const { options, theme } = this.props;
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
  theme: {},
  onClick: () => {
  },
  options: {},
  selectedOption: ''
};

export default Switch;
