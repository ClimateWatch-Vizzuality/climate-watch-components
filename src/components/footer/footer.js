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
      includeBottom
    } = this.props;
    const className = cx(styles.footer, styles.border);
    return (
      <footer className={className}>
        {
          includePartners && (
          <div className={cx(styles.content, styles.nav)}>
            <div>Partners</div>
            <div className="grid-column-item">
              <div className={styles.contentWrapper}>
                <div className="grid-column-item">
                  <div className={styles.partnersContainer}>
                    {partners.map(
                          partner => partner.img && (
                          <div
                            key={partner.img.alt}
                            className={styles.logoContainer}
                          >
                            <a
                              className={cx(
                                    styles.logo,
                                    styles[partner.img.customClass] ||
                                      styles.defaultLogo
                                  )}
                              href={partner.link}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <img
                                src={partner.img.src}
                                alt={partner.img.alt}
                              />
                            </a>
                          </div>
                            )
                        )}
                  </div>
                </div>
                {includeContact && <Contact />}
              </div>
            </div>
          </div>
            )
        }
        {includeBottom && <BottomBar className={styles.content} />}
      </footer>
    );
  }
}

Footer.propTypes = {
  partners: PropTypes.array.isRequired,
  includePartners: PropTypes.bool,
  includeContact: PropTypes.bool,
  includeBottom: PropTypes.bool
};

Footer.defaultProps = {
  includePartners: true,
  includeContact: true,
  includeBottom: true
};

export default Footer;
