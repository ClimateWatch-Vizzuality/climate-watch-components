/* eslint-disable react/forbid-prop-types */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import MultiSelect from '../../multiselect';
import styles from '../table-styles.scss';

const ColumnSelector = (
  { activeColumns, multiSelectOptions, handleColumnChange, columnSelectorTheme }
) =>
  {
    const [ optionsOpen, setOptionsOpen ] = useState(false);
    return (
      <div
        role="button"
        tabIndex={0}
        className={cx(styles.columnSelectorWrapper, columnSelectorTheme)}
        onMouseEnter={() => setOptionsOpen(true)}
        onMouseLeave={() => setOptionsOpen(false)}
      >
        <MultiSelect
          theme={{ dropdown: styles.columnSelector }}
          values={activeColumns || []}
          options={multiSelectOptions}
          onValueChange={handleColumnChange}
          hideResetButton
          open={optionsOpen}
        >
          <span className={styles.selectorValue}>...</span>
        </MultiSelect>
      </div>
    );
  };

ColumnSelector.propTypes = {
  activeColumns: PropTypes.array.isRequired,
  multiSelectOptions: PropTypes.array.isRequired,
  handleColumnChange: PropTypes.func.isRequired,
  columnSelectorTheme: PropTypes.object
};

ColumnSelector.defaultProps = { columnSelectorTheme: {} };

export default ColumnSelector;
