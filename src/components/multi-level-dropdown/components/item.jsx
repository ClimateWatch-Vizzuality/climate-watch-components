import React from 'react';
import PropTypes from 'prop-types';

import Icon from 'components/icon';
import cx from 'classnames';

import arrowDownIcon from '../assets/dropdown-arrow.svg';
import styles from '../multi-level-dropdown-styles.scss';

const Item = props => {
  const {
    index,
    item,
    showGroup,
    highlightedIndex,
    getItemProps,
    toggleOpenGroup,
    values,
    activeLabel,
    noParentSelection,
    theme
  } = props;
  const { group, groupParent, label, active, hasActiveChild } = item;
  const isDisplayed =
    (!showGroup && !group) ||
    (group === showGroup || groupParent === showGroup);
  const isGroupParentActive = groupParent && showGroup === groupParent;
  const isHighlighted =
    highlightedIndex === index ||
    activeLabel === label ||
    (groupParent && groupParent === showGroup) ||
    (groupParent && values && groupParent === values.group);
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
          className: cx(styles.item, { [styles.highlight]: isHighlighted })
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
  values: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  activeLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  theme: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  noParentSelection: PropTypes.bool
};

Item.defaultProps = {
  index: undefined,
  item: undefined,
  showGroup: undefined,
  highlightedIndex: undefined,
  values: undefined,
  activeLabel: undefined,
  noParentSelection: false,
  theme: undefined
};

export default Item;