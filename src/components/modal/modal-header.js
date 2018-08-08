import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import styles from './modal-styles.scss';

class ModalHeader extends PureComponent {
  render() {
    const { title, theme, children } = this.props;
    return (
      <div className={cx(styles.header, theme.header)}>
        {
          title &&
            (
              <h2 className={cx(styles.headerTitle, theme.headerTitle)}>
                {title}
              </h2>
            )
        }
        {children}
      </div>
    );
  }
}

ModalHeader.propTypes = {
  title: PropTypes.string,
  theme: PropTypes.shape({
    header: PropTypes.string,
    headerTitle: PropTypes.string
  }),
  children: PropTypes.node
};

ModalHeader.defaultProps = { title: 'Modal title', theme: {}, children: null };

export default ModalHeader;
