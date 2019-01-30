import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import Tab from 'components/tab';

import styles from './modal-styles.scss';

class ModalHeader extends PureComponent {
  render() {
    const {
      title,
      tabTitles,
      tabSelectedIndex,
      handleTabIndexChange,
      theme,
      children
    } = this.props;

    return (
      <div className={cx(styles.header, theme.header)}>
        {
          title && (
          <h2 className={cx(styles.headerTitle, theme.headerTitle)}>
            {title}
          </h2>
            )
        }
        {
          tabTitles &&
            (
              <Tab
                options={tabTitles}
                selectedIndex={tabSelectedIndex}
                handleTabIndexChange={handleTabIndexChange}
              />
            )
        }
        {children}
      </div>
    );
  }
}

ModalHeader.propTypes = {
  title: PropTypes.string,
  tabTitles: PropTypes.arrayOf(PropTypes.string),
  tabSelectedIndex: PropTypes.number,
  handleTabIndexChange: PropTypes.func,
  theme: PropTypes.shape({
    header: PropTypes.string,
    headerTitle: PropTypes.string
  }),
  children: PropTypes.node
};

ModalHeader.defaultProps = {
  title: null,
  tabTitles: null,
  tabSelectedIndex: 0,
  handleTabIndexChange: () => {
  },
  theme: {},
  children: null
};

export default ModalHeader;
