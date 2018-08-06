import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import monete from './assets/monete.png';
import styles from './no-content-styles.scss';

/** Default placeholder to show no data o fetching error */
const NoContent = ({ theme, message, icon, minHeight }) => (
  <div className={cx(styles.noContent, theme.wrapper)} style={{ minHeight }}>
    <p className={cx(styles.text, theme.text)}>{message}</p>
    {icon && <img className={styles.img} src={monete} alt="Monete" />}
  </div>
);

NoContent.propTypes = {
  /** Show or hide the icon */
  icon: PropTypes.bool,
  /** Customizable options */
  theme: PropTypes.shape({ wrapper: PropTypes.string, text: PropTypes.string }),
  /** Text to display */
  message: PropTypes.string.isRequired,
  /** Min height of the box */
  minHeight: PropTypes.number
};

NoContent.defaultProps = { icon: false, theme: {}, minHeight: 50 };

export default NoContent;
