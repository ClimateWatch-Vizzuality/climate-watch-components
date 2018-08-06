import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import styles from './footer-styles.scss';

import BottomBar from '../bottom-bar/bottom-bar';
import Contact from '../contact/contact';

class Footer extends PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    const {
      partners,
      includePartners,
      includeContact,
      contactOptions,
      includeBottom,
      theme
    } = this.props;
    const className = cx(
      styles.footer,
      theme.footer,
      styles.border,
      theme.border
    );
    return (
      <footer className={className}>
        {
          includePartners && (
          <div
            className={cx(
                  styles.content,
                  theme.content,
                  styles.nav,
                  theme.nav
                )}
          >
            <div>Partners</div>
            <div className="grid-column-item">
              <div
                className={cx(styles.contentWrapper, theme.contentWrapper)}
              >
                <div className="grid-column-item">
                  <div className={theme.partnersContainer}>
                    {partners.map(
                          partner => partner.img && (
                          <div
                            key={partner.img.alt}
                            className={cx(
                                  styles.logoContainer,
                                  theme.logoContainer
                                )}
                          >
                            <a
                              className={cx(
                                    styles.logo,
                                    theme.logo,
                                    styles[partner.img.customClass]
                                  )}
                              href={partner.link}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <img
                                className={cx(
                                      styles.defaultLogo,
                                      theme.logo
                                    )}
                                src={partner.img.src}
                                alt={partner.img.alt}
                              />
                            </a>
                          </div>
                            )
                        )}
                  </div>
                </div>
                {
                      includeContact &&
                        (
                          <Contact
                            contactTitle={contactOptions.contactTitle}
                            contactMail={contactOptions.contactMail}
                          />
                        )
                    }
              </div>
            </div>
          </div>
            )
        }
        {
          includeBottom &&
            <BottomBar className={cx(styles.content, theme.content)} />
        }
      </footer>
    );
  }
}

Footer.propTypes = {
  /** Array of partners with link and logo img */
  partners: PropTypes.arrayOf(
    PropTypes.shape({
      link: PropTypes.string,
      img: PropTypes.shape({
        src: PropTypes.string,
        alt: PropTypes.string,
        customClass: PropTypes.string
      })
    })
  ).isRequired,
  /** include partners section or not */
  includePartners: PropTypes.bool,
  /** option to include contact link */
  includeContact: PropTypes.bool,
  /** contact values to pass */
  contactOptions: PropTypes.shape({
    contactTitle: PropTypes.string,
    contactMail: PropTypes.string,
    theme: PropTypes.shape({
      contactContainer: PropTypes.string,
      contact: PropTypes.string,
      icon: PropTypes.string
    })
  }),
  /** option to include a bottom bar */
  includeBottom: PropTypes.bool,
  /** theming options */
  theme: PropTypes.shape({
    footer: PropTypes.string,
    border: PropTypes.string,
    content: PropTypes.string,
    nav: PropTypes.string,
    contentWrapper: PropTypes.string,
    partnersContainer: PropTypes.string,
    logoContainer: PropTypes.string,
    logo: PropTypes.string
  })
};

Footer.defaultProps = {
  includePartners: true,
  includeContact: true,
  contactOptions: {},
  includeBottom: true,
  theme: {}
};

export default Footer;
