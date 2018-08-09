import React from 'react';
import Proptypes from 'prop-types';
import cx from 'classnames';

import styles from './section-styles.scss';

const Section = ({ children, backgroundImage, theme }) => (
  <section
    className={cx(styles.section, theme.section)}
    style={
      backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : null
    }
  >
    <div className={cx(styles.row, theme.row)}>
      {children}
    </div>
  </section>
);

Section.propTypes = {
  /** Children elements to pass */
  children: Proptypes.node,
  /** Background image */
  backgroundImage: Proptypes.string,
  /**  */
  theme: Proptypes.shape({ section: Proptypes.string, row: Proptypes.string })
};

Section.defaultProps = { children: null, backgroundImage: '', theme: {} };

export default Section;
