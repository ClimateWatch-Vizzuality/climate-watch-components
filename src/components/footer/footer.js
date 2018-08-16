import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import styles from './footer-styles.scss';

import BottomBar from '../bottom-bar/bottom-bar';

class Footer extends PureComponent {
  render() {
    const {
      partners,
      includePartners,
      includeBottom,
      footerText,
      disclaimerText,
      partnersTitle,
      children,
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
            className={cx(styles.footerContainer, theme.footerContainer)}
          >
            <div
              className={cx(
                    styles.firstColumnFooter,
                    theme.secondColumnFooter
                  )}
            >
              <div
                className={cx(
                      styles.content,
                      theme.content,
                      styles.nav,
                      theme.nav
                    )}
              >
                <div>
                  {partnersTitle}
                </div>
                <div className="grid-column-item">
                  <div
                    className={cx(
                          styles.contentWrapper,
                          theme.contentWrapper
                        )}
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
                  </div>
                </div>
                <div className={theme.disclaimer}>
                  {disclaimerText}
                </div>
              </div>
            </div>
            <div
              className={cx(
                    styles.secondColumnFooter,
                    theme.secondColumnFooter
                  )}
            >
              {children}
            </div>
          </div>
            )
        }
        {
          includeBottom &&
            (
              <BottomBar
                footerText={footerText}
                className={cx(styles.content, theme.content)}
                theme={{
                  bottomBar: theme.bottomBar,
                  bottomBarContainer: theme.bottomBarContainer,
                  bottomBarText: theme.bottomBarText
                }}
              />
            )
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
  disclaimerText: PropTypes.string,
  /** include partners section or not */
  includePartners: PropTypes.bool,
  /** Footer text passed to BottomBar component */
  footerText: PropTypes.string,
  /** Partners Text */
  partnersTitle: PropTypes.string,
  /** option to include a bottom bar */
  includeBottom: PropTypes.bool,
  children: PropTypes.node,
  /** theming options */
  theme: PropTypes.shape({
    footer: PropTypes.string,
    border: PropTypes.string,
    content: PropTypes.string,
    nav: PropTypes.string,
    contentWrapper: PropTypes.string,
    partnersContainer: PropTypes.string,
    logoContainer: PropTypes.string,
    logo: PropTypes.string,
    disclaimer: PropTypes.string,
    /** Bottom bar specific theme options */
    bottomBar: PropTypes.string,
    bottomBarContainer: PropTypes.string,
    bottomBarText: PropTypes.string
  })
};

Footer.defaultProps = {
  footerText: '',
  disclaimerText: '',
  partnersTitle: '',
  includePartners: true,
  includeBottom: true,
  theme: {},
  children: null
};

export default Footer;
