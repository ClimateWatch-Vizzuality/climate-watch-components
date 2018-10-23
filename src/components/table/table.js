import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import _sortBy from 'lodash/sortBy';
import reverse from 'lodash/reverse';
import capitalize from 'lodash/capitalize';
import {
  Table as VirtualizedTable,
  Column,
  SortDirection
} from 'react-virtualized/dist/commonjs/Table';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import cx from 'classnames';
import difference from 'lodash/difference';

import { pixelBreakpoints } from '../../styles/responsive';
import MultiSelect from '../multiselect';
import cellRenderer from './components/cell-renderer-component';
import styles from './table-styles.scss';

class Table extends PureComponent {
  constructor(props) {
    super(props);
    const { data, defaultColumns, sortBy } = props;
    const columns = defaultColumns || Object.keys(data[0]);
    this.state = {
      data,
      optionsOpen: false,
      sortBy: sortBy || Object.keys(data[0])[0],
      sortDirection: SortDirection.ASC,
      activeColumns: columns.map(d => ({ label: d, value: d })),
      columnsOptions: data &&
        data.length &&
        Object.keys(data[0]).map(d => ({ label: d, value: d })) ||
        []
    };
    this.standardColumnWidth = 180;
    this.minColumnWidth = 80;
    this.maxColumnWidth = 300;
    this.lengthWidthRatio = 4;
    this.columnWidthSamples = 5;
    this.minRowHeight = 80;
    this.rowHeightWithEllipsis = 150;
  }

  componentWillReceiveProps(nextProps) {
    const { data } = this.props;
    if (nextProps.data !== data) {
      this.setState({ data: nextProps.data });
    }
  }

  setOptionsClose = () => {
    this.setState(
      ({ optionsOpen }) => optionsOpen ? { optionsOpen: false } : null
    );
  };

  setOptionsOpen = () => {
    this.setState(
      ({ optionsOpen }) => !optionsOpen ? { optionsOpen: true } : null
    );
  };

  getResponsiveWidth = (columns, width) => {
    if (columns.length === 1) return width;

    const isMinColumSized = width / columns < this.standardColumnWidth;

    let responsiveRatio = 1.4;
    // Mobile
    let responsiveColumnRatio = 0.2;
    if (
      width > pixelBreakpoints.portrait && width < pixelBreakpoints.landscape
    ) {
      responsiveColumnRatio = 0.1;
      responsiveRatio = 1.2; // Tablet
    } else if (width > pixelBreakpoints.landscape) {
      // Desktop
      responsiveColumnRatio = 0.1;
      responsiveRatio = 1;
    }
    const columnRatio = isMinColumSized ? responsiveColumnRatio : 0;
    const columnExtraWidth = columnRatio * columns;
    return width * responsiveRatio * (1 + columnExtraWidth);
  };

  getDataSorted = (data, sortBy, sortDirection) => {
    const dataSorted = _sortBy(data, sortBy);
    return sortDirection === SortDirection.DESC
      ? reverse(dataSorted)
      : dataSorted;
  };

  handleSortChange = ({ sortBy, sortDirection }) => {
    const { data } = this.state;
    const sortedData = this.getDataSorted(data, sortBy, sortDirection);
    this.setState({ data: sortedData, sortBy, sortDirection });
  };

  handleColumnChange = columns => {
    this.setState({ activeColumns: columns });
  };

  rowClassName = ({ index }) => {
    if (index < 0) return styles.headerRow;

    return index % 2 === 0 ? styles.evenRow : styles.oddRow;
  };

  getMeanLength = (columnWidthSamples, data, column) => {
    const sampleNumbersArray = [ ...Array(columnWidthSamples).keys() ];
    let samples = 0;
    let aggregatedLenght = 0;
    sampleNumbersArray.forEach(n => {
      if (data[n] && data[n][column] && data[n][column].length) {
        aggregatedLenght += data[n][column].length;
        samples += 1;
      }
    });
    if (samples < 1) return this.standardColumnWidth;
    return aggregatedLenght / samples;
  };

  getColumnLength = (data, column) => {
    const meanLenght = this.getMeanLength(
      this.columnWidthSamples,
      data,
      column
    );
    const length = meanLenght * this.lengthWidthRatio;
    const arrowPadding = 8;
    const columnTitleLength = (column.length + arrowPadding) *
      this.lengthWidthRatio;

    if (length < this.minColumnWidth) return this.minColumnWidth;
    if (columnTitleLength > this.minColumnWidth && length < columnTitleLength)
      return columnTitleLength;
    if (length > this.maxColumnWidth) return this.maxColumnWidth;
    return length;
  };

  columnWidthProps = column => {
    const { setColumnWidth, data } = this.props;
    const length = setColumnWidth
      ? setColumnWidth(column)
      : this.getColumnLength(data, column);
    return { width: length, minWidth: length, maxWidth: length };
  };

  getColumnData = () => {
    const { activeColumns } = this.state;
    const { firstColumnHeaders } = this.props;
    const activeColumnNames = activeColumns.map(c => c.value);

    return activeColumnNames
      .filter(c => firstColumnHeaders.includes(c))
      .concat(difference(activeColumnNames, firstColumnHeaders));
  };

  render() {
    const {
      data,
      sortBy,
      sortDirection,
      activeColumns,
      columnsOptions,
      optionsOpen
    } = this.state;
    const {
      hasColumnSelect,
      tableHeight,
      headerHeight,
      setRowsHeight,
      ellipsisColumns,
      horizontalScroll,
      dynamicRowsHeight
    } = this.props;

    if (!data.length) return null;
    const hasColumnSelectedOptions = hasColumnSelect && columnsOptions;
    const columnLabel = columnSlug => capitalize(columnSlug.replace(/_/g, ' '));

    const rowsHeight = d => {
      if (setRowsHeight) return setRowsHeight(d);
      if (ellipsisColumns.length > 0) return this.rowHeightWithEllipsis;
      return this.minRowHeight;
    };

    const getDatum = (dataD, index) => dataD[index];

    const getDynamicRowHeight = index => {
      const considerableMargin = 100;
      return getDatum(data, index).definition &&
        getDatum(data, index).definition.split(' ').length * 2 +
          considerableMargin ||
        120;
    };

    return (
      <div className={cx({ [styles.hasColumnSelect]: hasColumnSelect })}>
        {
          hasColumnSelectedOptions && (
          <div
            role="button"
            tabIndex={0}
            className={styles.columnSelectorWrapper}
            onMouseEnter={this.setOptionsOpen}
            onMouseLeave={this.setOptionsClose}
          >
            <MultiSelect
              theme={{ dropdown: styles.columnSelector }}
              values={activeColumns || []}
              options={columnsOptions || []}
              onValueChange={this.handleColumnChange}
              hideResetButton
              open={optionsOpen}
            >
              <span className={styles.selectorValue}>
                    ...
              </span>
            </MultiSelect>
          </div>
            )
        }
        <div
          className={cx(styles.tableWrapper, {
            [styles.horizontalScroll]: horizontalScroll
          })}
        >
          <AutoSizer disableHeight>
            {({ width }) => (
              <VirtualizedTable
                className={styles.table}
                width={this.getResponsiveWidth(activeColumns.length, width)}
                height={tableHeight}
                headerHeight={headerHeight}
                rowClassName={this.rowClassName}
                rowHeight={({ index }) =>
                  dynamicRowsHeight
                    ? getDynamicRowHeight(index)
                    : rowsHeight(index)}
                rowCount={data.length}
                sort={this.handleSortChange}
                sortBy={sortBy}
                sortDirection={sortDirection}
                rowGetter={({ index }) => data[index]}
              >
                {this
                  .getColumnData()
                  .map(column => (
                    <Column
                      className={cx(styles.column, {
                        [styles.ellipsis]: ellipsisColumns &&
                          ellipsisColumns.indexOf(column) > -1,
                        [styles.allTextVisible]: dynamicRowsHeight
                      })}
                      key={column}
                      label={columnLabel(column)}
                      dataKey={column}
                      flexGrow={0}
                      cellRenderer={cell =>
                        cellRenderer({ props: this.props, cell })}
                      {...this.columnWidthProps(column, data)}
                    />
                  ))}
              </VirtualizedTable>
            )}
          </AutoSizer>
        </div>
      </div>
    );
  }
}

Table.propTypes = {
  /* Array of any kind of data you want to display */
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.array.isRequired,
  /* Initial columns active in the table */
  // eslint-disable-next-line react/forbid-prop-types
  defaultColumns: PropTypes.array,
  /* Initial column to sort by */
  sortBy: PropTypes.string,
  /* Include top right dropdown to filter active columns */
  hasColumnSelect: PropTypes.bool,
  /* Build dinamycally the rows height */
  setRowsHeight: PropTypes.func,
  /* Build dinamycally the columns width */
  setColumnWidth: PropTypes.func,
  /* Initial table height */
  tableHeight: PropTypes.number,
  /* Initial table header height */
  headerHeight: PropTypes.number,
  /* Trim line to include ... */
  // eslint-disable-next-line react/forbid-prop-types
  ellipsisColumns: PropTypes.array,
  /* Boolean to allow scroll in the horizontal direction */
  horizontalScroll: PropTypes.bool.isRequired,
  /* Array to order the column headers */
  // eslint-disable-next-line react/forbid-prop-types
  firstColumnHeaders: PropTypes.array,
  /* Boolean value to calculate dynamic rows */
  dynamicRowsHeight: PropTypes.bool
};

Table.defaultProps = {
  sortBy: 'value',
  tableHeight: 460,
  headerHeight: 30,
  defaultColumns: [],
  hasColumnSelect: false,
  setColumnWidth: null,
  setRowsHeight: null,
  ellipsisColumns: [],
  firstColumnHeaders: [],
  dynamicRowsHeight: false
};

export default Table;
