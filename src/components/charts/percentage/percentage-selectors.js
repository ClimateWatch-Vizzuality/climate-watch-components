import { createSelector } from 'reselect';

const selectData = state => state.data || null;
const calculateData = (data, columns) => data.map(d => {
  const updatedD = {};
  let total = 0;
  columns.forEach(column => {
    if (d[column.value]) total += d[column.value];
  });
  columns.forEach(column => {
    updatedD[column.value] = total ? d[column.value] / total * 100 : null;
  });
  return { x: d.x, ...updatedD, total };
});

export const getData = createSelector([ selectData, state => state.config ], (
  data,
  config
) =>
  {
    if (!data || !config) return null;
    const columns = config.columns.y.filter(c => !c.hideData);
    return calculateData(data, columns);
  });

export const getTooltipData = createSelector(
  [ selectData, state => state.config ],
  (data, config) => {
    if (!data || !config) return null;
    const hiddenDataColumns = config.columns.y.filter(c => !c.hideData);
    if (!hiddenDataColumns) return null;
    const columns = config.columns.y.filter(c => !c.hideLegend);
    return calculateData(data, columns);
  }
);
