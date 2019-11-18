import React from 'react';
import PropTypes from 'prop-types';

import cx from 'classnames';

import styles from '../multi-level-dropdown-styles.scss';

const OptGroup = props => {
  const { label } = props;

  return (
    <div
      className={cx(styles.itemWrapper, styles.show)}
    >
      <div
        className={cx(styles.item, styles.optGroup)}
      >
        {label}
      </div>
    </div>
  );
};

OptGroup.propTypes = {
  label: PropTypes.string
};

OptGroup.defaultProps = {
  label: undefined
};

export default OptGroup;
