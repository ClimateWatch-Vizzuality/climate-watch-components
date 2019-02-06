import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import Item from './item';
import styles from '../multi-level-dropdown-styles.scss';

const Menu = props => {
  const {
    isOpen,
    values,
    activeLabel,
    items,
    showGroup,
    getItemProps,
    highlightedIndex,
    optionsAction,
    optionsActionKey,
    noItemsFound,
    toggleOpenGroup,
    noParentSelection,
    theme
  } = props;

  return !isOpen ? null : (
    <div className={cx(styles.menu, theme.menu)}>
      {items && items.length ? (
        items.map((item, index) => (
          <Item
            key={`${item.slug}${item.id}${item.label}`}
            index={index}
            item={item}
            showGroup={showGroup}
            highlightedIndex={highlightedIndex}
            getItemProps={getItemProps}
            toggleOpenGroup={toggleOpenGroup}
            optionsAction={optionsAction}
            optionsActionKey={optionsActionKey}
            activeLabel={activeLabel}
            noParentSelection={noParentSelection}
            theme={theme}
            values={values}
          />
        ))
      ) : (
        <div className={cx(styles.item, styles.notFound)}>
          {noItemsFound || 'No results found'}
        </div>
      )}
    </div>
  );
};

Menu.propTypes = {
  isOpen: PropTypes.bool,
  values: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  theme: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  activeLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  items: PropTypes.array,
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
  values: [],
  theme: undefined,
  activeLabel: undefined,
  items: undefined,
  showGroup: undefined,
  getItemProps: undefined,
  highlightedIndex: undefined,
  optionsAction: undefined,
  optionsActionKey: undefined,
  noItemsFound: undefined,
  noParentSelection: false
};

export default Menu;