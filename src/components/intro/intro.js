import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Button from '../button/button';
import { TabletLandscape, TabletPortraitOnly } from '../../styles/responsive';
import styles from './intro-styles.scss';

/**
 * Intro component that accepts title and description
 */
const Intro = props => {
  const { title, description, disclaimer, theme, textColumns, button } = props;
  const actionButton = button && (
  <Button className={theme.button} {...button}>
    {button.text}
  </Button>
    );

  return (
    <div className={cx(styles.wrapper, theme.wrapper)}>
      <div className={cx(theme.main, { [styles.withButton]: !!actionButton })}>
        <h2 className={theme.title}>{title}</h2>
        <TabletLandscape>
          {actionButton}
        </TabletLandscape>
      </div>
      <p
        className={cx(theme.description, textColumns ? theme.columns : '')}
        // eslint-disable-line
        dangerouslySetInnerHTML={{ __html: description }}
      />
      {disclaimer && <p className={styles.disclaimer}>{disclaimer}</p>}
      <TabletPortraitOnly>
        {actionButton}
      </TabletPortraitOnly>
    </div>
  );
};

Intro.propTypes = {
  /** Title of intro */
  title: PropTypes.string,
  /** Description text */
  description: PropTypes.string,
  /** Disclaimer text */
  disclaimer: PropTypes.string,
  /** Theming options */
  theme: PropTypes.shape({
    columns: PropTypes.string,
    description: PropTypes.string,
    title: PropTypes.string,
    button: PropTypes.string,
    main: PropTypes.string,
    wrapper: PropTypes.string
  }),
  /** Optional button to include in intro component */
  button: PropTypes.object,
  /** Option to enable text columns */
  textColumns: PropTypes.bool
};

Intro.defaultProps = {
  disclaimer: '',
  theme: {},
  textColumns: true,
  description: '',
  button: null,
  title: ''
};

export default Intro;
