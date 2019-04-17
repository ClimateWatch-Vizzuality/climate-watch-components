import React from 'react';
import PropTypes from 'prop-types';

import Icon from 'components/icon';
import cx from 'classnames';

import arrowDownIcon from '../assets/dropdown-arrow.svg';
import styles from '../multi-level-dropdown-styles.scss';

const Item = props => {
  const {
    extraIndent,
    getItemProps,
    highlightedIndex,
    index,
    isDisplayed,
    item,
    noParentSelection,
    showGroup,
    theme,
    toggleOpenGroup
  } = props;
  const { group, groupParent, label, active, hasActiveChild } = item;
  const isGroupParentActive = groupParent && showGroup === groupParent;
  const isHighlighted =
    highlightedIndex === index ||
    (groupParent && groupParent === showGroup)
  const showToChildrenArrow =
    groupParent && showGroup !== groupParent && isDisplayed;
  const parentClickProp =
    noParentSelection && (!showGroup || isGroupParentActive)
      ? { onClick: () => toggleOpenGroup(item) }
      : {};

  const backArrow = (
    <Icon
      icon={arrowDownIcon}
      theme={{ icon: cx(styles.groupIcon, styles.selected, theme.backArrow) }}
      onClick={() => toggleOpenGroup(item)}
    />
  );

  const toChildrenArrow = (
    <Icon
      icon={arrowDownIcon}
      theme={{
        icon: cx(
          styles.groupIcon,
          { [styles.selected]: showGroup === groupParent },
          theme.toChildrenArrow
        )
      }}
      onClick={() => toggleOpenGroup(item)}
    />
  );
  const activeChildMark = (
    <span className={cx(styles.childrenActiveMark, theme.childrenActiveMark)} />
  );
  return (
    <div
      className={cx(styles.itemWrapper, {
        [styles.show]: isDisplayed,
        [styles.base]: !group,
        [styles.selected]: isGroupParentActive,
        [styles.groupParent]: groupParent
      })}
    >
      {isGroupParentActive && backArrow}
      <div
        {...getItemProps({
          item,
          index,
          className: cx(styles.item, {
            [styles.highlight]: isHighlighted,
            [styles.extraIndent]: extraIndent
          })
        })}
        {...parentClickProp}
      >
        {label}
        {active && <span className={cx(styles.activeMark, theme.activeMark)} />}
        {hasActiveChild && !active && activeChildMark}
      </div>
      {showToChildrenArrow && toChildrenArrow}
    </div>
  );
};

Item.propTypes = {
  index: PropTypes.number,
  item: PropTypes.object,
  showGroup: PropTypes.string,
  highlightedIndex: PropTypes.number,
  getItemProps: PropTypes.func.isRequired,
  toggleOpenGroup: PropTypes.func.isRequired,
  theme: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  noParentSelection: PropTypes.bool,
  isDisplayed: PropTypes.bool,
  extraIndent: PropTypes.bool
};

Item.defaultProps = {
  index: undefined,
  item: undefined,
  showGroup: undefined,
  highlightedIndex: undefined,
  noParentSelection: false,
  theme: undefined,
  isDisplayed: true,
  extraIndent: false
};

export default Item;
