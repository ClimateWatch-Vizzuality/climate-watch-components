import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Button from '../button/button';
import Icon from '../icon/icon';
import infoIcon from './assets/info.svg';
import styles from './info-button-styles.scss';

/** Info button component */
class InfoButton extends PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    const { handleInfoClick, infoOpen, square, box, theme } = this.props;
    return (
      <Button
        className={cx(
          styles.btnInfo,
          theme.btnInfo,
          infoOpen ? styles.btnInfoActive : '',
          { [styles.box]: box }
        )}
        onClick={handleInfoClick}
        square={square}
      >
        <Icon theme={{ icon: theme.icon }} icon={infoIcon} />
      </Button>
    );
  }
}

InfoButton.propTypes = {
  /** Is info open prop */
  infoOpen: PropTypes.bool.isRequired,
  /** Handle info click function */
  handleInfoClick: PropTypes.func.isRequired,
  /** Option to set info button as a square */
  square: PropTypes.bool,
  /** Option to set info button as box */
  box: PropTypes.bool,
  /** Theming options */
  theme: PropTypes.shape({ btnInfo: PropTypes.string, icon: PropTypes.string })
};

InfoButton.defaultProps = { square: false, box: false, theme: {} };

export default InfoButton;
