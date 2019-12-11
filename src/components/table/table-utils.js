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

const getDatum = (dataD, index) => dataD[index];

const getLongestTextColumnName = (data, columnHeightSamples) => {
  const columnsTextLengthSamples = [];
  [ ...Array(columnHeightSamples).keys() ].forEach(n => {
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

export const getDynamicRowHeight = (data, columnHeightSamples, index) => {
  const considerableMargin = 100;
  const greatestColumnName = getLongestTextColumnName(
    data,
    columnHeightSamples
  );

  return getDatum(data, index)[greatestColumnName] &&
    getDatum(data, index)[greatestColumnName].length / 3 + considerableMargin ||
    120;
};
