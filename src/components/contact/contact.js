import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';

import Icon from '../icon/icon';
import contactIcon from './assets/contact.svg';

import styles from './contact-styles.scss';

/**
 * Contact component
 */
const Contact = ({ contactMail, contactTitle, theme }) => (
  <div className={cx(styles.contactContainer, theme.contactContainer)}>
    <a
      className={cx(styles.contact, theme.contact)}
      href={`mailto:${contactMail}`}
    >
      {contactTitle}
    </a>
    <Icon icon={contactIcon} theme={{ icon: theme.icon }} />
  </div>
);

Contact.propTypes = {
  /** Email address */
  contactMail: PropTypes.string.isRequired,
  /** Text to display */
  contactTitle: PropTypes.string,
  /** Theming options */
  theme: PropTypes.shape({
    contactContainer: PropTypes.string,
    contact: PropTypes.string,
    icon: PropTypes.string
  })
};

Contact.defaultProps = { contactTitle: 'CONTACT US', theme: {} };

export default Contact;
