import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './switch-styles.scss';

class Switch extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedOption: props.selectedOption };
  }

  handleOnClick(option) {
    const { onClick } = this.props;
    this.setState({ selectedOption: option.value });
    onClick();
  }

  render() {
    const { options, theme } = this.props;
    const { selectedOption } = this.state;
    const hasOptions = options && options.length > 1;
    const checkedStyle = cx(styles.checkedOption, theme.checkedOption);

    return (
      <div className={cx(styles.wrapper, theme.wrapper)}>
        {
          hasOptions && options.map(option => (
            <div
              className={cx(
                  styles.cursor,
                  selectedOption === option.value ? checkedStyle : ''
                )}
              onClick={() => this.handleOnClick(option)}
            >
              <div className={cx(styles.option, theme.option)}>
                {option.name}
              </div>
            </div>
            ))
        }
      </div>
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
    wrapper: PropTypes.string
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
