import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { themr } from 'react-css-themr';

import styles from './card-styles.scss';

/**
 * @render react
 * @name Card
 * Represents a card with title and description
 * @example <Card title='Card'  subtitle='sub title'> Awsome card </Card>
 */
@themr('Card')
class Card extends PureComponent {
  render() {
    const { title, subtitle, children, theme } = this.props;
    console.log('theme', theme)
    console.log('styles', styles)
    return (
      <div className={styles.card}>
        <div className={styles.data}>{children}</div>
        <div className={styles.contentContainer}>
          {title && <p className={styles.title}>{title}</p>}
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </div>
      </div>
    );
  }
}

Card.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  children: PropTypes.node
};

export default Card;
