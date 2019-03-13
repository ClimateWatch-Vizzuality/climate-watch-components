import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import difference from 'lodash/difference';
import get from 'lodash/get';
import _sortBy from 'lodash/sortBy';
import reverse from 'lodash/reverse';
import {
  Table as VirtualizedTable,
  Column,
  SortDirection
} from 'react-virtualized/dist/commonjs/Table';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import cx from 'classnames';
import ReactTooltip from 'react-tooltip';
import Truncate from 'react-truncate';
import MultiSelect from '../multiselect';
import cellRenderer from './components/cell-renderer-component';
import styles from './table-styles.scss';
import headerRowRenderer from './components/header-row-renderer-component';

class Table extends PureComponent {
  constructor(props) {
    super(props);
    const { data, defaultColumns, sortBy } = props;
    const allColumns = Object.keys(get(data, '[0]', {}));
    const columns = defaultColumns.length ? defaultColumns : allColumns;
    this.state = {
      data,
      optionsOpen: false,
      sortBy: sortBy || get(allColumns, '[0]'),
      sortDirection: SortDirection.ASC,
      activeColumns: columns.map(d => ({ label: d, value: d })),
      columnsOptions: allColumns.map(d => ({ label: d, value: d })),
      shouldOverflow: false
    };
    this.standardColumnWidth = 180;
    this.minColumnWidth = 80;
    this.maxColumnWidth = 300;
    this.lengthWidthRatio = 4;
    this.columnWidthSamples = 5;
    this.columnHeightSamples = 10;
    this.minRowHeight = 80;
    this.rowHeightWithEllipsis = 150;
    this.virtualizedTable = React.createRef();
    this.arrowWidth = parseInt(styles.sorticonwidth.replace('px', ''), 10);
    this.rowColumnMargin = parseInt(
      styles.rowcolumnmargin.replace('px', ''),
      10
    );
  }

  componentDidMount() {
    this.tableWrapperWidth = this.tableWrapper && this.tableWrapper.offsetWidth;
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
    const { setColumnWidth } = this.props;
    const columnsLenght = columns.length;
    if (columnsLenght === 1) return width;
    const totalWidth = columns.reduce(
      (acc, column) =>
        acc + this.getColumnLength(data, column.label) + this.rowColumnMargin,
      this.rowColumnMargin + 10
    );
    this.tableWrapperWidth = this.tableWrapper && this.tableWrapper.offsetWidth;
    const realWidth = setColumnWidth
      ? (setColumnWidth() + this.rowColumnMargin + 10) * columnsLenght
      : totalWidth;
    this.setState({ shouldOverflow: realWidth > this.tableWrapperWidth });
    return realWidth < width ? width : realWidth;
  };

  getDataSorted = (data, sortBy, sortDirection) => {
    const dataSorted = _sortBy(data, sortBy);
    return sortDirection === SortDirection.DESC
      ? reverse(dataSorted)
      : dataSorted;
  };

  handleSortChange = ({ sortBy, sortDirection }) => {
    const { data } = this.state;
    const { dynamicRowsHeight } = this.props;
    const sortedData = this.getDataSorted(data, sortBy, sortDirection);
    this.setState({ data: sortedData, sortBy, sortDirection });
    if (dynamicRowsHeight) this.virtualizedTable.current.recomputeRowHeights(0);
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
    const columnTitleLength = (column.length + this.arrowWidth) *
      this.lengthWidthRatio;

    if (length < this.minColumnWidth) return this.minColumnWidth;
    if (columnTitleLength > this.minColumnWidth && length < columnTitleLength)
      return columnTitleLength;
    if (length > this.maxColumnWidth) return this.maxColumnWidth;
    return length;
  };

  columnWidthProps = column => {
    const { setColumnWidth, data } = this.props;
    const customColumnWidth = setColumnWidth && setColumnWidth(column);
    const length = customColumnWidth || this.getColumnLength(data, column);
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

  capitalizeFirstLetter = text =>
    `${text.charAt(0).toUpperCase()}${text.slice(1)}`;

  render() {
    const {
      data,
      sortBy,
      sortDirection,
      activeColumns,
      columnsOptions,
      optionsOpen,
      shouldOverflow
    } = this.state;
    const {
      data: propsData,
      hasColumnSelect,
      tableHeight,
      headerHeight,
      setRowsHeight,
      ellipsisColumns,
      dynamicRowsHeight,
      hiddenColumnHeaderLabels
    } = this.props;

    if (!data.length) return null;
    const hasColumnSelectedOptions = hasColumnSelect && columnsOptions;
    const columnLabel = columnSlug => {
      if (hiddenColumnHeaderLabels.includes(columnSlug)) return '';
      const headerLabel = columnSlug.replace(/_/g, ' ');
      return this.capitalizeFirstLetter(headerLabel);
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

    const getHeaderLabel = (columnText, columnData) => {
      const { width } = this.columnWidthProps(columnText, columnData);
      const truncateWidth = width - this.arrowWidth;
      const header = columnLabel(columnText);
      return (
        <Truncate
          data-for="header-label"
          data-tip={header}
          data-offset="{'top': 40, 'left': 0}"
          title=""
          lines={2}
          ellipsis={<span>...</span>}
          width={truncateWidth}
        >
          {header}
        </Truncate>
      );
    };
    const multiSelectOptions = columnsOptions.map(o => ({
      ...o,
      label: columnLabel(o.value)
    })) ||
      [];

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
              options={multiSelectOptions}
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
          ref={table => {
            this.tableWrapper = table;
          }}
          className={cx(styles.tableWrapper, {
            [styles.horizontalScroll]: shouldOverflow
          })}
        >
          <AutoSizer disableHeight>
            {({ width }) => (
              <VirtualizedTable
                className={styles.table}
                width={this.getFullWidth(propsData, activeColumns, width)}
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
                ref={this.virtualizedTable}
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
                      key={getHeaderLabel(column, data)}
                      label={getHeaderLabel(column, data)}
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
          <ReactTooltip
            place="left"
            id="header-label"
            className="reactTooltipWhite"
            multiline
          />
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
  /** Render html in the cell */
  parseHtml: PropTypes.bool,
  /** Render markdown in the cell */
  parseMarkdown: PropTypes.bool,
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
  headerHeight: 42,
  defaultColumns: [],
  hasColumnSelect: false,
  setColumnWidth: null,
  setRowsHeight: null,
  ellipsisColumns: [],
  firstColumnHeaders: [],
  hiddenColumnHeaderLabels: [],
  titleLinks: [],
  dynamicRowsHeight: false,
  parseHtml: false,
  parseMarkdown: false
};

export default Table;
