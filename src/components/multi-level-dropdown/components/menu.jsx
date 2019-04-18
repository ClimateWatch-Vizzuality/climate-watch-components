import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import groupBy from 'lodash/groupBy';

import Item from './item';
import OptGroup from './optgroup';
import styles from '../multi-level-dropdown-styles.scss';

const Menu = props => {
  const {
    isOpen,
    items,
    showGroup,
    getItemProps,
    highlightedIndex,
    optionsAction,
    optionsActionKey,
    noItemsFound,
    toggleOpenGroup,
    noParentSelection,
    theme,
    optGroups
  } = props;

  const isItemDisplayed = ({ group, groupParent }) =>
    (!showGroup && !group) ||
    (group === showGroup || groupParent === showGroup);

  // we must use it like that
  let itemIndex = 0;

  const renderItems = (itms, extraIndent = false) =>
    itms && itms.map((item) => (
      <Item
        key={`${item.slug}${item.id}${item.label}`}
        /* eslint-disable-next-line */
        index={itemIndex++}
        item={item}
        isDisplayed={isItemDisplayed(item)}
        extraIndent={extraIndent}
        showGroup={showGroup}
        highlightedIndex={highlightedIndex}
        getItemProps={getItemProps}
        toggleOpenGroup={toggleOpenGroup}
        optionsAction={optionsAction}
        optionsActionKey={optionsActionKey}
        noParentSelection={noParentSelection}
        theme={theme}
      />
    ))

  const groupByOptGroup = groupBy(items, 'optGroup');
  const withGroups = optGroups && !!optGroups.length;

  const renderOptGroup = (group) => {
    const itms = groupByOptGroup[group.groupId];
    if (!itms || !itms.length) return null;
    const notCurrentParent = (item) => !(showGroup === item.groupParent);
    const isOptGroupVisible = itms.filter(notCurrentParent).some(isItemDisplayed);
    return (
      <React.Fragment key={group.groupId}>
        {isOptGroupVisible && <OptGroup label={group.title} />}
        {renderItems(itms, true)}
      </React.Fragment>
    );
  }

  const renderMenu = () => {
    if (!items || !items.length) {
      return (
        <div className={cx(styles.item, styles.notFound)}>
          {noItemsFound || 'No results found'}
        </div>
      )
    }
    if (withGroups) {
      return (
        <React.Fragment>
          {optGroups.map(renderOptGroup)}
          {renderItems(groupByOptGroup.undefined)}
        </React.Fragment>
      )
    }
    return renderItems(items);
  }

  if (!isOpen) return null;

  return (
    <div className={cx(styles.menu, theme.menu)}>
      {renderMenu()}
    </div>
  );
};

Menu.propTypes = {
  isOpen: PropTypes.bool,
  theme: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  items: PropTypes.array,
  optGroups: PropTypes.array,
  showGroup: PropTypes.string,
  getItemProps: PropTypes.func,
  highlightedIndex: PropTypes.number,
  optionsAction: PropTypes.func,
  optionsActionKey: PropTypes.string,
  noItemsFound: PropTypes.string,
  noParentSelection: PropTypes.bool,
  toggleOpenGroup: PropTypes.func.isRequired
};

Menu.defaultProps = {
  isOpen: false,
  theme: undefined,
  items: undefined,
  optGroups: undefined,
  showGroup: undefined,
  getItemProps: undefined,
  highlightedIndex: undefined,
  optionsAction: undefined,
  optionsActionKey: undefined,
  noItemsFound: undefined,
  noParentSelection: false
};

export default Menu;
