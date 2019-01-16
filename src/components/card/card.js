import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import styles from './card-styles.scss';

/**
 * Represents a card with title and description
 */
class Card extends PureComponent {
  renderContent = () => {
    const { title, subtitle, theme } = this.props;

    return (
      <div className={cx(styles.contentContainer, theme.contentContainer)}>
        {
          title && (
          <p className={cx(styles.title, theme.title)}>
            {title}
          </p>
            )
        }
        {
          subtitle && (
          <p className={cx(styles.subtitle, theme.subtitle)}>
            {subtitle}
          </p>
            )
        }
      </div>
    );
  };

  renderChildren = () => {
    const { children, theme } = this.props;

    return (
      <div className={cx(styles.data, theme.data)}>
        {children}
      </div>
    );
  };

  render() {
    const { theme, reverse } = this.props;

    return (
      <div className={cx(styles.card, theme.card)}>
        {
          reverse
            ? [ this.renderContent(), this.renderChildren() ]
            : [ this.renderChildren(), this.renderContent() ]
        }
      </div>
    );
  }
}

Card.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  children: PropTypes.node.isRequired,
  reverse: PropTypes.bool,
  theme: PropTypes.shape({
    card: PropTypes.string,
    title: PropTypes.string,
    subtitle: PropTypes.string,
    data: PropTypes.string,
    contentContainer: PropTypes.string
  })
};

Card.defaultProps = { theme: {}, title: '', subtitle: '', reverse: false };

export default Card;
