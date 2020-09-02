import _sortBy from 'lodash/sortBy';
import isNaN from 'lodash/isNaN';
import reverse from 'lodash/reverse';
import { SortDirection } from 'react-virtualized/dist/commonjs/Table';

const sortData = (data, sortBy) => {
  const samples = data.slice(0, 5).map(d => d[sortBy]).filter(Boolean);

  const isADate = d =>
    Object.prototype.toString.call(d) === '[object Date]' &&
      !isNaN(new Date(d).getTime());
  const areDates = samples.every(sample => isADate(new Date(sample)));

  if (areDates) {
    const sortByDate = (a, b) => new Date(a[sortBy]) - new Date(b[sortBy]);
    return data.sort(sortByDate);
  }

  const areNumbers = samples.every(sample => !isNaN(parseFloat(sample)));
  if (areNumbers) {
    const sortByNumbers = (a, b) =>
      parseFloat(a[sortBy]) - parseFloat(b[sortBy]);
    return data.sort(sortByNumbers);
  }
  return _sortBy(data, sortBy);
};

export const getDataSorted = (data, sortBy, sortDirection) => {
  const isItemDefined = d =>
    d[sortBy] !== null && typeof d[sortBy] !== 'undefined';
  const notNullValueData = data.filter(isItemDefined);
  const nullValueData = data.filter(d => !isItemDefined(d));

  const dataSorted = sortData(notNullValueData, sortBy);
  const notNullValueSortedData = sortDirection === SortDirection.DESC
    ? reverse(dataSorted)
    : dataSorted;
  return nullValueData
    ? notNullValueSortedData.concat(nullValueData)
    : notNullValueSortedData;
};

export const capitalizeFirstLetter = text =>
  `${text.charAt(0).toUpperCase()}${text.slice(1)}`;

export const getMeanLength = (columnWidthSamples, data, column) => {
  const STANDARD_COLUMN_WIDTH = 180;
  const sampleNumbersArray = [ ...Array(columnWidthSamples).keys() ];
  let samples = 0;
  let aggregatedLenght = 0;
  sampleNumbersArray.forEach(n => {
    if (data[n] && data[n][column] && data[n][column].length) {
      aggregatedLenght += data[n][column].length;
      samples += 1;
    }
  });
  if (samples < 1) return STANDARD_COLUMN_WIDTH;
  return aggregatedLenght / samples;
};

export const getDynamicRowHeight = (
  rowData,
  getColumnWidth,
  dynamicRowsConfig
) =>
  {
    const { fontWidth, fontSize, extraMargin, lineHeight } = dynamicRowsConfig;
    const orderedColumnNames = _sortBy(
      Object.keys(rowData),
      key => String(rowData[key]).length
    );
    const greatestColumnName = orderedColumnNames[orderedColumnNames.length -
      1];
    const columnLength = getColumnWidth([ rowData ], greatestColumnName);

    const greatestColumnNameDatum = String(rowData[greatestColumnName]);
    if (!greatestColumnNameDatum) {
      return 120;
    }
    const textColumnsNumber = greatestColumnNameDatum.length *
      fontWidth /
      columnLength;
    return (textColumnsNumber + 1) * fontSize * lineHeight + extraMargin;
  };
