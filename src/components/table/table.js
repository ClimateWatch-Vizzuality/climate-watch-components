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

import MultiSelect from '../multiselect';
import cellRenderer from './components/cell-renderer-component';
import styles from './table-styles.scss';
import headerRowRenderer from './components/header-row-renderer-component';

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
    this.columnHeightSamples = 10;
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

  getFullWidth = (data, columns, width) => {
    const columnsLenght = columns.length;
    if (columnsLenght === 1) return width;
    const totalWidth = columns.reduce(
      (acc, column) => acc + this.getColumnLength(data, column.label),
      0
    );
    return totalWidth < width ? width : totalWidth;
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

  getLongestTextColumnName = () => {
    const { data } = this.props;

    const columnsTextLengthSamples = [];
    [ ...Array(this.columnHeightSamples).keys() ].forEach(n => {
      const keys = data[n] && Object.keys(data[n]);
      const columnsTextLength = {};
      if (keys) {
        keys.forEach(column => {
          columnsTextLength[column] = data[n][column] && data[n][column].length;
        });
      }
      columnsTextLengthSamples.push(columnsTextLength);
    });

    const aggregatedLength = {};
    columnsTextLengthSamples.forEach(sample => {
      Object.keys(sample).forEach(key => {
        if (!aggregatedLength[key]) aggregatedLength[key] = 0;
        if (sample[key]) aggregatedLength[key] += sample[key];
        else aggregatedLength[key] += 0;
      });
    });
    const greatestLength = Math.max(...Object.values(aggregatedLength));
    const columnName = Object
      .keys(aggregatedLength)
      .find(column => aggregatedLength[column] === greatestLength);
    return columnName;
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
      dynamicRowsHeight,
      hiddenColumnHeaderLabels
    } = this.props;

    if (!data.length) return null;
    const hasColumnSelectedOptions = hasColumnSelect && columnsOptions;
    const columnLabel = columnSlug => {
      if (hiddenColumnHeaderLabels.includes(columnSlug)) return '';
      return capitalize(columnSlug.replace(/_/g, ' '));
    };

    const rowsHeight = d => {
      if (setRowsHeight) return setRowsHeight(d);
      if (ellipsisColumns.length > 0) return this.rowHeightWithEllipsis;
      return this.minRowHeight;
    };

    const getDatum = (dataD, index) => dataD[index];

    const getDynamicRowHeight = index => {
      const considerableMargin = 100;
      const greatestColumnName = this.getLongestTextColumnName();
      return getDatum(data, index)[greatestColumnName] &&
        getDatum(data, index)[greatestColumnName].length / 3 +
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
                width={this.getFullWidth(data, activeColumns, width)}
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
                headerRowRenderer={({ columns, style, className }) =>
                  headerRowRenderer({
                    ...this.props,
                    columns,
                    style,
                    className
                  })}
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
  /** Array of any kind of data you want to display */
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.array.isRequired,
  /** Initial columns active in the table */
  // eslint-disable-next-line react/forbid-prop-types
  defaultColumns: PropTypes.array,
  /** Initial column to sort by */
  sortBy: PropTypes.string,
  /** Include top right dropdown to filter active columns */
  hasColumnSelect: PropTypes.bool,
  /** Build dinamycally the rows height */
  setRowsHeight: PropTypes.func,
  /** Build dinamycally the columns width */
  setColumnWidth: PropTypes.func,
  /** Initial table height */
  tableHeight: PropTypes.number,
  /** Initial table header height */
  headerHeight: PropTypes.number,
  /** Trim line to include ... */
  // eslint-disable-next-line react/forbid-prop-types
  ellipsisColumns: PropTypes.array,
  /** Boolean to allow scroll in the horizontal direction */
  horizontalScroll: PropTypes.bool.isRequired,
  /** Array to order the column headers */
  // eslint-disable-next-line react/forbid-prop-types
  firstColumnHeaders: PropTypes.array,
  /** Boolean value to calculate dynamic rows */
  dynamicRowsHeight: PropTypes.bool,
  /** Array of column header that dev do not want to display on header row */
  hiddenColumnHeaderLabels: PropTypes.arrayOf(PropTypes.string),
  /** Array of arrays of objects holding the properties of the columns that should have linkable content.
   * This prop is passed to `cell-renderer-component`
   * exaple: __`titleLinks={data.map(c => [{columnName: "link", url: "self", label: "View more"}])}`__
  */
  titleLinks: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        /** Name of the column with linkable content */
        columnName: PropTypes.string,
        /** If is an external link `url: "self"`
         *  if is inside the platform `url: "/uri-to-resource"`
        */
        url: PropTypes.string,
        /** If provided it will be displayed as column text */
        label: PropTypes.string
      })
    )
  )
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
  hiddenColumnHeaderLabels: [],
  titleLinks: [],
  dynamicRowsHeight: false
};

export default Table;
