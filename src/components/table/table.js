import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import difference from 'lodash/difference';
import get from 'lodash/get';
import isEqual from 'lodash/isEqual';
import omit from 'lodash/omit';
import {
  Table as VirtualizedTable,
  Column,
  SortDirection
} from 'react-virtualized/dist/commonjs/Table';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import cx from 'classnames';
import ReactTooltip from 'react-tooltip';
import Truncate from 'react-truncate';
import ColumnSelector from './components/column-selector';
import cellRenderer from './components/cell-renderer-component';
import styles from './table-styles.scss';
import headerRowRenderer from './components/header-row-renderer-component';
import {
  getDataSorted,
  capitalizeFirstLetter,
  getMeanLength,
  getDynamicRowHeight
} from './table-utils';

class Table extends PureComponent {
  constructor(props) {
    super(props);
    const { data, defaultColumns, sortBy, titleLinks } = props;
    const allColumns = Object.keys(get(data, '[0]', {}));
    const columns = defaultColumns.length ? defaultColumns : allColumns;
    this.state = {
      data,
      sortBy: sortBy || get(allColumns, '[0]'),
      sortDirection: SortDirection.ASC,
      activeColumns: columns.map(d => ({ label: d, value: d })),
      columnsOptions: allColumns.map(d => ({ label: d, value: d })),
      shouldOverflow: false,
      titleLinks
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
    const { data, defaultColumns, titleLinks } = this.props;
    const {
      data: nextData,
      titleLinks: nextTitleLinks,
      defaultColumns: nextDefaultColumns
    } = nextProps;
    if (!isEqual(nextData, data) || !isEqual(nextTitleLinks, titleLinks)) {
      this.setState({ data: nextData, titleLinks: nextTitleLinks });
    }
    if (!isEqual(nextDefaultColumns, defaultColumns)) {
      const allColumns = Object.keys(get(data, '[0]', {}));
      const columns = nextDefaultColumns.length
        ? nextDefaultColumns
        : allColumns;
      this.virtualizedTable.current.recomputeRowHeights();
      this.setState({
        activeColumns: columns.map(d => ({ label: d, value: d })),
        columnsOptions: allColumns.map(d => ({ label: d, value: d }))
      });
    }
  }

  getFullWidth = (data, columns, width) => {
    const { setColumnWidth } = this.props;
    const columnsLenght = columns.length;
    if (columnsLenght === 1) return width;
    const totalWidth = columns.reduce(
      (acc, column) => {
        const columnWidth = setColumnWidth && setColumnWidth(column.label) ||
          this.getColumnLength(data, column.label);
        return acc + columnWidth + this.rowColumnMargin;
      },
      this.rowColumnMargin + 10
    );
    this.tableWrapperWidth = this.tableWrapper && this.tableWrapper.offsetWidth;
    this.setState({ shouldOverflow: totalWidth > this.tableWrapperWidth });
    return totalWidth < width ? width : totalWidth;
  };

  handleSortChange = ({ sortBy, sortDirection }) => {
    const { data, titleLinks } = this.state;
    const { dynamicRowsHeight } = this.props;
    const dataWithTitleLinks = [ ...data ];
    data.forEach((d, i) => {
      dataWithTitleLinks[i].titleLink = titleLinks[i];
    });
    const sortedData = getDataSorted(dataWithTitleLinks, sortBy, sortDirection);

    const sortedDataWithoutTitleLinks = [];
    const sortedTitleLinks = [];
    sortedData.forEach(d => {
      sortedDataWithoutTitleLinks.push(omit(d, [ 'titleLink' ]));
      sortedTitleLinks.push(d.titleLink);
    });
    this.setState({
      data: sortedDataWithoutTitleLinks,
      titleLinks: sortedTitleLinks,
      sortBy,
      sortDirection
    });
    if (dynamicRowsHeight) this.virtualizedTable.current.recomputeRowHeights(0);
  };

  handleColumnChange = columns => {
    this.setState({ activeColumns: columns });
  };

  rowClassName = ({ index }) => {
    const { theme } = this.props;

    if (index < 0) return cx(styles.headerRow, theme.headerRow);

    return index % 2 === 0
      ? cx(styles.evenRow, theme.row, theme.evenRow)
      : cx(styles.oddRow, theme.row, theme.oddRow);
  };

  getColumnLength = (data, column) => {
    const meanLenght = getMeanLength(this.columnWidthSamples, data, column);
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

  render() {
    const {
      data,
      sortBy,
      sortDirection,
      activeColumns,
      columnsOptions,
      shouldOverflow,
      titleLinks
    } = this.state;
    const {
      data: propsData,
      hasColumnSelect,
      tableHeight,
      headerHeight,
      setRowsHeight,
      ellipsisColumns,
      dynamicRowsHeight,
      hiddenColumnHeaderLabels,
      theme,
      customCellRenderer
    } = this.props;
    if (!data.length) return null;
    const hasColumnSelectedOptions = hasColumnSelect && columnsOptions;
    const columnLabel = columnSlug => {
      if (hiddenColumnHeaderLabels.includes(columnSlug)) return '';
      const headerLabel = columnSlug.replace(/_/g, ' ');
      return capitalizeFirstLetter(headerLabel);
    };

    const rowsHeight = d => {
      if (setRowsHeight) return setRowsHeight(d);
      if (ellipsisColumns.length > 0) return this.rowHeightWithEllipsis;
      return this.minRowHeight;
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
          hasColumnSelectedOptions &&
            (
              <ColumnSelector
                activeColumns={activeColumns}
                multiSelectOptions={multiSelectOptions}
                handleColumnChange={this.handleColumnChange}
                columnSelectorTheme={theme.columnSelector}
              />
            )
        }
        <div
          ref={table => {
            this.tableWrapper = table;
          }}
          className={cx(
            styles.tableWrapper,
            { [styles.horizontalScroll]: shouldOverflow },
            theme.tableWrapper
          )}
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
                    ? getDynamicRowHeight(data, this.columnHeightSamples, index)
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
                      className={cx(
                        styles.column,
                        {
                          [styles.ellipsis]: ellipsisColumns &&
                            ellipsisColumns.indexOf(column) > -1,
                          [styles.allTextVisible]: dynamicRowsHeight
                        },
                        theme.column
                      )}
                      headerClassName={cx(
                        styles.columnHeader,
                        theme.columnHeader
                      )}
                      key={getHeaderLabel(column, data)}
                      label={getHeaderLabel(column, data)}
                      dataKey={column}
                      flexGrow={0}
                      cellRenderer={cell =>
                        customCellRenderer
                          ? customCellRenderer(cell)
                          : cellRenderer({
                            props: { ...this.props, titleLinks },
                            cell
                          })}
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
  /** Function that overrides the cell rendering */
  customCellRenderer: PropTypes.func,
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
  ),
  theme: PropTypes.shape({
    tableWrapper: PropTypes.string,
    table: PropTypes.string,
    column: PropTypes.string,
    row: PropTypes.string,
    oddRow: PropTypes.string,
    evenRow: PropTypes.string,
    headerRow: PropTypes.string,
    columnHeader: PropTypes.string,
    columnSelector: PropTypes.string
  })
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
  parseMarkdown: false,
  customCellRenderer: undefined,
  theme: {}
};

export default Table;
