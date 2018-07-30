import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import CheckInput from '../check-input'

import styles from './card-styles.scss';

/**
 * Represents a card with title and description
 */
class Card extends PureComponent {
  render() {
    const { title, subtitle, children, theme } = this.props;
    return (
      <div className={cx(styles.card, theme.card)}>
        <div className={styles.data}>
          <CheckInput
            label={'Subscribe'}
            toggleFirst
            theme={styles}
            disabled={false}
          />
        </div>
        <div className={styles.contentContainer}>
          {title && <p className={cx(styles.title, theme.title)}>{title}</p>}
          {subtitle && <p className={cx(styles.subtitle, theme.subtitle)}>{subtitle}</p>}
        </div>
      </div>
    );
  }
}

Card.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  children: PropTypes.node,
  theme: PropTypes.shape({
    card: PropTypes.string,
    title: PropTypes.string,
    subtitle: PropTypes.string,
  }),
};

Card.defaultProps = {
  theme: {}
};

export default Card;
